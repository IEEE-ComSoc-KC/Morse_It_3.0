"use client";

export default function ResultPage() {
  const score = 15;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono bg-[radial-gradient(#0f0_1px,transparent_1px)] bg-[size:20px_20px] px-4">
      <div className="max-w-lg w-full p-8 rounded-2xl backdrop-blur-md bg-green-400/10 border border-green-600 shadow-[0_0_20px_#00ff00] space-y-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold neon-title">
          🎉 Thank You!
        </h1>

        <p className="text-green-300 text-md">
          Your response has been recorded.
        </p>

        <p className="text-green-500 text-sm">
          The final results will be displayed after the event.
        </p>

        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Your Score</h2>
          <p className="text-5xl font-extrabold text-green-300 mt-2">{score}</p>
        </div>

        <footer className="pt-4 border-t border-green-900 text-xs text-green-500">
          IEEE ComSoc Kerala Chapter | Morse iT! 3.0
        </footer>
      </div>
    </div>
  );
}
