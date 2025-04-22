"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  phone: string;
  password: string;
  name: string;
  ans0: string;
  ans1: string;
  ans2: string;
  ans3: string;
  ans4: string;
  ans5: string;
  ans6: string;
  point: number;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/getusers");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const formatTime = (isoTime: string) => {
    const date = new Date(isoTime);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  const getTimeDifference = (start: string, end: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const diffInSeconds = (endTime - startTime) / 1000;

    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = Math.floor(diffInSeconds % 60);

    return { minutes, seconds, totalSeconds: diffInSeconds };
  };

  const getPointsForDiff = (diffInSeconds: number) => {
    if (diffInSeconds < 2 * 60) return 10;
    if (diffInSeconds < 4 * 60) return 8;
    if (diffInSeconds < 6 * 60) return 6;
    if (diffInSeconds < 8 * 60) return 4;
    if (diffInSeconds < 10 * 60) return 2;
    return 1;
  };

  const calculatePoints = (user: User) => {
    const answerTimes = [
      user.ans0,
      user.ans1,
      user.ans2,
      user.ans3,
      user.ans4,
      user.ans5,
      user.ans6,
    ];

    let totalPoints = 0;
    let previousTime = user.ans0;

    // Iterate through answers and calculate points for each time difference
    for (let i = 1; i < answerTimes.length; i++) {
      const { totalSeconds } = getTimeDifference(previousTime, answerTimes[i]);
      totalPoints += getPointsForDiff(totalSeconds);
      previousTime = answerTimes[i];
    }

    return totalPoints;
  };

  const toISTMinutes = (isoString: string): number => {
    const date = new Date(isoString);
    const IST_OFFSET = 330; // minutes
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const istTime = new Date(utc + IST_OFFSET * 60000);
    return istTime.getHours() * 60 + istTime.getMinutes();
  };

  const isValidStartTime = (iso: string) => {
    const mins = toISTMinutes(iso);
    return mins >= 18 * 60 + 59 && mins <= 21 * 60 + 1; // 6:59 PM to 9:01 PM
  };

  const isValidEndTime = (iso: string) => {
    const mins = toISTMinutes(iso);
    return mins <= 21 * 60 + 1; // before or at 9:01 PM
  };

  const processedUsers = users
    .filter(
      (user) =>
        user.ans0 &&
        user.ans1 &&
        user.ans2 &&
        user.ans3 &&
        user.ans4 &&
        user.ans5 &&
        user.ans6
    )
    .map((user) => {
      const newPoints = calculatePoints(user);
      return { ...user, point: newPoints };
    })
    .filter(
      (user) =>
        user.point <= 60 &&
        isValidStartTime(user.ans0) &&
        isValidEndTime(user.ans6) &&
        !["9562276065", "8129022838", "9605256512", "9496655461"].includes(
          user.phone
        ) // Excluding specific phone numbers
    )
    .sort((a, b) => b.point - a.point);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="border px-4 py-2">Sl No</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Login Time</th>
              <th className="border px-4 py-2">Ans1</th>
              <th className="border px-4 py-2">Ans2</th>
              <th className="border px-4 py-2">Ans3</th>
              <th className="border px-4 py-2">Ans4</th>
              <th className="border px-4 py-2">Ans5</th>
              <th className="border px-4 py-2">Ans6</th>
              <th className="border px-4 py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {processedUsers.map((user, index) => {
              const answerTimes = [
                user.ans0,
                user.ans1,
                user.ans2,
                user.ans3,
                user.ans4,
                user.ans5,
                user.ans6,
              ];
              return (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.phone}</td>
                  {answerTimes.map((time, i) => (
                    <td key={i} className="border px-4 py-2">
                      {formatTime(time)}{" "}
                      {i > 0 &&
                        `(${
                          getTimeDifference(answerTimes[i - 1], time).minutes
                        }m ${
                          getTimeDifference(answerTimes[i - 1], time).seconds
                        }s)`}
                    </td>
                  ))}
                  <td className="border px-4 py-2 font-semibold">
                    {user.point}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
