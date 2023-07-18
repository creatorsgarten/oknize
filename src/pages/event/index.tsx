import CardCarousel from '@/components/CardCarousel';
import HomeTemplateCard from '@/components/card/HomeTemplateCard';
import { DatePickerWithRange } from '@/components/input/DatePickerWithRange';
import { DataTable, DesktopDataTable } from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, ListFilter, Search } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="max-w-screen-lg px-4 py-8 pb-0 md:mx-auto">
            <div className="font-lg text-lg">Event Management</div>
            <div className=" text-gray-500">จัดอีเวนต์ให้ nice ด้วย Oknize</div>

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
                <Input
                    type="text"
                    placeholder="Search Event"
                    className="mt-6 pl-10"
                />
            </div>

            {/* <div className="flex flex-row item-scnter justify-between mt-4">
        <DatePickerWithRange />

        <div className="col-span-1 rounded-lg p-2 border border-gray-300">
          <ListFilter />
        </div>
      </div> */}

            <div className="mt-6">
                <div className="block md:hidden">
                    <DataTable />
                </div>

                <div className="hidden md:block">
                    <DesktopDataTable />
                </div>

                <div className="mt-4 flex flex-row items-center justify-between">
                    <Button variant={'ghost'}>
                        <ArrowLeft color="#667085" />
                    </Button>
                    <div className="text-sm text-gray-700">Page 1 of 10</div>
                    <Button variant={'ghost'}>
                        <ArrowRight color="#667085" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
