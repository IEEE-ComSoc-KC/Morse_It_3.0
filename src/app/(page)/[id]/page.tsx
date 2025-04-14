"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { answers } from "@/data/answers";
import Navbar from "@/app/component/navbar";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DynamicPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const username = "John Doe";

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = answers[id];
    if (answer.trim().toLowerCase() === correctAnswer?.toLowerCase()) {
      const nextId = (parseInt(id) + 1).toString();
      if (nextId === "4") router.push("/final");
      else router.push(`/${nextId}`);
    } else {
      setError("❌ Answer is wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono bg-[radial-gradient(#0f0_1px,transparent_1px)] bg-[size:20px_20px]">
      <Navbar username={username} questionNumber={id} />

      <div className="max-w-2xl mx-auto mt-10 p-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 neon-title">
          Morse iT! 3.0
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-green-500">
          Morse Code Puzzle Challenge
        </h2>

        <img
          src={`/questions/${id}.jpg`}
          alt={`Question ${id}`}
          className="mx-auto rounded-lg border border-green-500 p-2 max-h-72 object-contain mb-6"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer here..."
            className="w-full p-3 bg-black text-green-300 border border-green-500 rounded-md placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-black border border-green-500 text-green-400 px-6 py-2 rounded-md hover:bg-green-800 hover:text-black transition-all duration-200 shadow-[0_0_10px_#00ff00]"
          >
            Submit
          </button>
        </form>

        <footer className="mt-10 text-xs text-gray-600 border-t border-green-900 pt-4">
          IEEE ComSoc Kerala Chapter | Morse iT! 3.0
        </footer>
      </div>
    </div>
  );
}
