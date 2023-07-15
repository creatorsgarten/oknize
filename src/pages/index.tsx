import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CurrentTime from "@/components/time/CurrentTime";

import { ScheduleSlot } from "@/types";
import TaskTable from "@/components/table/TaskTable";

const Schedule: ScheduleSlot[] = [
  {
    id: 1,
    title: "Workshop",
    start: "17:00",
    end: "18:30",
    place: "SCBx-Plore",
    responsiblePeople: ["Thee", "Sila"],
  },
  {
    id: 2,
    title: "Dinner",
    start: "18:30",
    end: "19:30",
    place: "Jitta Conference",
    responsiblePeople: ["Pub"],
  },
  {
    id: 3,
    title: "Staff Evaluation",
    start: "19:30",
    end: "20:00",
    place: "SDG Global",
    responsiblePeople: ["New"],
  },
];

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center p-12 ${nunito.className}`}>
      <div className="grid grid-cols-5 items-center justify-between w-full gap-12">
        <Card className=" col-span-3 w-full">
          <CardHeader>
            <CardTitle>Young Webmaster Camp 19th (YWC19)</CardTitle>
            <CardDescription>
              ค่ายสร้างเว็บระดับอุดมศึกษาที่จัดโดยสมาคมผู้ดูแลเว็บและสื่อออนไลน์ไทย
              จัดขึ้นเป็นประจำทุกปี
              เพื่อผลิตบุคลากรหน้าใหม่ด้านดิจิทัลให้พร้อมเข้าสู่การทำงานด้านดิจิทัลในอนาคต
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Date: 14 - 17 July, 2023</p>
            <p>Place: SCB Training Center</p>
          </CardContent>
          {/* <CardFooter>
            <p>14 - 17 July, 2023</p>
          </CardFooter> */}
        </Card>

        <div className="col-span-2 flex flex-col gap-2 w-full">
          <h1 className="flex flex-row gap-2 items-baseline">
            Time: <CurrentTime />
          </h1>
          <h1>
            Current Slot: <span className="text-xl font-bold">Staff Evaluation 19.30</span>
          </h1>
          <h2>
            Next Slot: <span className="text-xl font-bold">Staff Evaluation 19.30</span>
          </h2>
        </div>
      </div>

      <div className="mt-8 w-full">
        <TaskTable tableData={Schedule} />
      </div>
    </main>
  );
}
