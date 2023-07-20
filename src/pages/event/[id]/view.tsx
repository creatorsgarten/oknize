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
import {
    ScheduleSlot,
    getCurrentSlot,
    getNextSlot,
    getTimeLeft,
} from '@/lib/schedule';
import CurrentTime from '@/components/time/CurrentTime';
import ProgressBar from '@/components/time/ProgressBar';
import runOneSignal from '@/lib/onesignal';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { InferGetServerSidePropsType } from 'next';
import { MinusIcon, PlusIcon, RepeatIcon } from 'lucide-react';

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

            <main
                className={`flex min-h-screen flex-col items-center px-4 py-12 sm:px-12`}
            >
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-[#7049FF] to-[#8B55FF] px-4 py-8 sm:px-8">
                    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl bg-white p-10 shadow-md md:col-span-2">
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-gray-900">Current Event</p>

                            {/* <CurrentTime currentTime={currentTime} /> */}
                            <h1 className="whitespace-pre-wrap text-3xl font-bold text-black">
                                {currentSlot?.title ?? 'No Slot'}
                            </h1>
                        </div>

                        {currentSlot && (
                            <p className="text-gray-900">
                                เหลือเวลา{' '}
                                <span className="font-bold">
                                    {getTimeLeft(currentTime, currentSlot)}
                                </span>
                            </p>
                        )}

                        <ProgressBar
                            currentTime={currentTime}
                            currentSlot={currentSlot}
                        />

                        <div className="mt-6 flex w-full flex-col justify-center gap-4 text-sm">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-bold text-black">
                                    Next Event
                                </h2>
                                <span className="text-ellipsis text-neutral-500">
                                    {nextSlot
                                        ? `${nextSlot.title} (${nextSlot.start}-${nextSlot.end})`
                                        : 'No Slot'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto mt-4 grid max-w-sm grid-cols-3 gap-10">
                        <button className="group flex flex-col items-center gap-4">
                            <div className="rounded-full border border-white p-6 text-white transition-all duration-500 group-hover:bg-white group-hover:text-primary">
                                <PlusIcon size={32} />
                            </div>

                            <span className="text-white">เพิ่มเวลา</span>
                        </button>

                        <button className="group flex flex-col items-center gap-4">
                            <div className="rounded-full border border-white p-6 text-white transition-all duration-500 group-hover:bg-white group-hover:text-primary">
                                <MinusIcon size={32} />
                            </div>

                            <span className="text-white">ลดเวลา</span>
                        </button>

                        <button className="group flex flex-col items-center gap-4">
                            <div className="rounded-full border border-white p-6 text-white transition-all duration-500 group-hover:bg-white group-hover:text-primary">
                                <RepeatIcon size={32} />
                            </div>

                            <span className="text-white">สับเปลี่ยน</span>
                        </button>
                    </div>
                </div>

                <div className="mx-auto mt-8 w-full max-w-lg">
                    <Tabs.Root className="TabsRoot" defaultValue="day1">
                        <Tabs.List
                            className="TabsList"
                            aria-label="Manage schedule"
                        >
                            <div className="mb-6 flex gap-2">
                                <Tabs.Trigger
                                    className="TabsTrigger"
                                    value="day1"
                                >
                                    <div className="rounded-md border border-primary p-4 text-primary">
                                        DAY
                                        <br />
                                        <span className="font-bold">1</span>
                                    </div>
                                </Tabs.Trigger>

                                <Tabs.Trigger
                                    className="TabsTrigger"
                                    value="day2"
                                >
                                    <div className="rounded-md border border-gray-200 p-4 text-gray-900">
                                        DAY
                                        <br />
                                        <span className="font-bold">2</span>
                                    </div>
                                </Tabs.Trigger>
                            </div>
                        </Tabs.List>

                        <div className="mt-4 flex flex-col gap-2">
                            {ScheduleSlots.map((slot) => {
                                return (
                                    <div
                                        className={cn(
                                            'rounded-sm border-l-8 bg-gray-100 px-10 py-4 shadow-sm transition-all duration-500 hover:shadow-lg',
                                            currentSlot?.id === slot.id
                                                ? 'border-[#FD9824]'
                                                : 'border-[#7F56D9]'
                                        )}
                                        key={slot.id}
                                    >
                                        <h1 className="text-bold text-gray-800">
                                            {slot.title}
                                        </h1>
                                        <p className={'text-gray-800'}>
                                            {slot.start} - {slot.end}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </Tabs.Root>
                </div>
            </main>
        </div>
    );
}
