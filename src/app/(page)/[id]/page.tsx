"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { answers } from "@/data/answers";
import Navbar from "@/app/component/navbar";
import { useUser } from "@/app/context/UserContext";
import Leaderboard from "@/app/component/leaderboard";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DynamicPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isAccess, setIsAccess] = useState(false);

  const { userId, finalString } = useUser();

  const correctData = answers[id];

  const checkProgress = async () => {
    console.log("inside check progress", userId, finalString);

    try {
      const response = await fetch("/api/currentqn", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      console.log("page dynamic", response);

      if (response.status === 204) {
        router.push("/final");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to fetch current question:", errorData.message);
        return;
      }

      const data = await response.json();
      const nextQuestionField = data.nextQuestionField;

      if (`ans${id}` === nextQuestionField) {
        setIsAccess(true);
        console.log("You are at the correct question!");
      } else {
        if (nextQuestionField === "ans0") {
          router.push("/login");
        } else {
          const qn = nextQuestionField.replace("ans", "");
          router.push(`/${qn}`);
        }
      }
    } catch (error) {
      console.error("Error while checking progress:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = correctData?.answer;

    if (answer.trim().toLowerCase() === correctAnswer?.toLowerCase()) {
      try {
        const response = await fetch("/api/setans", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId, number: id }),
        });

        if (response.ok) {
          const nextId = (parseInt(id) + 1).toString();
          if (nextId === "7") router.push("/final");
          else router.push(`/${nextId}`);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("❌ Answer is wrong. Try again!");
    }
  };

  useEffect(() => {
    checkProgress();
  }, []);

  if (isAccess && correctData)
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono bg-[radial-gradient(#0f0_1px,transparent_1px)] bg-[size:20px_20px]">
        <Navbar questionNumber={id} />

        <div className="max-w-2xl mx-auto mt-10 p-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 neon-title">
            Morse iT! 3.0
          </h1>
          <h2 className="text-xl font-semibold mb-6 text-green-500">
            Morse Code Puzzle Challenge
          </h2>

          <div className="mb-6 rounded-lg border border-green-500 h-[300px] relative overflow-hidden">
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={5}
              doubleClick={{ mode: "reset" }}
              wheel={{ step: 0.2 }}
              pinch={{ step: 0.5 }}
              panning={{ velocityDisabled: true }}
              centerOnInit
              centerZoomedOut
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <div className="flex flex-col items-center gap-2 w-full h-full relative">
                  <div className="flex gap-2 mb-2 absolute top-3 z-30">
                    <button
                      onClick={() => zoomIn()}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded"
                    >
                      Zoom In
                    </button>
                    <button
                      onClick={() => zoomOut()}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded"
                    >
                      Zoom Out
                    </button>
                    <button
                      onClick={() => resetTransform()}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded"
                    >
                      Reset
                    </button>
                  </div>
                  <TransformComponent>
                    <div
                      className="w-full h-full flex justify-center items-center perspective-3d"
                      style={{ perspective: "1000px" }}
                    >
                      <img
                        src={correctData.image}
                        alt={`Question ${id}`}
                        className="object-cover transition-transform duration-300 ease-in-out"
                        style={{ transformStyle: "preserve-3d" }}
                      />
                    </div>
                  </TransformComponent>
                </div>
              )}
            </TransformWrapper>
          </div>

          {correctData.audio && (
            <div className="mb-6">
              <audio controls className="w-full outline-none">
                <source src={correctData.audio} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
              <p className="text-xs text-green-400 mt-2 italic">
                🔊 Listen carefully...
              </p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
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

        <Leaderboard />
      </div>
    );
  else
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center bg-[radial-gradient(#0f0_1px,transparent_1px)] bg-[size:20px_20px] overflow-y-hidden">
        <div className="text-center animate-pulse space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold neon-title">
            Morse iT! 3.0
          </h1>
          <p className="text-green-500 text-lg">
            Initializing Secure Channel...
          </p>
          <p className="text-green-300 text-sm tracking-wider">
            Redirecting to your challenge...
          </p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-150" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-300" />
          </div>
        </div>
      </div>
    );
}
