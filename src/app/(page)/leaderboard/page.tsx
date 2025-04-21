"use client";
import { useEffect, useState } from "react";

type TimeTaken = {
  hours: number;
  minutes: number;
  seconds: number;
};

type Participant = {
  name: string;
  phone: string;
  point: number;
  timeTaken: TimeTaken;
  currentPosition: number;
};

export default function ParticipantsPage() {
  const [data, setData] = useState<Participant[]>([]);

  const getParticipants = async () => {
    try {
      const res = await fetch("/api/fullLeaderboard");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  useEffect(() => {
    getParticipants();
    const interval = setInterval(() => {
      getParticipants();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: TimeTaken) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
  };

  return (
    <div className="w-screen h-screen bg-black text-green-400 font-mono p-4 sm:p-8 overflow-auto">
      <h1 className="text-3xl font-bold text-center mb-8 neon-title">
        🧑‍💼 Participants List
      </h1>

      <div className="w-full max-w-7xl mx-auto border border-green-700 rounded-xl shadow-[0_0_15px_#00ff00]">
        {/* Table Header */}
        <div className="grid grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_1fr] sm:grid-cols-[80px_1.5fr_1.5fr_1fr_1fr_1fr] text-center font-semibold border-b border-green-600 py-3 px-4 bg-green-900/10 text-sm sm:text-base">
          <span>Sl. No</span>
          <span>Name</span>
          <span>Phone</span>
          <span>Points</span>
          <span>Time</span>
          <span>Current Qn</span>
        </div>

        {/* Rows */}
        {data.map((user, index) => (
          <div
            key={index}
            className="grid grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_1fr] sm:grid-cols-[80px_1.5fr_1.5fr_1fr_1fr_1fr] text-center items-center py-2 px-4 border-b border-green-800 hover:bg-green-800/10 transition-all text-sm sm:text-base"
          >
            <span className="font-semibold">{index + 1}</span>
            <span className="truncate">{user.name}</span>
            <span className="truncate">{user.phone}</span>
            <span>{user.point}</span>
            <span>{formatTime(user.timeTaken)}</span>
            <span>
              {user.currentPosition >= 0 ? `Q${user.currentPosition + 1}` : "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
