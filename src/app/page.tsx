"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6 text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400">
          Welcome to Morse It 3.0
        </h1>
        <p className="text-gray-300 text-lg">
          Get ready to crack the code! This is a puzzle-based challenge where
          your brain meets Morse logic. Follow the instructions carefully and
          input your answers after each challenge.
        </p>
        <ul className="text-gray-400 text-sm text-left list-disc list-inside space-y-2">
          <li>Each level presents a unique Morse code puzzle.</li>
          <li>You must solve and enter the correct answer to proceed.</li>
          <li>Use lowercase letters for answers unless stated otherwise.</li>
          <li>
            Your progress is tracked, and your score will be shown at the end.
          </li>
        </ul>
        <button
          onClick={() => router.push("/login")}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          Start / Login
        </button>
      </div>
    </div>
  );
}
