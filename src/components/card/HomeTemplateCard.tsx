import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Image from "next/image";

interface HomeTemplateCardProps {
  blankTemplate?: boolean;
}

const HomeTemplateCard: React.FC<HomeTemplateCardProps> = ({ blankTemplate = false }) => {
  if (blankTemplate) {
    return (
      <Card className="shadow">
        <CardContent className="p-4">
          <div className="w-44">
            <div className="border border-dashed border-gray-300 h-36 flex items-center justify-center p-8 rounded-lg">
              <Plus size={36} />
            </div>
            <div className="mt-2 text-sm font-medium text-[#1B2559]">Blank</div>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className="shadow">
        <CardContent className="p-4">
          <div className="w-44">
            <div className="flex items-center h-36 justify-center rounded-lg">
              <Image
                src={"/images/template/CardTemplate.png"}
                alt="Card Template Banner"
                width={276}
                height={205}
                className="w-full h-full"
              />
            </div>
            <div className="mt-2 text-sm font-medium text-[#1B2559]">Template</div>
            <div className="mt-2 text-xs font-medium text-gray-500 flex-wrap">
              Lorem ipsum dolor sit amet consectetur.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default HomeTemplateCard;
