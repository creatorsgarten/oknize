import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col p-8 justify-center items-center gap-3">
      <div className="w-24">
        <Image src="/assets/logo.svg" width={300} alt="" height={100} />
      </div>
      <div className="text-gray-500">
        © 2077 Untitled UI. All rights reserved.
      </div>
    </footer>
  );
}
