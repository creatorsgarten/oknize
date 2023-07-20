import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EventItem } from '@/hooks/useEvent';
import { addEvent } from '@/lib/db';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CreateEventPage = () => {
    const router = useRouter();
    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        status: 'public',
        agenda: [],
    });

    const handleEventInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEventData({
            ...eventData,
            [event.target.id]: event.target.value,
        });
    };

    function onSubmit() {
        return addEvent(eventData);
    }

    return (
        <div className="relative mx-auto min-h-screen w-full bg-gradient-to-r from-[#6B48FF] to-[#915DFF] p-6 px-12">
            <div className="absolute left-1/2 top-1/2 z-10 mx-auto w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4">
                <div className="flex flex-col gap-6 rounded-2xl bg-white px-8 py-16 shadow-md">
                    <div className="text-xl font-bold">สร้างอีเวนต์ใหม่</div>

                    <div className="flex flex-col gap-4">
                        <div className="w-full items-center">
                            <Label htmlFor="name">ชื่ออีเวนต์</Label>

                            <Input
                                type="text"
                                id="name"
                                placeholder="เช่น Young Webmaster Camp"
                                onChange={handleEventInputChange}
                                value={eventData.name}
                            />
                        </div>

                        <div className="w-full items-center">
                            <Label htmlFor="description">คำอธิบาย</Label>

                            <Input
                                type="text"
                                id="description"
                                placeholder="คำอธิบายสั้น ๆ"
                                onChange={handleEventInputChange}
                                value={eventData.description}
                            />
                        </div>
                    </div>

                    <Button
                        onClick={() => {
                            onSubmit().then((id) => {
                                router.push(`/event/${id}`);
                            });
                        }}
                        type="submit"
                        className="mt-2"
                    >
                        Save changes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateEventPage;
