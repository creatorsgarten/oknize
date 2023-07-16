import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { deleteTask, editTask, subscribeSchedule } from "@/lib/db";
import { ScheduleSlot, getCurrentSlot, getNextSlot } from "@/lib/schedule";
import CurrentTime from "@/components/time/CurrentTime";

import TaskTable from "@/components/table/TaskTable";
import ProgressBar from "@/components/time/ProgressBar";
import runOneSignal from "@/lib/onesignal";
import { Button } from "@/components/ui/button";
import { Globe, ListFilter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/input/DatePickerWithRange";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

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
    <div>
      <Navbar />
      <div className="p-8 pb-0 ">
        <div className="flex flex-row gap-2 items-center">
          <div>หนัาหลัก</div>
          <div>/</div>
          <div className="text-[#6941C6]">จัดการอีเวนต์</div>
        </div>

        <div className="mt-6 flex flex-row justify-between">
          <div className="text-2xl font-bold">จัดการอีเวนต์</div>

          <div className="flex flex-row gap-4">
            <Link href={"/event/12345/view"}>
              <Button className="bg-[#FFFFFF] text-[#344054] border">Share</Button>
            </Link>
            <Link href={"/event/12345/view"}>
              <Button className="bg-[#7F56D9] text-[#FFFFFF] flex flex-row items-center gap-2">
                <Globe size={16} />
                Public
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 items-center justify-between w-full p-12 mt-6 bg-[#6941C6] rounded-lg">
          <div className="order-last sm:order-first">
            <div>
              <div className="text-xl text-white font-bold">Young Webmaster Camp 19th (YWC19)</div>
            </div>
            <div className="text-white mt-4">
              <p>14 Jun 2023 - 17 Jun 2023</p>
              <p>Place: SCB Training Center</p>
            </div>

            <Link href={"/event/12345/view"}>
              <Button className="mt-6 bg-[#FFFFFF] text-[#344054] hover:bg-slate-50 border">
                View
              </Button>
            </Link>
          </div>

          <Card className="">
            <CardContent>
              <div className="order-first md:order-last flex flex-col gap-4 p-6 w-full items-center">
                <h1 className="flex flex-row gap-2 items-baseline text-neutral-500">
                  เวลาปัจจุบัน
                </h1>

                <CurrentTime currentTime={currentTime} />

                <ProgressBar currentTime={currentTime} currentSlot={currentSlot} />

                <div className="flex flex-row justify-center gap-6 w-full text-sm mt-6 rounded-lg">
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
                      {nextSlot
                        ? `${nextSlot.title} (${nextSlot.start}-${nextSlot.end})`
                        : "No Slot"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-row items-center justify-between mt-8">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <Search size={20} color="#667085" />
            </span>
            <Input type="text" placeholder="Search Event" className="pl-10" />
          </div>

          <div className="flex flex-row item-center gap-4 justify-between">
            <DatePickerWithRange />

            {/* <div className="rounded-lg p-2 border border-gray-300">
            <ListFilter />
          </div> */}
          </div>
        </div>

        <div className="mt-8 w-full">
          <TaskTable
            tableData={ScheduleSlots}
            onSave={handleSaveChanges}
            onDelete={handleOnDeleteTaskData}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
