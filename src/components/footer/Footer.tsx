import Image from 'next/image';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="flex flex-col items-center justify-center gap-3 p-8">
            <div className="w-24">
                <Image src="/assets/logo.svg" width={300} alt="" height={100} />
            </div>
            <div className="text-gray-500">
                © {currentYear} Oknize. All rights reserved.
            </div>
        </footer>
    );
}
