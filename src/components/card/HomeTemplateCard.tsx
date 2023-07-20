import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface HomeTemplateCardProps {
    blankTemplate?: boolean;
}

const HomeTemplateCard: React.FC<HomeTemplateCardProps> = ({
    blankTemplate = false,
}) => {
    if (blankTemplate) {
        return (
            <Card className="shadow">
                <Link href="/event/create" className="block h-full">
                    <CardContent className="p-4">
                        <div className="w-44 md:w-60">
                            <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 md:h-40">
                                <Plus size={36} />
                            </div>
                            <div className="mt-4 text-sm font-medium text-[#1B2559]">
                                Blank
                            </div>
                        </div>
                    </CardContent>
                </Link>
            </Card>
        );
    } else {
        return (
            <Card className="shadow">
                <Link href="/event/create" className="block h-full">
                    <CardContent className="p-4">
                        <div className="w-44 md:w-60">
                            <div className="flex h-36 items-center justify-center rounded-lg md:h-40">
                                <Image
                                    src={'/images/template/CardTemplate.png'}
                                    alt="Card Template Banner"
                                    width={276}
                                    height={205}
                                    className="h-full w-full"
                                />
                            </div>
                            <div className="mt-4 text-sm font-medium text-[#1B2559]">
                                Template
                            </div>
                            <div className="mt-2 flex-wrap text-xs font-medium text-gray-500">
                                This is a sample template.
                            </div>
                        </div>
                    </CardContent>
                </Link>
            </Card>
        );
    }
};

export default HomeTemplateCard;
