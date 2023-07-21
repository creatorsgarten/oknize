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
import {
    adjustTimeToTask,
    deleteTask,
    editTask,
    subscribeSchedule,
} from '@/lib/db';
import {
    ScheduleSlot,
    adjustTime,
    getCurrentSlot,
    getNextSlot,
    getTimeLeft,
} from '@/lib/schedule';
import CurrentTime from '@/components/time/CurrentTime';
import ProgressBar from '@/components/time/ProgressBar';
import runOneSignal from '@/lib/onesignal';
import Link from 'next/link';
import Image from 'next/image';
import { useEvent } from '@/hooks/useEvent';
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
    const { data: event } = useEvent(id);

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
                className={`flex min-h-screen flex-col items-center px-4  pb-12 sm:px-12`}
            >
                
                <div className={`mx-auto mt-8 mb-8 w-full max-w-lg text-left`}>
                    <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4 sm:col-span-2">
                            <div className='event-qr'>
                            <img src={`https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=https://oknize.grtn.org/e/${id}/&chld=L|2`} className='w-full' />
                            </div>
                        </div>
                        <div className="col-span-8 sm:col-span-10">
                            <h1 className={`line-clamp-1 truncate text-lg sm:text-xl font-bold event-title`}>{event?.name}</h1>
                            <p className='line-clamp-2 text-gray-500'>{event?.description}</p>
                        </div>
                    </div>

                </div>
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

                    {currentSlot && (
                        <div className="mx-auto mt-4 grid max-w-sm grid-cols-3 gap-10">
                            <button
                                onClick={() => {
                                    adjustTimeToTask(
                                        id,
                                        5,
                                        currentSlot,
                                        ScheduleSlots
                                    );
                                }}
                                className="group flex flex-col items-center gap-4"
                            >
                                <div className="rounded-full border border-white p-6 text-white transition-all duration-500 group-hover:bg-white group-hover:text-primary">
                                    <PlusIcon size={32} />
                                </div>

                                <span className="text-white">เพิ่มเวลา</span>
                            </button>

                            <button
                                onClick={() => {
                                    adjustTimeToTask(
                                        id,
                                        -5,
                                        currentSlot,
                                        ScheduleSlots
                                    );
                                }}
                                className="group flex flex-col items-center gap-4"
                            >
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
                    )}
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
                                        <h1 className="font-bold text-gray-800">
                                            {slot.title}
                                        </h1>
                                        <p className={'mt-1 text-gray-500 text-base flex gap-2 items-center'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='text-xs text-gray-300 opacity-50' height="1em" viewBox="0 0 512 512"><path fill="#8B55FF" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg> <time className="slot-start">{slot.start}</time> - <time className='slot-end'>{slot.end}</time>
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
