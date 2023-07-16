import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import * as Tabs from "@radix-ui/react-tabs";

import { useEffect, useState } from "react";
import { deleteTask, editTask, subscribeSchedule } from "@/lib/db";
import { ScheduleSlot, getCurrentSlot, getNextSlot } from "@/lib/schedule";
import CurrentTime from "@/components/time/CurrentTime";

import TaskTable from "@/components/table/TaskTable";
import ProgressBar from "@/components/time/ProgressBar";
import runOneSignal from "@/lib/onesignal";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Noto_Sans_Thai } from "next/font/google";

const notosansthai = Noto_Sans_Thai({ subsets: ["thai"] });

const Navbar = () => {
  return (
    <nav className="p-4 border-b-1 border flex flex-row justify-between items-center">
      <Link className="text-2xl font-medium" href={"/"}>
        <div className="w-24">
          <Image src="/assets/logo.svg" width={300} alt="" height={100} />
        </div>
      </Link>

      {/* <Link href={"/event"}>
        <button className="bg-purple-600 shadow-md py-2 px-8 rounded-lg text-white transition-all duration-500 hover:bg-purple-700 hover:shadow-lg">
          เข้าใช้งาน
        </button>
      </Link> */}
    </nav>
  );
};

export default function View() {
  const [ScheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>([]);
  const [currentSlot, setCurrentSlot] = useState<ScheduleSlot | null>(null);
  const [nextSlot, setNextSlot] = useState<ScheduleSlot | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeSchedule("ywc19", (data: { agenda: ScheduleSlot[] }) => {
      setScheduleSlots(data.agenda);

      setCurrentSlot(getCurrentSlot(data.agenda));
      setNextSlot(getNextSlot(data.agenda));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOnDeleteTaskData = (data: ScheduleSlot) => {
    deleteTask("ywc19", ScheduleSlots, data);
  };

  const handleSaveChanges = (data: ScheduleSlot) => {
    editTask("ywc19", ScheduleSlots, data);
  };

  useEffect(() => {
    function updateInterval() {
      setCurrentSlot(getCurrentSlot(ScheduleSlots));
      setNextSlot(getNextSlot(ScheduleSlots));
    }

    const interval = setInterval(() => {
      var today = new Date();
      var now = today.toLocaleTimeString("th-TH");
      setCurrentTime(now);

      updateInterval();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [ScheduleSlots]);

  useEffect(() => {
    runOneSignal();
  }, []);

  return (
    <div className="">
      <Navbar />

      <main className={`flex min-h-screen flex-col items-center p-12`}>
        <div className="px-4 sm:px-16 py-20 flex flex-col gap-4 justify-center items-center rounded-2xl bg-gradient-to-r from-[#7049FF] to-[#8B55FF]">
          <div className="md:col-span-2 bg-white shadow-md rounded-2xl flex flex-col gap-6 w-full items-center p-10">
            <h1 className="flex flex-row gap-2 items-baseline text-neutral-500">Current Time</h1>

            <CurrentTime currentTime={currentTime} />

            <ProgressBar currentTime={currentTime} currentSlot={currentSlot} />

            <div className="flex flex-col justify-center gap-4 mt-6 w-full text-sm">
              <div className="flex flex-col">
                <h2 className="font-bold text-black">กิจกรรมปัจจุบัน</h2>
                <span className="text-neutral-500">
                  {currentSlot
                    ? `${currentSlot.title} (${currentSlot.start}-${currentSlot.end})`
                    : "No Slot"}
                </span>
              </div>
              <div className="flex flex-col">
                <h2 className="font-bold text-black">กิจกรรมถัดไป</h2>
                <span className="text-neutral-500">
                  {nextSlot ? `${nextSlot.title} (${nextSlot.start}-${nextSlot.end})` : "No Slot"}
                </span>
              </div>
            </div>
          </div>

          <div className={notosansthai.className}>
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-12 flex items-center gap-2 py-6 bg-gradient-to-b from-white to-slate-100 text-purple-600 text-lg font-bold shadow-md rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="#6941C6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.625 4.375l-11.25 11.25M2.5 5.625h6.25M5.625 2.5v6.25M11.25 14.375h6.25"
                    ></path>
                  </svg>
                  เพิ่ม/ลดเวลา
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>เลือกรูปแบบการ เพิ่ม/ลด ของ Task</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-4 w-full">
                    <div className="w-full items-center ">
                      <Label htmlFor="scheduleStart">รูปแบบ</Label>
                      <Input
                        type="text"
                        id="start"
                        placeholder="เลือกรูปแบบที่ต้องการ"
                        // onChange={handleOnDialogInputChange}
                        // value={selectedScheduleData.start}
                      />
                    </div>

                    <div className="w-full items-center">
                      <Label htmlFor="scheduleEnd">ชื่อ Task</Label>
                      <Input
                        type="text"
                        id="end"
                        placeholder="ชื่อ Task"
                        // onChange={handleOnDialogInputChange}
                        // value={selectedScheduleData.end}
                      />
                    </div>

                    <div className="w-full items-center">
                      <Label htmlFor="duration">ระยะเวลา (นาที)</Label>
                      <Input
                        type="text"
                        id="end"
                        placeholder="ระยะเวลา"
                        // onChange={handleOnDialogInputChange}
                        // value={selectedScheduleData.end}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <DialogClose>
                    <button
                      onClick={() => {
                        // onSave(selectedScheduleData);
                        // close modal
                      }}
                      type="submit"
                      className="text-center px-8 py-3 rounded-md shadow-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      ตกลง
                    </button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="mt-8 w-full max-w-lg mx-auto">
          <Tabs.Root className="TabsRoot" defaultValue="day1">
            <Tabs.List className="TabsList" aria-label="Manage schedule">
              <div className="mb-6 flex gap-4">
                <Tabs.Trigger className="TabsTrigger pb-4 border-b border-purple-500" value="day1">
                  Day 1
                </Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger border-b pb-4" value="day2">
                  Day 2
                </Tabs.Trigger>
              </div>
            </Tabs.List>

            <p className="text-neutral-500">All Event</p>
            <div className="flex flex-col gap-2">
              {ScheduleSlots.map((slot) => {
                return (
                  <div
                    className={cn(
                      "py-4 px-10 rounded-sm shadow-sm transition-all duration-500 hover:shadow-lg",
                      currentSlot?.id === slot.id
                        ? "bg-gradient-to-r from-[#7049FF] to-[#8B55FF] text-white"
                        : "bg-white"
                    )}
                    key={slot.id}
                  >
                    <h1 className="text-bold">{slot.title}</h1>
                    <p className={currentSlot?.id === slot.id ? "text-white" : "text-neutral-500"}>
                      {slot.start} - {slot.end}
                    </p>
                  </div>
                );
              })}
            </div>
          </Tabs.Root>

          {/* <TaskTable
            tableData={ScheduleSlots}
            onSave={handleSaveChanges}
            onDelete={handleOnDeleteTaskData}
          /> */}
        </div>
      </main>
    </div>
  );
}
