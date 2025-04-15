"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { setUserId, setName, setFinalString } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      console.log("User:", data);

      // Assuming the response has fields 'id', 'name' for the logged-in user
      setName(data.name); // Set the user's name in context
      setUserId(data.id); // Set the user's id in context
      setFinalString(data.id); // Reset the finalString value

      // Always redirect to "/1"
      router.push("/1");
    } catch (error) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred.");
    }
  };


  return (
    <div className="flex min-h-screen justify-center items-center bg-black text-green-400 font-mono bg-[radial-gradient(#0f0_1px,transparent_1px)] bg-[size:20px_20px] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black border border-green-700 shadow-[0_0_20px_#00ff00] p-10 rounded-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center neon-title">
          Morse Login
        </h2>
        <p className="text-sm text-green-300 text-center">
          Enter your credentials to begin.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="📱 Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 bg-black border border-green-500 rounded-lg text-green-400 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-black border border-green-500 rounded-lg text-green-400 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center font-semibold">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-black border border-green-500 text-green-400 hover:bg-green-700 hover:text-black p-3 rounded-lg font-bold transition shadow-[0_0_10px_#00ff00]"
        >
          Login
        </button>
      </form>
    </div>
  );
}
