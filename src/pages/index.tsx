import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>
        Next Slot:{" "}
        <span className="text-xl font-bold">Staff Evaluation 19.30</span>
      </h1>
    </main>
  );
}
