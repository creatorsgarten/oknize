import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { deleteTask, editTask, subscribeSchedule } from "@/lib/db";
import {
  ScheduleSlot,
  getCurrentSlot,
  getNextSlot,
  sortSchedule,
} from "@/lib/schedule";
import CurrentTime from "@/components/time/CurrentTime";

import TaskTable from "@/components/table/TaskTable";

export default function Home() {
  const [ScheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>([]);
  const [currentSlot, setCurrentSlot] = useState<ScheduleSlot | null>(null);
  const [nextSlot, setNextSlot] = useState<ScheduleSlot | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeSchedule(
      "ywc19",
      (data: { agenda: ScheduleSlot[] }) => {
        setScheduleSlots(data.agenda);

        setCurrentSlot(getCurrentSlot(data.agenda));
        setNextSlot(getNextSlot(data.agenda));
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  function updateInterval() {
    setCurrentSlot(getCurrentSlot(ScheduleSlots));
    setNextSlot(getNextSlot(ScheduleSlots));
  }

  const handleOnDeleteTaskData = (data: ScheduleSlot) => {
    deleteTask("ywc19", ScheduleSlots, data);
  };

  const handleSaveChanges = (data: ScheduleSlot) => {
    editTask("ywc19", ScheduleSlots, data);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-12 ${nunito.className}`}
    >
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
        </Card>

        <div className="col-span-2 flex flex-col gap-2 w-full">
          <h1 className="flex flex-row gap-2 items-baseline">
            Time: <CurrentTime updateInterval={updateInterval} />
          </h1>
          <h1>
            Current Slot:{" "}
            <span className="text-xl font-bold">
              {currentSlot
                ? `${currentSlot.title} ${currentSlot.start}-${currentSlot.end}`
                : "No Slot"}
            </span>
          </h1>
          <h2>
            Next Slot:{" "}
            <span className="text-xl font-bold">
              {nextSlot
                ? `${nextSlot.title} ${nextSlot.start}-${nextSlot.end}`
                : "No Slot"}
            </span>
          </h2>
        </div>
      </div>

      <div className="mt-8 w-full">
        <TaskTable
          tableData={ScheduleSlots}
          onSave={handleSaveChanges}
          onDelete={handleOnDeleteTaskData}
        />
      </div>
    </main>
  );
}
