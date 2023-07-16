"use client";

import * as React from "react";
import { Dot, Trash2 } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const EVENTS: Event[] = [
  {
    id: "1",
    name: "Event Name",
    description: "Lorem ipsum dolor sit",
    date: "Jan 13, 2022",
    status: "processing",
  },
  {
    id: "2",
    name: "Event Name",
    description: "Lorem ipsum dolor sit",
    date: "Jan 13, 2022",
    status: "processing",
  },
  {
    id: "3",
    name: "Event Name",
    description: "Lorem ipsum dolor sit",
    date: "Jan 13, 2022",
    status: "public",
  },
  {
    id: "4",
    name: "Event Name",
    description: "Lorem ipsum dolor sit",
    date: "Jan 13, 2022",
    status: "public",
  },
  {
    id: "5",
    name: "Event Name",
    description: "Lorem ipsum dolor sit",
    date: "Jan 13, 2022",
    status: "public",
  },
];

export type Event = {
  id: string;
  name: string;
  description: string;
  date: string;
  status: "public" | "processing";
};

export function DataTable() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Event Name</TableHead>
              <TableHead>Public Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {EVENTS.map((event, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className=" text-gray-900">{event.name}</div>
                    <div className="text-gray-500">{event.description}</div>
                  </TableCell>
                  <TableCell>
                    {event.status === "processing" && (
                      <div className="flex flex-row items-center justify-center px-1 rounded-xl bg-[#EAECF0]">
                        <Dot color="#667085" />
                        <div className="text-[#344054] text-sm">Processing</div>
                      </div>
                    )}

                    {event.status === "public" && (
                      <div className="flex flex-row items-center justify-center px-1 rounded-xl bg-[#ECFDF3]">
                        <Dot color="#12B76A" />
                        <div className="text-[#027A48] text-sm">Public</div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function DesktopDataTable() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Event Name</TableHead>
              <TableHead>Public Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {EVENTS.map((event, index) => {
              return (
                <TableRow key={index} onClick={() => (window.location.href = "/event/12345")}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className=" text-gray-900">{event.name}</div>
                    <div className="text-gray-500">{event.description}</div>
                  </TableCell>
                  <TableCell>
                    <div className=" text-gray-900">{event.date}</div>
                  </TableCell>
                  <TableCell>
                    {event.status === "processing" && (
                      <div className="flex flex-row items-center justify-center px-1 rounded-xl bg-[#EAECF0]">
                        <Dot color="#667085" />
                        <div className="text-[#344054] text-sm">Processing</div>
                      </div>
                    )}

                    {event.status === "public" && (
                      <div className="flex flex-row items-center justify-center px-1 rounded-xl bg-[#ECFDF3]">
                        <Dot color="#12B76A" />
                        <div className="text-[#027A48] text-sm">Public</div>
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="items-center flex justify-center h-full">
                    <div>
                      <Trash2 />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
