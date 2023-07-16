import TaskTable from "@/components/table/TaskTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScheduleSlot } from "@/lib/schedule";
import Image from "next/image";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";

interface Event {
  name: string;
  description: string;
  place: string;
  start: { day: number; month: number; year: number };
  end: { day: number; month: number; year: number };
}

const CreateEventPage = () => {
  const [eventData, setEventData] = useState<Event>({
    name: "",
    description: "",
    place: "",
    start: {
      day: 1,
      month: 1,
      year: 2023,
    },
    end: {
      day: 0,
      month: 0,
      year: 0,
    },
  });

  const handleEventInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEventData({
      ...eventData,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div className="mx-auto relative p-6 px-12 min-h-screen">
      <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg mx-auto px-4">
        <div className="bg-white shadow-md rounded-2xl py-16 px-8 flex flex-col gap-6">
          <div className="font-bold text-xl">คุณต้องการจัดอีเว้นท์แถวไหน ?</div>

          <div className="w-full items-center ">
            <Input
              type="text"
              id="place"
              placeholder="เลือกสถานที่ เช่น อารีย์, กรุงเทพ"
              onChange={handleEventInputChange}
              value={eventData.place}
            />
          </div>
        </div>
      </div>

      <Image
        src="/assets/purple_bg.png"
        alt=""
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default CreateEventPage;
