export interface ScheduleSlot {
  id: number;
  title: string;
  start: string;
  end: string;
  place: string;
  remark?: string | "";
  responsiblePeople: string[];
}

const now = new Date();

export function getCurrentSlot(schedule: ScheduleSlot[]) {
  for (const slot of schedule) {
    // start, end is in the HH:MM format
    const [startHour, startMinute] = slot.start.split(":");
    const [endHour, endMinute] = slot.end.split(":");

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
  for (const slot of schedule) {
    // start, end is in the HH:MM format
    const [startHour, startMinute] = slot.start.split(":");

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
