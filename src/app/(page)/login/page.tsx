"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { users } from "@/data/user";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (users[phone] && users[phone] === password) {
      router.push("/1");
    } else {
      setError("Invalid phone number or password");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-950 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-400 text-center mb-4">
          Please login to continue
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="📱 Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            required
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            required
          />
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl text-lg font-semibold transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
