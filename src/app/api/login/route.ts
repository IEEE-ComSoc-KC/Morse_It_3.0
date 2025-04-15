// /api/login/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json(
        { message: "Phone and password are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json(
        { message: "Incorrect password." },
        { status: 401 }
      );
    }

    let hasStarted = user.ans0 !== null;

    // If not started, update ans0 to current time
    if (!hasStarted) {
      await prisma.user.update({
        where: { id: user.id },
        data: { 
          ans0: new Date(), 
          final_string: user.id
        },
      });
      hasStarted = true; // Update status since we just set it
    }

    return NextResponse.json(
      {
        message: "Login successful",
        id: user.id,
        phone: user.phone,
        name: user.name,
        hasStarted,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
