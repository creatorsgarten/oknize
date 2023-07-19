import { subscribeSchedule } from '@/lib/db';
import { ScheduleSlot, getCurrentSlot, getNextSlot } from '@/lib/schedule';
import { useEffect, useState } from 'react';

export default function useScheduleSlot(id: string) {
    const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>([]);
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
            setCurrentSlot(getCurrentSlot(scheduleSlots));
            setNextSlot(getNextSlot(scheduleSlots));
        }

        const interval = setInterval(() => {
            const today = new Date();
            const now = today.toLocaleTimeString('th-TH');
            setCurrentTime(now);

            updateInterval();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [scheduleSlots]);

    return {
        scheduleSlots,
        currentSlot,
        nextSlot,
        currentTime,
    };
}
