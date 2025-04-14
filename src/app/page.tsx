"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono bg-[radial-gradient(#0f0_1px,transparent_1px)] bg-[size:20px_20px] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full p-8 rounded-2xl backdrop-blur-md bg-green-400/10 border border-green-600 shadow-[0_0_20px_#00ff00] space-y-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold neon-title">
          Welcome to Morse iT! 3.0
        </h1>

        <p className="text-green-300 text-lg">
          Get ready to crack the code! This is a puzzle-based challenge where
          your brain meets Morse logic. Follow the instructions carefully and
          input your answers after each challenge.
        </p>

        <ul className="text-green-400 text-sm text-left list-disc list-inside space-y-2">
          <li>Each level presents a unique Morse code puzzle.</li>
          <li>You must solve and enter the correct answer to proceed.</li>
          <li>Use lowercase letters for answers unless stated otherwise.</li>
          <li>
            Your progress is tracked, and your score will be shown at the end.
          </li>
        </ul>

        <button
          onClick={() => router.push("/login")}
          className="mt-6 px-6 py-3 bg-black border border-green-500 text-green-400 rounded-lg font-semibold transition hover:bg-green-700 hover:text-black shadow-[0_0_10px_#00ff00]"
        >
          Start / Login
        </button>

        <footer className="mt-8 text-xs text-green-500 border-t border-green-900 pt-4">
          IEEE ComSoc Kerala Chapter | Morse iT! 3.0
        </footer>
      </div>
    </div>
  );
}
