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
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function EditTaskDialog({
    onSave,
    data,
}: {
    onSave: (data: ScheduleSlot) => void;
    data: ScheduleSlot;
}) {
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
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="h-8 px-6"
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                        setSelectedScheduleData(data);
                    }}
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Task Schedule</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="flex w-full flex-col gap-4">
                        <div className="w-full items-center ">
                            <Label htmlFor="scheduleStart">Start</Label>
                            <Input
                                type="text"
                                id="start"
                                placeholder="(e.g. 12:00)"
                                onChange={handleOnDialogInputChange}
                                value={selectedScheduleData.start}
                            />
                        </div>

                        <div className="w-full items-center">
                            <Label htmlFor="scheduleEnd">End</Label>
                            <Input
                                type="text"
                                id="end"
                                placeholder="(e.g. 12:00)"
                                onChange={handleOnDialogInputChange}
                                value={selectedScheduleData.end}
                            />
                        </div>

                        <div className="w-full items-center ">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                type="text"
                                id="title"
                                placeholder="(e.g. Hacking Time / Opening Ceremony)"
                                onChange={handleOnDialogInputChange}
                                value={selectedScheduleData.title}
                            />
                        </div>

                        <div className="w-full items-center ">
                            <Label htmlFor="place">Place</Label>
                            <Input
                                type="text"
                                id="place"
                                placeholder="(e.g. SBCx-plore)"
                                onChange={handleOnDialogInputChange}
                                value={selectedScheduleData.place}
                            />
                        </div>

                        <div className="w-full items-center">
                            <Label htmlFor="responsiblePeople">
                                Responsible People
                            </Label>
                            <Input
                                type="text"
                                id="responsiblePeople"
                                placeholder="(e.g. Sila Tee)"
                                onChange={handleOnDialogInputChange}
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
                                onSave(selectedScheduleData);

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
    );
}
