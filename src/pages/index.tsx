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

interface ScheduleSlot {
  id: number;
  title: string;
  start: string;
  end: string;
  place: string;
  remark?: string | "";
  responsiblePeople: string[];
}

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
    <main className={`flex min-h-screen flex-col items-center p-24 ${nunito.className}`}>
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

        <div className="col-span-2 flex flex-col gap-4 w-full">
          <h1>
            Current Slot: <span className="text-xl font-bold">Staff Evaluation 19.30</span>
          </h1>
          <h1>
            Next Slot: <span className="text-xl font-bold">Staff Evaluation 19.30</span>
          </h1>
        </div>
      </div>

      <div className="mt-6 w-full">
        <Table>
          <TableCaption>{"A list of your event's agenda"}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Slot</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Responsible People</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">0</TableCell>
              <TableCell>10:00</TableCell>
              <TableCell>11:00</TableCell>
              <TableCell>Lunch</TableCell>
              <TableCell>Thee</TableCell>

              <TableCell>
                <div className="flex flex-row items-center gap-4">
                  <Button className="h-8 px-6">Edit</Button>
                  <Button className="h-8 px-6" variant="destructive">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>

            {Schedule.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{data.id}</TableCell>
                  <TableCell>{data.start}</TableCell>
                  <TableCell>{data.end}</TableCell>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.responsiblePeople.join(" ")}</TableCell>

                  <TableCell>
                    <div className="flex flex-row items-center gap-4">
                      <Button className="h-8 px-6">Edit</Button>
                      <Button className="h-8 px-6" variant="destructive">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
