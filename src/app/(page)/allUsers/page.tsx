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
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Password</th>
              <th className="border px-4 py-2">Ans0</th>
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
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.password}</td>
                <td className="border px-4 py-2">{formatTime(user.ans0)}</td>
                <td className="border px-4 py-2">{formatTime(user.ans1)}</td>
                <td className="border px-4 py-2">{formatTime(user.ans2)}</td>
                <td className="border px-4 py-2">{formatTime(user.ans3)}</td>
                <td className="border px-4 py-2">{formatTime(user.ans4)}</td>
                <td className="border px-4 py-2">{formatTime(user.ans5)}</td>
                <td className="border px-4 py-2">{formatTime(user.ans6)}</td>
                <td className="border px-4 py-2 font-semibold">{user.point}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
