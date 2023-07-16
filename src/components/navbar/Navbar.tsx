import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="p-4 border-b-1 border flex flex-row justify-between items-center">
      <Link className="text-2xl font-medium" href={"/"}>
        <div className="w-24">
          <Image src="/assets/logo.svg" width={300} alt="" height={100} />
        </div>
      </Link>

      <Link href={"/create"}>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Event
        </Button>
      </Link>
    </nav>
  );
};

export default Navbar;
