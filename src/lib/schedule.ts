export interface ScheduleDoc {
    agenda: ScheduleSlot[];
}

export interface ScheduleSlot {
    id: string;
    title: string;
    start: string;
    end: string;
    place: string;
    remark?: string | '';
    responsiblePeople: string[];
}

export function getCurrentSlot(schedule: ScheduleSlot[], now = new Date()) {
    for (const slot of schedule) {
        // start, end is in the HH:MM format
        const [startHour, startMinute] = slot.start.split(':');
        const [endHour, endMinute] = slot.end.split(':');

        const start = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            +startHour,
            +startMinute
        );
        const end = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            +endHour,
            +endMinute
        );

        if (start <= now && now <= end) {
            return slot;
        }
    }
    return null;
}

export function getNextSlot(schedule: ScheduleSlot[], now = new Date()) {
    for (const slot of schedule) {
        // start, end is in the HH:MM format
        const [startHour, startMinute] = slot.start.split(':');

        const start = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            +startHour,
            +startMinute
        );

        if (now < start) {
            return slot;
        }
    }
    return null;
}

export function sortSchedule(schedule: ScheduleSlot[]) {
    return schedule.sort((a, b) => {
        const diff =
            (+a.start.split(':')[0] - +b.start.split(':')[0]) * 60 +
            (+a.start.split(':')[1] - +b.start.split(':')[1]);

        if (diff !== 0) {
            return diff;
        } else {
            return (
                (+a.end.split(':')[0] - +b.end.split(':')[0]) * 60 +
                (+a.end.split(':')[1] - +b.end.split(':')[1])
            );
        }
    });
}

export function addTaskToSchedule(
    newTask: ScheduleSlot,
    schedule: ScheduleSlot[]
) {
    // update
    // add first then sort schedule
    const newSchedule = [...schedule, newTask];

    return sortSchedule(newSchedule);
}

export function getTimeLeft(currentTime: string, currentSlot: ScheduleSlot) {
    // hh mm ss

    const [currentHour, currentMin, currentSec] = currentTime.split(':');
    const [nextHour, nextMin] = currentSlot.end.split(':');

    const currentTotalSec =
        parseInt(currentHour) * 3600 +
        parseInt(currentMin) * 60 +
        parseInt(currentSec);
    const nextTotalSec = parseInt(nextHour) * 3600 + parseInt(nextMin) * 60 + 0;

    const totalSec = nextTotalSec - currentTotalSec;

    const hour = Math.floor(totalSec / 3600);
    const min = Math.floor((totalSec % 3600) / 60);
    const sec = Math.floor((totalSec % 3600) % 60);

    return `${hour > 0 ? `${hour} ชั่วโมง` : ''} ${min} นาที ${sec} วินาที`;
}

function adjustMinuteToTime(time: string, min: number) {
    const [hour, minute] = time.split(':');

    const totalMin = parseInt(hour) * 60 + parseInt(minute) + min;

    const newHour = Math.floor(totalMin / 60);
    const newMin = totalMin % 60;

    // Ensure new minute has two digits
    const formattedNewMin = newMin.toString().padStart(2, '0');

    return `${newHour}:${formattedNewMin}`;
}

export function adjustTime(
    min: number,
    currentSlot: ScheduleSlot,
    schedule: ScheduleSlot[]
) {
    // add time to slot, append time to every slot afterwards

    // find index of currentSlot
    const index = schedule.findIndex((slot) => slot.id === currentSlot.id);

    // append mins to end of currentSlot
    const newCurrentSlot = {
        ...currentSlot,
        end: adjustMinuteToTime(currentSlot.end, min),
    };

    // append mins to every next slot
    const newSchedule = schedule.map((slot, i) => {
        if (i > index) {
            return {
                ...slot,
                start: adjustMinuteToTime(slot.start, min),
                end: adjustMinuteToTime(slot.end, min),
            };
        } else {
            return slot;
        }
    });

    // replace currentSlot with newCurrentSlot
    newSchedule[index] = newCurrentSlot;

    return newSchedule;
}

export function borrowTime(
    min: number,
    currentSlot: ScheduleSlot,
    borrowedSlot: ScheduleSlot,
    schedule: ScheduleSlot[]
) {
    // borrow time - remove time from borrowedSlot, append time to currentSlot, shift every time in betwee
    // if borrowedSlot is earlier than currentSlot, return
    const currentSlotIndex = schedule.findIndex(
        (slot) => slot.id === currentSlot.id
    );
    const borrowedSlotIndex = schedule.findIndex(
        (slot) => slot.id === borrowedSlot.id
    );

    if (borrowedSlotIndex < currentSlotIndex) {
        return schedule;
    }
}
