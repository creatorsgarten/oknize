export interface ScheduleSlot {
    id: string;
    title: string;
    start: string;
    end: string;
    place: string;
    remark?: string | '';
    responsiblePeople: string[];
}

export function getCurrentSlot(schedule: ScheduleSlot[]) {
    const now = new Date();

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

export function getNextSlot(schedule: ScheduleSlot[]) {
    const now = new Date();

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
