import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        phone: true,
        point: true,
        ans0: true,
        ans1: true,
        ans2: true,
        ans3: true,
        ans4: true,
        ans5: true,
        ans6: true,
      },
    });

    const processedUsers = users.map((user) => {
      const answers = [
        user.ans0,
        user.ans1,
        user.ans2,
        user.ans3,
        user.ans4,
        user.ans5,
        user.ans6,
      ];

      const start = answers[0] ? new Date(answers[0]) : null;
      let lastAnsweredTime: Date | null = null;
      let currentPosition = -1;

      for (let i = answers.length - 1; i >= 0; i--) {
        if (answers[i]) {
          lastAnsweredTime = new Date(answers[i] as Date);
          currentPosition = i;
          break;
        }
      }

      let hours = 0,
        minutes = 0,
        seconds = 0;

      if (start && lastAnsweredTime) {
        const timeDifference = lastAnsweredTime.getTime() - start.getTime();
        const totalSeconds = timeDifference / 1000;

        hours = Math.floor(totalSeconds / 3600);
        minutes = Math.floor((totalSeconds % 3600) / 60);
        seconds = Math.floor(totalSeconds % 60);
      }

      return {
        name: user.name,
        phone: user.phone,
        point: user.point,
        currentPosition, // <-- added this field
        timeTaken: { hours, minutes, seconds },
      };
    });

    // Sort by point DESC, then timeTaken ASC
    processedUsers.sort((a, b) => {
      if (b.point !== a.point) return b.point - a.point;

      const aTime =
        a.timeTaken.hours * 3600 +
        a.timeTaken.minutes * 60 +
        a.timeTaken.seconds;
      const bTime =
        b.timeTaken.hours * 3600 +
        b.timeTaken.minutes * 60 +
        b.timeTaken.seconds;

      return aTime - bTime;
    });

    return new Response(JSON.stringify(processedUsers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in GET /api/participants:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
