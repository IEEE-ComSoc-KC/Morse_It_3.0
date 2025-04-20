"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const { userId } = useUser(); // Get user context, which contains user id
  const [point, setPoint] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<string>("");

  const router = useRouter()

  useEffect(() => {
    // Ensure user ID exists before making the request
    if (userId) {
      // Call the API and pass user ID in the request
      const fetchResultData = async () => {
        try {
          const response = await fetch("/api/getPoint", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId }), // Pass the user ID
          });

          const data = await response.json();
          console.log(data.point);
          console.log(data.hours);
          console.log(data.minutes);
          console.log(data.seconds);

          setPoint(data.point);
          let time = ""
          if (data.hours !== 0) time += `${data.hours} Hours `;
          if (data.minutes !== 0) time += `${data.minutes} Minutes `;
          if (data.seconds !== 0) time += `${data.seconds} Seconds`;

          setTimeTaken(time)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchResultData();
    }
  }, [userId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono bg-[radial-gradient(#0f0_1px,transparent_1px)] bg-[size:20px_20px] px-4">
      <div className="max-w-lg w-full p-8 rounded-2xl backdrop-blur-md bg-green-400/10 border border-green-600 shadow-[0_0_20px_#00ff00] space-y-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold neon-title">
          🎉 Thank You!
        </h1>

        <p className="text-green-300 text-md">
          Your response has been recorded.
        </p>

        <p className="text-green-500 text-sm">
          The final results will be displayed after the event.
        </p>

        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Your Score</h2>
          <p className="text-5xl font-extrabold text-green-300 mt-2">
            {point ?? "Loading..."}
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Time Taken</h2>
          <p className="text-xl text-green-300 mt-2">
            {timeTaken ? timeTaken : "Loading..."}
          </p>
        </div>

        <div className="pt-4">
          <button
            onClick={() => router.push("/leaderboard")}
            className="mt-4 bg-black border border-green-500 text-green-400 px-6 py-2 rounded-md hover:bg-green-800 hover:text-black transition-all duration-200 shadow-[0_0_10px_#00ff00]"
          >
            View Leaderboard
          </button>
        </div>

        <footer className="pt-4 border-t border-green-900 text-xs text-green-500">
          IEEE ComSoc Kerala Chapter | Morse iT! 3.0
        </footer>
      </div>
    </div>
  );
}
