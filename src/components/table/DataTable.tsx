'use client';

import { useEffect, useState } from 'react';
import { Dot, Trash2 } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getEventList } from '@/lib/db';
import { useQuery } from '@tanstack/react-query';
import { useEventList } from '../../hooks/useEvent';

export function DataTable() {
    const { data: eventList } = useEventList();

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
                        {eventList?.map((event, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    onClick={() =>
                                        (window.location.href = `/event/${event.id}`)
                                    }
                                >
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-gray-900">
                                            {event.name}
                                        </div>
                                        <div className="text-gray-500">
                                            {event.description}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {event.status === 'processing' && (
                                            <div className="flex flex-row items-center justify-center rounded-xl bg-[#EAECF0] px-1">
                                                <Dot color="#667085" />
                                                <div className="text-sm text-[#344054]">
                                                    Processing
                                                </div>
                                            </div>
                                        )}

                                        {event.status === 'public' && (
                                            <div className="flex flex-row items-center justify-center rounded-xl bg-[#ECFDF3] px-1">
                                                <Dot color="#12B76A" />
                                                <div className="text-sm text-[#027A48]">
                                                    Public
                                                </div>
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
    const { data: eventList } = useEventList();

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
                        {eventList?.map((event, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    onClick={() =>
                                        (window.location.href = `/event/${event.id}`)
                                    }
                                >
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>
                                        <div className=" text-gray-900">
                                            {event.name}
                                        </div>
                                        <div className="text-gray-500">
                                            {event.description}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className=" text-gray-900">
                                            {event.date}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {event.status === 'processing' && (
                                            <div className="flex flex-row items-center justify-center rounded-xl bg-[#EAECF0] px-1">
                                                <Dot color="#667085" />
                                                <div className="text-sm text-[#344054]">
                                                    Processing
                                                </div>
                                            </div>
                                        )}

                                        {event.status === 'public' && (
                                            <div className="flex flex-row items-center justify-center rounded-xl bg-[#ECFDF3] px-1">
                                                <Dot color="#12B76A" />
                                                <div className="text-sm text-[#027A48]">
                                                    Public
                                                </div>
                                            </div>
                                        )}
                                    </TableCell>

                                    <TableCell className="flex h-full items-center justify-center">
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
