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

      {/* <Link href={"/event"}>
        <button className="bg-purple-600 shadow-md py-2 px-8 rounded-lg text-white transition-all duration-500 hover:bg-purple-700 hover:shadow-lg">
          เข้าใช้งาน
        </button>
      </Link> */}
    </nav>
  );
};

export default Navbar;
