import { ScheduleSlot } from '@/lib/schedule';
import { useEffect, useState } from 'react';

function useProgress(currentTime: string, currentSlot: ScheduleSlot | null) {
    // time format: HH:MM:SS
    // slot format: HH:MM
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!currentSlot) setProgress(0);
        else {
            const [currHour, currMin, currSec] = currentTime.split(':');
            const [startHour, startMin] = currentSlot?.start.split(':');
            const [endHour, endMin] = currentSlot?.end.split(':');

            const totalSlotTime =
                (parseInt(endHour) - parseInt(startHour)) * 60 +
                (parseInt(endMin) - parseInt(startMin));
            const totalCurrentTime =
                (parseInt(currHour) - parseInt(startHour)) * 60 +
                (parseInt(currMin) - parseInt(startMin));

            setProgress((totalCurrentTime / totalSlotTime) * 100);
        }
    }, [currentTime, currentSlot]);

    return progress;
}

export default function ProgressBar({
    currentTime,
    currentSlot,
}: {
    currentTime: string;
    currentSlot: ScheduleSlot | null;
}) {
    const progress = useProgress(currentTime, currentSlot);

    return (
        <div className="relative flex flex-col items-center justify-center">
            <div className="flex w-full justify-between text-sm">
                <span className="text-neutral-500">{currentSlot?.start}</span>

                <span className="text-neutral-500">{currentSlot?.end}</span>
            </div>

            <div className="h-3 w-48 rounded-full bg-gray-200 sm:w-64">
                <div
                    style={{
                        width: `${progress}%`,
                    }}
                    className="h-3 rounded-full bg-purple-500"
                ></div>
            </div>
        </div>
    );
}
