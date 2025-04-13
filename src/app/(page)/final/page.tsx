"use client";

export default function ResultPage() {
    const score = 15;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-950 text-white px-4 text-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-lg w-full space-y-6">
        <h1 className="text-3xl font-bold">🎉 Thank You!</h1>
        <p className="text-gray-300 text-md">
          Your response has been recorded.
        </p>
        <p className="text-gray-400 text-sm">
          The final results will be displayed after the event.
        </p>

        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Your Score</h2>
          <p className="text-4xl font-bold text-green-400 mt-2">{score}</p>
        </div>
      </div>
    </div>
  );
}
