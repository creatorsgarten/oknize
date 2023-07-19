import Link from 'next/link';
import Image from 'next/image';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '../ui/badge';
import { useEventList } from '@/hooks/useEvent';

const Sidebar = () => {
    const eventList = useEventList();

    return (
        <div className="flex min-h-[100vh] w-full flex-col border-r p-4 px-6 pt-8">
            <Link className="text-2xl font-medium" href={'/'}>
                <div className="w-24">
                    <Image
                        src="/assets/logo.svg"
                        width={300}
                        alt=""
                        height={100}
                    />
                </div>
            </Link>

            {/* <div className="relative mt-6">
                <span className="absolute inset-y-0 left-3 flex items-center">
                    <Search size={20} color="#667085" />
                </span>
                <Input
                    type="text"
                    placeholder="Search Event"
                    className="pl-10"
                />
            </div> */}

            <Accordion
                type="single"
                defaultChecked={true}
                collapsible
                className="mt-6 w-full"
                defaultValue="item-2"
            >
                <AccordionItem value="item-2">
                    <AccordionTrigger>Events</AccordionTrigger>
                    <AccordionContent>
                        {eventList.data?.map((event, index) => {
                            return (
                                <Link
                                    className="w-full text-gray-600 transition-colors hover:text-gray-800 hover:underline"
                                    href={`/event/${event.id}`}
                                    key={event.id}
                                >
                                    {event.name}
                                </Link>
                            );
                        })}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Sidebar;
