export interface ScheduleSlot {
  id: number;
  title: string;
  start: string;
  end: string;
  place: string;
  remark?: string | "";
  responsiblePeople: string[];
}
