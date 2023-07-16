import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "../ui/badge";

const Sidebar = () => {
  return (
    <div className="w-full border-r min-h-[100vh] p-4 px-6 pt-8 flex flex-col">
      <Link className="text-2xl font-medium" href={"/"}>
        <div className="w-24">
          <Image src="/assets/logo.svg" width={300} alt="" height={100} />
        </div>
      </Link>

      <div className="relative mt-6">
        <span className="absolute inset-y-0 left-3 flex items-center">
          <Search size={20} color="#667085" />
        </span>
        <Input type="text" placeholder="Search Event" className="pl-10" />
      </div>

      <Accordion type="single" collapsible className="w-full mt-6">
        <AccordionItem value="item-1">
          <AccordionTrigger>จัดการอีเวนต์</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Event Name</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 flex flex-row items-center justify-between">
        <div>การแจ้งเตือน</div>
        <Badge>10</Badge>
      </div>
    </div>
  );
};

export default Sidebar;
