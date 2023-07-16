import { ScheduleSlot } from "@/lib/schedule";
import { useEffect, useState } from "react";

function useProgress(currentTime: string, currentSlot: ScheduleSlot | null) {
  // time format: HH:MM:SS
  // slot format: HH:MM
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!currentSlot) setProgress(0);
    else {
      const [currHour, currMin, currSec] = currentTime.split(":");
      const [startHour, startMin] = currentSlot?.start.split(":");
      const [endHour, endMin] = currentSlot?.end.split(":");

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
    <div className="flex flex-col relative items-center justify-center">
      <div className="flex justify-between w-full text-sm">
        <span className="text-neutral-500">{currentSlot?.start}</span>

        <span className="text-neutral-500">{currentSlot?.end}</span>
      </div>

      <div className="w-64 h-3 bg-gray-200 rounded-full">
        <div
          style={{
            width: `${progress}%`,
          }}
          className="h-3 bg-purple-500 rounded-full"
        ></div>
      </div>
    </div>
  );
}
