import { prisma } from "@/lib/prisma";
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

    const updateData: Record<string, Date> = {};
    updateData[field] = new Date();

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      { message: `Answer ${field} set successfully` },
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
