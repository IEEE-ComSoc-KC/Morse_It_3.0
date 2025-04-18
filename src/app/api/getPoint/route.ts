import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Missing 'id' in request body" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if both ans6 and ans0 exist in the user data
    if (!user.ans6 || !user.ans0) {
      return NextResponse.json(
        { message: "Missing answer timestamps (ans6 or ans0)" },
        { status: 400 }
      );
    }

    // Parse the timestamps
    const ans6Date = new Date(user.ans6);
    const ans0Date = new Date(user.ans0);

    // Calculate the time difference in milliseconds
    const timeDifference = ans6Date.getTime() - ans0Date.getTime();

    // Convert milliseconds to seconds
    const timeInSeconds = timeDifference / 1000;

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(timeInSeconds / 3600); // 1 hour = 3600 seconds
    const minutes = Math.floor((timeInSeconds % 3600) / 60); // 1 minute = 60 seconds
    const seconds = Math.floor(timeInSeconds % 60);

    const point = user.point;

    return NextResponse.json({
      message: "User retrieved",
      point,
      hours,
      minutes,
      seconds,
    });
  } catch (error) {
    console.error("Error in PUT /api/route:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
