import { useUser } from "../context/UserContext";

interface NavbarProps {
  questionNumber: string;
}

export default function Navbar({ questionNumber }: NavbarProps) {

  const { name } = useUser();

  return (
    <nav className="w-full px-6 py-4 bg-gray-800 text-white flex justify-between items-center shadow-md">
      <span className="text-lg font-semibold">Question {questionNumber}</span>
      <span className="text-sm text-gray-300">👤 {name}</span>
    </nav>
  );
}
