import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogFooter,
    DialogClose,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useEffect } from 'react';
import { addTask, deleteTask, editTask } from '@/lib/db';
import { ScheduleSlot } from '@/lib/schedule';
import CurrentTime from '@/components/time/CurrentTime';

import TaskTable from '@/components/table/TaskTable/TaskTableItem';
import ProgressBar from '@/components/time/ProgressBar';
import runOneSignal from '@/lib/onesignal';
import { Button } from '@/components/ui/button';
import { Globe, ListFilter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from '@/components/input/DatePickerWithRange';
import Link from 'next/link';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { useEvent } from '@/hooks/useEvent';
import { InferGetServerSidePropsType } from 'next';
import useScheduleSlot from '@/hooks/useScheduleSlot';
import { useRouter } from 'next/router';

import QrCode from 'react-qr-code';
import { useAuth } from '@/lib/auth';

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
    const { data: event } = useEvent(id);
    const { scheduleSlots, currentSlot, nextSlot, currentTime } =
        useScheduleSlot(id);
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        runOneSignal();
    }, []);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleOnDeleteTaskData = (data: ScheduleSlot) => {
        deleteTask(id, scheduleSlots, data);
    };

    const handleSaveChanges = (data: ScheduleSlot) => {
        editTask(id, scheduleSlots, data);
    };

    const handleAddTask = (data: ScheduleSlot) => {
        addTask(id, scheduleSlots, data);
    };

    return (
        <div>
            <Navbar />
            <div className="p-8 pb-0 ">
                <div className="flex flex-row items-center gap-2">
                    <Link href="/event">
                        <div>หนัาหลัก</div>
                    </Link>
                    <div>/</div>
                    <Link href={`/event/${id}`}>
                        <div className="text-[#6941C6]">จัดการอีเวนต์</div>
                    </Link>
                </div>

                <div className="mt-6 flex flex-row justify-between">
                    <div className="text-2xl font-bold">จัดการอีเวนต์</div>

                    <div className="flex flex-row gap-4">
                        {/* <Link href={'/event/12345/view'}>
                            <Button className="border bg-[#FFFFFF] text-[#344054]">
                                Share
                            </Button>
                        </Link> */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="flex flex-row items-center gap-2 bg-primary text-[#FFFFFF]">
                                    <Globe size={16} />
                                    Public
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="mx-auto max-w-sm py-10">
                                <DialogHeader className="p-4">
                                    <h1 className="mb-4 text-center text-lg font-bold">
                                        ดูตารางเวลาของงาน
                                        <br />
                                        <span className="text-2xl">
                                            {event?.name}
                                        </span>
                                    </h1>

                                    <QrCode
                                        size={128}
                                        style={{
                                            height: 'auto',
                                            maxWidth: '100%',
                                            width: '100%',
                                        }}
                                        value={`${router.basePath}/event/${id}/view`}
                                        viewBox={`0 0 256 256`}
                                    />
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="mt-6 grid w-full grid-cols-1 items-center justify-between gap-8 rounded-lg bg-[#6941C6] p-12 sm:grid-cols-2">
                    <div className="order-last sm:order-first">
                        <div>
                            <div className="text-2xl font-bold text-white">
                                {event?.name}
                            </div>
                        </div>
                        <div className="mt-4 text-white">
                            <p>{event?.description}</p>
                        </div>

                        <Link href={`/event/${event?.id}/view`}>
                            <Button className="mt-6 border bg-[#FFFFFF] text-[#344054] hover:bg-slate-50">
                                View
                            </Button>
                        </Link>
                    </div>

                    <Card className="">
                        <CardContent>
                            <div className="order-first flex w-full flex-col items-center gap-4 p-6 md:order-last">
                                <h1 className="flex flex-row items-baseline gap-2 text-neutral-500">
                                    เวลาปัจจุบัน
                                </h1>

                                <CurrentTime currentTime={currentTime} />

                                <ProgressBar
                                    currentTime={currentTime}
                                    currentSlot={currentSlot}
                                />

                                <div className="mt-6 flex w-full flex-row justify-center gap-6 rounded-lg text-sm">
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
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 flex flex-row items-center justify-between">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center">
                            <Search size={20} color="#667085" />
                        </span>
                        <Input
                            type="text"
                            placeholder="Search Event"
                            className="pl-10"
                        />
                    </div>

                    <div className="item-center flex flex-row justify-between gap-4">
                        <DatePickerWithRange />

                        <div className="rounded-lg border border-gray-300 p-2">
                            <ListFilter />
                        </div>
                    </div>
                </div>

                <div className="mt-8 w-full">
                    <TaskTable
                        tableData={scheduleSlots}
                        onSave={handleSaveChanges}
                        onDelete={handleOnDeleteTaskData}
                        onAdd={handleAddTask}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}
