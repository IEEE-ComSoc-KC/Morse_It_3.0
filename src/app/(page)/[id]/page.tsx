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
        console.log(id)
        const nextId = (parseInt(id) + 1).toString();
        if (nextId === "4") router.push("/final");
        else router.push(`/${nextId}`);
    } else {
      setError("❌ Answer is wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar username={username} questionNumber={id} />

      <div className="max-w-xl mx-auto mt-10 p-4 text-center space-y-6">
        <img
          src={`/questions/${id}.jpg`}
          alt={`Question ${id}`}
          className="mx-auto rounded-lg shadow-md max-h-72 object-contain"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition"
          >
            Submit Answer
          </button>
        </form>
      </div>
    </div>
  );
}
