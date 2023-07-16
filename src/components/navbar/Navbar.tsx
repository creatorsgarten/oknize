import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4 border-b-1 border flex flex-row justify-between items-center">
      <Link className="text-2xl font-medium" href={"/"}>
        👌🏻 oknize
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
