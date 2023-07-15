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

      <div mt-4></div>
    </div>
  );
};

export default CreateEventPage;
