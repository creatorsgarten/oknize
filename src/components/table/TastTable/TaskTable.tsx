import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../ui/table';

import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '../../ui/button';
import { ScheduleSlot } from '@/lib/schedule';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskTableProps {
    tableData: ScheduleSlot[];
    onSave: (data: ScheduleSlot) => void;
    onDelete: (data: ScheduleSlot) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({
    tableData,
    onSave,
    onDelete,
}) => {
    const [selectedScheduleData, setSelectedScheduleData] =
        useState<ScheduleSlot>({
            title: '',
            start: '',
            id: '',
            end: '',
            place: '',
            responsiblePeople: [],
        });

    const handleOnDialogInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSelectedScheduleData({
            ...selectedScheduleData,
            [event.target.id]: event.target.value,
        });
    };

    return (
        <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-row items-center gap-6">
                <h1 className="text-2xl font-bold">Day 1</h1>

                <Button className="flex flex-row items-center gap-2 bg-[#7F56D9] text-[#FFFFFF]">
                    <Plus size={16} />
                    Add Task
                </Button>
            </div>

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
                                <TableCell className="font-medium">
                                    {i + 1}
                                </TableCell>
                                <TableCell>{data.start}</TableCell>
                                <TableCell>{data.end}</TableCell>
                                <TableCell>{data.title}</TableCell>
                                <TableCell>{data.place}</TableCell>
                                {/* <TableCell>{data.remark}</TableCell> */}
                                <TableCell>
                                    {data.responsiblePeople.join(' ')}
                                </TableCell>

                                <TableCell>
                                    <div className="flex flex-row items-center gap-4">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    className="h-8 px-6"
                                                    id={'' + i}
                                                    onClick={(
                                                        event: React.MouseEvent<HTMLElement>
                                                    ) => {
                                                        setSelectedScheduleData(
                                                            tableData[
                                                                Number(
                                                                    event
                                                                        .currentTarget
                                                                        .id
                                                                )
                                                            ]
                                                        );
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Edit Task Schedule
                                                    </DialogTitle>
                                                </DialogHeader>

                                                <div className="grid gap-4 py-4">
                                                    <div className="flex w-full flex-col gap-4">
                                                        <div className="w-full items-center ">
                                                            <Label htmlFor="scheduleStart">
                                                                Start
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                id="start"
                                                                placeholder="(e.g. 12:00)"
                                                                onChange={
                                                                    handleOnDialogInputChange
                                                                }
                                                                value={
                                                                    selectedScheduleData.start
                                                                }
                                                            />
                                                        </div>

                                                        <div className="w-full items-center">
                                                            <Label htmlFor="scheduleEnd">
                                                                End
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                id="end"
                                                                placeholder="(e.g. 12:00)"
                                                                onChange={
                                                                    handleOnDialogInputChange
                                                                }
                                                                value={
                                                                    selectedScheduleData.end
                                                                }
                                                            />
                                                        </div>

                                                        <div className="w-full items-center ">
                                                            <Label htmlFor="title">
                                                                Title
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                id="title"
                                                                placeholder="(e.g. Hacking Time / Opening Ceremony)"
                                                                onChange={
                                                                    handleOnDialogInputChange
                                                                }
                                                                value={
                                                                    selectedScheduleData.title
                                                                }
                                                            />
                                                        </div>

                                                        <div className="w-full items-center ">
                                                            <Label htmlFor="place">
                                                                Place
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                id="place"
                                                                placeholder="(e.g. SBCx-plore)"
                                                                onChange={
                                                                    handleOnDialogInputChange
                                                                }
                                                                value={
                                                                    selectedScheduleData.place
                                                                }
                                                            />
                                                        </div>

                                                        <div className="w-full items-center">
                                                            <Label htmlFor="responsiblePeople">
                                                                Responsible
                                                                People
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                id="responsiblePeople"
                                                                placeholder="(e.g. Sila Tee)"
                                                                onChange={
                                                                    handleOnDialogInputChange
                                                                }
                                                                value={selectedScheduleData.responsiblePeople.join(
                                                                    ' '
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div></div>
                                                </div>

                                                <DialogFooter>
                                                    <DialogClose>
                                                        <Button
                                                            onClick={() => {
                                                                onSave(
                                                                    selectedScheduleData
                                                                );

                                                                // close modal
                                                            }}
                                                            type="submit"
                                                        >
                                                            Save changes
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                        <Button
                                            className="h-8 px-6"
                                            variant="destructive"
                                            onClick={() => {
                                                onDelete(selectedScheduleData);
                                            }}
                                        >
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
