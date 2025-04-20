"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type TimeTaken = {
  hours: number;
  minutes: number;
  seconds: number;
};

type Player = {
  name: string;
  point: number;
  timeTaken: TimeTaken;
};

export default function Leaderboard() {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState<Player[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);

  const getLeaderBoard = async () => {
    try {
      const response = await fetch("/api/leaderboard");
      const json = await response.json();
      console.log(json)
      setData(json);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    getLeaderBoard();
    const interval = setInterval(() => {
      getLeaderBoard();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
    setVisibleCount(10);
  };

  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const formatTime = (time: TimeTaken) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
  };

  return (
    <div className="absolute bottom-0 right-5 py-1 text-green-400 font-mono px-4 z-50">
      <div className="w-full max-w-xl">
        <div className="bg-black border border-green-700 shadow-[0_0_10px_#00ff00] p-4 rounded-xl transition-all duration-300">
          {/* Header (clickable) */}
          <div
            onClick={toggleExpand}
            className="flex justify-between items-center gap-2 cursor-pointer"
          >
            <h2 className="text-xl font-bold neon-title">🚀 Leaderboard</h2>
            {!expanded ? (
              <ChevronUp className="w-6 h-6 text-green-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-green-400" />
            )}
          </div>

          {/* Expandable content */}
          {expanded && (
            <div
              className="mt-4 overflow-y-auto"
              style={{ maxHeight: "90dvh" }}
            >
              {/* Table Header */}
              <div className="grid grid-cols-[40px_1fr_1fr_1fr] gap-2 text-center font-semibold border-b border-green-600 pb-2 px-2 text-sm md:text-base">
                <span>#</span>
                <span>Name</span>
                <span>Points</span>
                <span>Time</span>
              </div>

              {/* Leaderboard rows */}
              {data.slice(0, visibleCount).map((user, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[40px_1fr_1fr_1fr] gap-2 px-2 py-1 text-center items-center hover:bg-green-900/20 rounded transition text-sm md:text-base"
                >
                  <span>{index + 1}</span>
                  <span className="truncate">{user.name}</span>
                  <span>{user.point}</span>
                  <span>{formatTime(user.timeTaken)}</span>
                </div>
              ))}

              {/* See More button */}
              {visibleCount < data.length && (
                <div className="text-center mt-4">
                  <button
                    onClick={showMore}
                    className="text-sm border border-green-500 px-4 py-1 rounded hover:bg-green-700 hover:text-black transition shadow-[0_0_6px_#00ff00]"
                  >
                    See More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
