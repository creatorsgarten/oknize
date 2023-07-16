import TaskTable from "@/components/table/TaskTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScheduleSlot } from "@/lib/schedule";
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

  const [scheduleData, setScheduleData] = useState({
    title: "",
    start: "",
    end: "",
    id: "",
    place: "",
    responsiblePeople: "",
  });

  const [taskData, setTaskData] = useState<ScheduleSlot[]>([]);
  const [test, setTest] = useState("");

  const handleOnTaskInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setScheduleData({ ...scheduleData, [event.target.id]: event.target.value });
  };

  const handleOnAddTaskData = () => {
    const newScheduleData = {
      ...scheduleData,
      responsiblePeople: scheduleData.responsiblePeople.split(" "),
    };
    setTaskData([...taskData, newScheduleData]);
    setScheduleData({
      title: "",
      start: "",
      end: "",
      id: "",
      place: "",
      responsiblePeople: "",
    });
  };

  const handleOnDeleteTaskData = () => {};
  const handleSaveChanges = () => {};

  return (
    <div className="p-6 px-12">
      <div className="font-bold text-xl">Create a new event</div>
      <div className=" text-neutral-400 font-sm">
        {"Let's create your first event with Oknize."}
      </div>

      <div className="mt-6 grid grid-cols-4 gap-6">
        <div className=" col-span-2">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Event Name</Label>
            <Input type="text" id="name" placeholder="Name" />
          </div>

          <div className="grid w-full items-center gap-2 mt-4">
            <Label htmlFor="location">Event Location</Label>
            <Input type="text" id="location" placeholder="Location" />
          </div>
        </div>

        <div className="col-span-2">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="start">Event Start-Date</Label>
            <Input type="text" id="start" placeholder="Start Date" />
          </div>

          <div className="grid w-full items-center gap-2 mt-4">
            <Label htmlFor="end">Event End-Date</Label>
            <Input type="text" id="end" placeholder="End Date" />
          </div>
        </div>
      </div>

      <div className="grid w-full gap-2 mt-4">
        <Label htmlFor="description">Event Description</Label>
        <Textarea
          className="min-h-[12vh]"
          placeholder="Type your event desscription here."
          id="description"
        />
      </div>

      <div className="mt-6">
        <div className="font-bold text-xl">Event task schedule</div>
        <div className=" text-neutral-400 font-sm">
          {
            "Planning a schedule and assign people who responsible on that task."
          }
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-2 w-full items-center ">
            <Label htmlFor="scheduleStart">Start</Label>
            <Input
              type="text"
              id="start"
              placeholder="(e.g. 12:00)"
              value={scheduleData.start}
              onChange={handleOnTaskInputChange}
            />
          </div>

          <div className="col-span-2 w-full items-center">
            <Label htmlFor="scheduleEnd">End</Label>
            <Input
              type="text"
              id="end"
              placeholder="(e.g. 12:00)"
              value={scheduleData.end}
              onChange={handleOnTaskInputChange}
            />
          </div>

          <div className="col-span-3 w-full items-center ">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="(e.g. Hacking Time / Opening Ceremony)"
              value={scheduleData.title}
              onChange={handleOnTaskInputChange}
            />
          </div>

          <div className="col-span-2 w-full items-center ">
            <Label htmlFor="place">Place</Label>
            <Input
              type="text"
              id="place"
              placeholder="(e.g. SBCx-plore)"
              value={scheduleData.place}
              onChange={handleOnTaskInputChange}
            />
          </div>

          <div className="col-span-2 w-full items-center">
            <Label htmlFor="responsiblePeople">Responsible People</Label>
            <Input
              type="text"
              id="responsiblePeople"
              placeholder="(e.g. Sila Tee)"
              value={scheduleData.responsiblePeople}
              onChange={handleOnTaskInputChange}
            />
          </div>

          <div className="col-span-1">
            <Button onClick={handleOnAddTaskData}>Add</Button>
          </div>
        </div>

        <div className="mt-4">
          <TaskTable
            tableData={taskData}
            onSave={handleSaveChanges}
            onDelete={handleOnDeleteTaskData}
          />
        </div>

        <Link href="/">
          <Button className="w-full mt-6">Create Event !</Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateEventPage;
