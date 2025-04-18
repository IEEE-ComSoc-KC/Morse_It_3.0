import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, number } = await req.json();

    if (!id || number === undefined) {
      return NextResponse.json(
        { message: "Missing parameters" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const field = `ans${number}` as keyof typeof user;

    if (user[field] !== null) {
      return NextResponse.json(
        { message: `Answer already set for ans${number}` },
        { status: 409 }
      );
    }

    const now = new Date();
    const previousField = `ans${number - 1}` as keyof typeof user;
    const previousTime = user[previousField] as Date | null;

    let pointToAdd = 1; // default point

    if (previousTime) {
      const diffInMinutes =
        (now.getTime() - new Date(previousTime).getTime()) / (1000 * 60);

      if (diffInMinutes <= 2) {
        pointToAdd = 10;
      } else if (diffInMinutes <= 4) {
        pointToAdd = 8;
      } else if (diffInMinutes <= 6) {
        pointToAdd = 6;
      } else if (diffInMinutes <= 8) {
        pointToAdd = 4;
      } else if (diffInMinutes <= 10) {
        pointToAdd = 2;
      }
    }

    const updateData: Prisma.UserUpdateInput = {
      [field]: now,
      point: {
        increment: pointToAdd,
      },
    };

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: `Answer ${field} set successfully`,
        pointAwarded: pointToAdd,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/setans:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
