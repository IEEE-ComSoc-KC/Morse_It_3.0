import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const topPlayers = await prisma.user.findMany({
      select: {
        name: true,
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

    const filteredPlayers = topPlayers.filter(
      (player) => !(player.ans1 === null && player.point === 0)
    );

    const processedPlayers = filteredPlayers.map((player) => {
      const answers = [
        player.ans0,
        player.ans1,
        player.ans2,
        player.ans3,
        player.ans4,
        player.ans5,
        player.ans6,
      ];

      const start = answers[0] ? new Date(answers[0]) : null;
      let lastAnsweredTime: Date | null = null;

      // Find the last non-null answer time
      for (let i = answers.length - 1; i >= 0; i--) {
        if (answers[i]) {
          lastAnsweredTime = new Date(answers[i] as Date);
          break;
        }
      }

      let hours = 0,
        minutes = 0,
        seconds = 0;

      if (start && lastAnsweredTime) {
        const timeDifference = lastAnsweredTime.getTime() - start.getTime();
        const timeInSeconds = timeDifference / 1000;

        hours = Math.floor(timeInSeconds / 3600);
        minutes = Math.floor((timeInSeconds % 3600) / 60);
        seconds = Math.floor(timeInSeconds % 60);
      }

      return {
        name: player.name,
        point: player.point,
        timeTaken: { hours, minutes, seconds },
      };
    });

    // Sort by point DESC, then by total time ASC
    processedPlayers.sort((a, b) => {
      if (b.point !== a.point) return b.point - a.point;

      const aTotalSeconds =
        a.timeTaken.hours * 3600 +
        a.timeTaken.minutes * 60 +
        a.timeTaken.seconds;
      const bTotalSeconds =
        b.timeTaken.hours * 3600 +
        b.timeTaken.minutes * 60 +
        b.timeTaken.seconds;

      return aTotalSeconds - bTotalSeconds;
    });

    return new Response(JSON.stringify(processedPlayers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
