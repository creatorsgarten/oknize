import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { ScheduleSlot } from "@/lib/schedule";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

interface TaskTableProps {
  tableData: ScheduleSlot[];
  onDelete: () => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tableData, onDelete }) => {
  return (
    <div>
      <Table>
        {/* <TableCaption>{"A list of your event's agenda"}</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Slot</TableHead>
            <TableHead className="w-[100px]">Start</TableHead>
            <TableHead className="w-[100px]">End</TableHead>
            <TableHead className="w-[250px]">Title</TableHead>
            <TableHead>Place</TableHead>
            {/* <TableHead>Remark (Optional)</TableHead> */}
            <TableHead>Responsible People</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((data, i) => {
            return (
              <TableRow key={`${data.title} ${i}`}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{data.start}</TableCell>
                <TableCell>{data.end}</TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.place}</TableCell>
                {/* <TableCell>{data.remark}</TableCell> */}
                <TableCell>{data.responsiblePeople.join(" ")}</TableCell>

                <TableCell>
                  <div className="flex flex-row items-center gap-4">
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="h-8 px-6" onClick={() => {}}>
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Task Schedule</DialogTitle>
                          </DialogHeader>

                          <div className="grid gap-4 py-4">
                            {/* <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Username
                              </Label>
                              <Input id="username" value="@peduarte" className="col-span-3" />
                            </div> */}
                            <div className="flex flex-col gap-4 w-full">
                              <div className="w-full items-center ">
                                <Label htmlFor="scheduleStart">Start</Label>
                                <Input type="text" id="scheduleStart" placeholder="(e.g. 12:00)" />
                              </div>

                              <div className="w-full items-center">
                                <Label htmlFor="scheduleEnd">End</Label>
                                <Input type="text" id="scheduleEnd" placeholder="(e.g. 12:00)" />
                              </div>

                              <div className="w-full items-center ">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                  type="text"
                                  id="title"
                                  placeholder="(e.g. Hacking Time / Opening Ceremony)"
                                />
                              </div>

                              <div className="w-full items-center ">
                                <Label htmlFor="place">Place</Label>
                                <Input type="text" id="place" placeholder="(e.g. SBCx-plore)" />
                              </div>

                              <div className="w-full items-center">
                                <Label htmlFor="responsiblePeople">Responsible People</Label>
                                <Input
                                  type="text"
                                  id="responsiblePeople"
                                  placeholder="(e.g. Sila Tee)"
                                />
                              </div>
                            </div>
                            <div></div>
                          </div>

                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <Button className="h-8 px-6" variant="destructive" onClick={onDelete}>
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
  );
};

export default TaskTable;
