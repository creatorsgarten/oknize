import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface ScheduleSlot {
  title: string;
  start: string;
  end: string;
  responsiblePeople: string[];
}

const Schedule: ScheduleSlot[] = [
  {
    title: "Workshop",
    start: "17:00",
    end: "18:30",
    responsiblePeople: ["Thee", "Sila"],
  },
  {
    title: "Dinner",
    start: "18:30",
    end: "19:30",
    responsiblePeople: ["Pub"],
  },
  {
    title: "Staff Evaluation",
    start: "19:30",
    end: "20:00",
    responsiblePeople: ["New"],
  },
];

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
