import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../ui/table';

import { Button } from '../../ui/button';
import { ScheduleSlot } from '@/lib/schedule';
import EditTaskDialog from './EditTaskDialog';
import AddTaskDialog from './AddTaskDialog';

interface TaskTableProps {
    tableData: ScheduleSlot[];
    onSave: (data: ScheduleSlot) => void;
    onDelete: (data: ScheduleSlot) => void;
    onAdd: (data: ScheduleSlot) => void;
}

const TaskTable = ({ tableData, onSave, onDelete, onAdd }: TaskTableProps) => {
    return (
        <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-row items-center gap-6">
                <h1 className="text-2xl font-bold">Day 1</h1>

                <AddTaskDialog onAdd={onAdd} />
            </div>

            <Table>
                {/* <TableCaption>{"A list of your event's agenda"}</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">Slot</TableHead>
                        <TableHead className="w-[100px]">Start</TableHead>
                        <TableHead className="w-[100px]">End</TableHead>
                        <TableHead className="w-[250px]">Title</TableHead>
                        <TableHead>Place</TableHead>
                        {/* <TableHead>Remark (Optional)</TableHead> */}
                        <TableHead>Responsible People</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((data, i) => {
                        return (
                            <TableRow key={`${data.title} ${i}`}>
                                <TableCell className="font-medium">
                                    {i + 1}
                                </TableCell>
                                <TableCell>{data.start}</TableCell>
                                <TableCell>{data.end}</TableCell>
                                <TableCell>{data.title}</TableCell>
                                <TableCell>{data.place}</TableCell>
                                {/* <TableCell>{data.remark}</TableCell> */}
                                <TableCell>
                                    {data?.responsiblePeople?.join(' ')}
                                </TableCell>

                                <TableCell>
                                    <div className="flex flex-row items-center gap-4">
                                        <EditTaskDialog
                                            data={data}
                                            onSave={onSave}
                                        />

                                        <Button
                                            className="h-8 px-6"
                                            variant="destructive"
                                            onClick={() => {
                                                onDelete(data);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default TaskTable;
