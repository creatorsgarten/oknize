import CardCarousel from "@/components/CardCarousel";
import HomeTemplateCard from "@/components/card/HomeTemplateCard";
import { DatePickerWithRange } from "@/components/input/DatePickerWithRange";
import { DataTable, DataTableDemo } from "@/components/table/DataTable";
import { Input } from "@/components/ui/input";
import { ListFilter, Search } from "lucide-react";

const HomePage = () => {
  return (
    <div className="px-4 py-8 max-w-screen">
      <div className="font-lg text-lg">Event Managment</div>
      <div className=" text-gray-500">Lorem ipsum dolor sit amet consectetur.</div>

      <div className="mt-6">
        <CardCarousel>
          <HomeTemplateCard blankTemplate />
          <HomeTemplateCard />
          <HomeTemplateCard />
          <HomeTemplateCard />
        </CardCarousel>
      </div>

      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center">
          <Search size={20} color="#667085" />
        </span>
        <Input type="text" placeholder="Search Event" className="mt-6 pl-10" />
      </div>

      <div className="flex flex-row item-scnter justify-between mt-4">
        <DatePickerWithRange />

        <div className="col-span-1 rounded-lg p-2 border border-gray-300">
          <ListFilter />
        </div>
      </div>

      <div className="mt-6">
        <DataTable />
      </div>
    </div>
  );
};

export default HomePage;
