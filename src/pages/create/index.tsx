import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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

  return (
    <div className="p-6">
      <div className="font-bold text-xl">Create a new event</div>
      <div className=" text-neutral-400 font-sm">{"Let's create your first event with Oknize"}</div>

      <div className="mt-4 grid grid-cols-4 gap-6">
        <div className=" col-span-2">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">Event Name</Label>
            <Input type="email" id="email" placeholder="Event Name" />
          </div>

          <div className="grid w-full items-center gap-2 mt-4">
            <Label htmlFor="email">Event Name</Label>
            <Input type="email" id="email" placeholder="Event Name" />
          </div>
        </div>

        <div className="col-span-2">
          <div className="grid w-full gap-2">
            <Label htmlFor="message">Event Description</Label>
            <Textarea placeholder="Type your message here." id="message" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
