import TaskTable from '@/components/table/TastTable/TaskTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScheduleSlot } from '@/lib/schedule';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEventHandler, useState } from 'react';

interface Event {
    name: string;
    description: string;
    place: string;
    start: { day: number; month: number; year: number };
    end: { day: number; month: number; year: number };
}

const CreateEventPage = () => {
    const [eventData, setEventData] = useState<Event>({
        name: '',
        description: '',
        place: '',
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

    const handleEventInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEventData({
            ...eventData,
            [event.target.id]: event.target.value,
        });
    };

    return (
        <div className="relative mx-auto min-h-screen p-6 px-12">
            <div className="absolute left-1/2 top-1/2 z-10 mx-auto w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4">
                <div className="flex flex-col gap-6 rounded-2xl bg-white px-8 py-16 shadow-md">
                    <div className="text-xl font-bold">
                        คุณต้องการจัดอีเว้นท์แถวไหน ?
                    </div>

                    <div className="w-full items-center ">
                        <Input
                            type="text"
                            id="place"
                            placeholder="เลือกสถานที่ เช่น อารีย์, กรุงเทพ"
                            onChange={handleEventInputChange}
                            value={eventData.place}
                        />
                    </div>
                </div>
            </div>

            <Image
                src="/assets/purple_bg.png"
                alt=""
                layout="fill"
                objectFit="cover"
            />
        </div>
    );
};

export default CreateEventPage;
