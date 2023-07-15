import { ScheduleSlot } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

interface TaskTableProps {
  tableData: ScheduleSlot[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tableData }) => {
  return (
    <Table>
      <TableCaption>{"A list of your event's agenda"}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Slot</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Place</TableHead>
          <TableHead>Remark (Optional)</TableHead>
          <TableHead>Responsible People</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((data) => {
          return (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.start}</TableCell>
              <TableCell>{data.end}</TableCell>
              <TableCell>{data.title}</TableCell>
              <TableCell>{data.place}</TableCell>
              <TableCell>{data.remark}</TableCell>
              <TableCell>{data.responsiblePeople.join(" ")}</TableCell>

              <TableCell>
                <div className="flex flex-row items-center gap-4">
                  <Button className="h-8 px-6">Edit</Button>
                  <Button className="h-8 px-6" variant="destructive">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
