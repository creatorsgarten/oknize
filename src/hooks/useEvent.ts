import { getEventById, getEventList } from '@/lib/db';
import { ScheduleSlot } from '@/lib/schedule';
import { useQuery } from '@tanstack/react-query';

export type EventItem = {
    id: string;
    name: string;
    description: string;
    status: 'public' | 'processing';
    agenda: ScheduleSlot[];
};

export function useEvent(eventId: string) {
    return useQuery({
        queryKey: ['event', eventId],
        queryFn: () => getEventById(eventId),
    });
}

export function useEventList() {
    return useQuery({
        queryKey: ['eventList'],
        queryFn: getEventList,
    });
}
