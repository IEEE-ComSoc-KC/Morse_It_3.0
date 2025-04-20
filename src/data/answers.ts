// Key: question ID, Value: correct answer object with image and optional audio
export const answers: Record<string, { image: string; audio?: string, answer: string }> = {
  "1": {
    image: "/questions/1.jpg",
    answer: "PISCATAWAY"
  },
  "2": {
    image: "/questions/2.jpg",
    answer: "KENTUCKY"
  },
  "3": {
    image: "/questions/3.jpg",
    answer: "SEMAPHORE"
  },
  "4": {
    image: "/questions/4.jpg",
    audio: "/audio/5.wav",
    answer: "TELSTAR"
  },
  "5": {
    image: "/questions/5.jpg",
    audio: "/audio/5.wav",
    answer: "GUGLIELMO"
  },
  "6": {
    image: "/questions/6.jpg",
    audio: "/audio/5.wav",
    answer: "WAVE"
  },
};
