import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import * as Tabs from '@radix-ui/react-tabs';

import { useEffect, useState } from 'react';
import { deleteTask, editTask, subscribeSchedule } from '@/lib/db';
import { ScheduleSlot, getCurrentSlot, getNextSlot } from '@/lib/schedule';
import CurrentTime from '@/components/time/CurrentTime';
import ProgressBar from '@/components/time/ProgressBar';
import runOneSignal from '@/lib/onesignal';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { InferGetServerSidePropsType } from 'next';

const Navbar = () => {
    return (
        <nav className="border-b-1 flex flex-row items-center justify-between border p-4">
            <Link className="text-2xl font-medium" href={'/'}>
                <div className="w-24">
                    <Image
                        src="/assets/logo.svg"
                        width={300}
                        alt=""
                        height={100}
                    />
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

export function getServerSideProps({ params }: { params: { id: string } }) {
    return {
        props: {
            id: params.id,
        },
    };
}

export default function View({
    id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [ScheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>([]);
    const [currentSlot, setCurrentSlot] = useState<ScheduleSlot | null>(null);
    const [nextSlot, setNextSlot] = useState<ScheduleSlot | null>(null);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const unsubscribe = subscribeSchedule(
            id,
            (data: { agenda: ScheduleSlot[] }) => {
                setScheduleSlots(data.agenda);

                setCurrentSlot(getCurrentSlot(data.agenda));
                setNextSlot(getNextSlot(data.agenda));
            }
        );

        return () => {
            unsubscribe();
        };
    }, [id]);

    useEffect(() => {
        function updateInterval() {
            setCurrentSlot(getCurrentSlot(ScheduleSlots));
            setNextSlot(getNextSlot(ScheduleSlots));
        }

        const interval = setInterval(() => {
            var today = new Date();
            var now = today.toLocaleTimeString('th-TH');
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
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-[#7049FF] to-[#8B55FF] px-4 py-20 sm:px-16">
                    <div className="flex w-full flex-col items-center gap-6 rounded-2xl bg-white p-10 shadow-md md:col-span-2">
                        <h1 className="flex flex-row items-baseline gap-2 text-neutral-500">
                            Current Time
                        </h1>

                        <CurrentTime currentTime={currentTime} />

                        <ProgressBar
                            currentTime={currentTime}
                            currentSlot={currentSlot}
                        />

                        <div className="mt-6 flex w-full flex-col justify-center gap-4 text-sm">
                            <div className="flex flex-col">
                                <h2 className="font-bold text-black">
                                    กิจกรรมปัจจุบัน
                                </h2>
                                <span className="text-neutral-500">
                                    {currentSlot
                                        ? `${currentSlot.title} (${currentSlot.start}-${currentSlot.end})`
                                        : 'No Slot'}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="font-bold text-black">
                                    กิจกรรมถัดไป
                                </h2>
                                <span className="text-neutral-500">
                                    {nextSlot
                                        ? `${nextSlot.title} (${nextSlot.start}-${nextSlot.end})`
                                        : 'No Slot'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* <div className={notosansthai.className}>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="flex items-center gap-2 rounded-lg bg-gradient-to-b from-white to-slate-100 px-12 py-6 text-lg font-bold text-purple-600 shadow-md">
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
                                    <DialogTitle>
                                        เลือกรูปแบบการ เพิ่ม/ลด ของ Task
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="flex w-full flex-col gap-4">
                                        <div className="w-full items-center ">
                                            <Label htmlFor="scheduleStart">
                                                รูปแบบ
                                            </Label>
                                            <Input
                                                type="text"
                                                id="start"
                                                placeholder="เลือกรูปแบบที่ต้องการ"
                                                // onChange={handleOnDialogInputChange}
                                                // value={selectedScheduleData.start}
                                            />
                                        </div>

                                        <div className="w-full items-center">
                                            <Label htmlFor="scheduleEnd">
                                                ชื่อ Task
                                            </Label>
                                            <Input
                                                type="text"
                                                id="end"
                                                placeholder="ชื่อ Task"
                                                // onChange={handleOnDialogInputChange}
                                                // value={selectedScheduleData.end}
                                            />
                                        </div>

                                        <div className="w-full items-center">
                                            <Label htmlFor="duration">
                                                ระยะเวลา (นาที)
                                            </Label>
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
                                            className="rounded-md bg-purple-600 px-8 py-3 text-center text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                        >
                                            ตกลง
                                        </button>
                                    </DialogClose>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div> */}
                </div>

                <div className="mx-auto mt-8 w-full max-w-lg">
                    <Tabs.Root className="TabsRoot" defaultValue="day1">
                        <Tabs.List
                            className="TabsList"
                            aria-label="Manage schedule"
                        >
                            <div className="mb-6 flex gap-4">
                                <Tabs.Trigger
                                    className="TabsTrigger"
                                    value="day1"
                                >
                                    Day 1
                                </Tabs.Trigger>
                                {/* <Tabs.Trigger
                                    className="TabsTrigger"
                                    value="day2"
                                >
                                    Day 2
                                </Tabs.Trigger> */}
                            </div>
                        </Tabs.List>

                        <p className="text-neutral-500">All Event</p>
                        <div className="flex flex-col gap-2">
                            {ScheduleSlots.map((slot) => {
                                return (
                                    <div
                                        className={cn(
                                            'rounded-sm px-10 py-4 shadow-sm transition-all duration-500 hover:shadow-lg',
                                            currentSlot?.id === slot.id
                                                ? 'bg-gradient-to-r from-[#7049FF] to-[#8B55FF] text-white'
                                                : 'bg-white'
                                        )}
                                        key={slot.id}
                                    >
                                        <h1 className="text-bold">
                                            {slot.title}
                                        </h1>
                                        <p
                                            className={
                                                currentSlot?.id === slot.id
                                                    ? 'text-white'
                                                    : 'text-neutral-500'
                                            }
                                        >
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
