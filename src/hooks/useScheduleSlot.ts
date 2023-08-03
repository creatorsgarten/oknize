import { getScheduleStore } from '@/lib/db';
import { nowStore } from '@/lib/nowStore';
import { getCurrentSlot, getNextSlot } from '@/lib/schedule';
import { useStore } from '@nanostores/react';
import { useMemo } from 'react';

export default function useScheduleSlot(id: string) {
    const now = useStore(nowStore);
    const schedule = useStore(getScheduleStore(id));
    const scheduleSlots = useMemo(
        () => schedule.value?.agenda ?? [],
        [schedule]
    );
    const currentSlot = useMemo(
        () => getCurrentSlot(scheduleSlots, now),
        [scheduleSlots, now]
    );
    const nextSlot = useMemo(
        () => getNextSlot(scheduleSlots, now),
        [scheduleSlots, now]
    );
    const currentTime = useMemo(() => now.toLocaleTimeString('th-TH'), [now]);

    return {
        scheduleSlots,
        currentSlot,
        nextSlot,
        currentTime,
    };
}
