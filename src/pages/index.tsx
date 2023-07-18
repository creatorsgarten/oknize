import { useRouter } from 'next/router';
import { Button } from '../components/ui/button';
import Navbar from '@/components/navbar/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/footer/Footer';

const Feature = ({
    name,
    icon,
    desc,
}: {
    name: string;
    icon: string;
    desc: string;
}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex aspect-square h-16 w-16 items-center justify-center rounded-full border border-purple-200 bg-purple-100 p-4 text-4xl">
                {icon}
            </div>
            <h6 className="text-lg">{name}</h6>
            <p className="text-center text-gray-500">{desc}</p>
        </div>
    );
};

const Landing = () => {
    const router = useRouter();

    return (
        <div>
            <Navbar />
            <section>
                <div className="flex flex-col items-center justify-center gap-6 p-10 sm:p-16">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-center text-4xl">
                            จัดอีเวนต์ให้{' '}
                            <span className="font-semibold">nice</span> ด้วย{' '}
                            <span className="font-semibold">oknize 👌🏻</span>
                        </h1>
                        <h4 className="text-center text-lg text-neutral-500 sm:text-xl">
                            แพลตฟอร์มและชุดเครื่องมือ ออกแบบโดยผู้จัดอีเวนต์
                            เพื่อผู้จัดอีเวนต์
                        </h4>
                    </div>
                    <div>
                        <Link href="/event">
                            <Button className="bg-purple-500">
                                ลองใช้เลย!
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-4">
                <Image
                    src="/assets/product.png"
                    width={1920}
                    height={1080}
                    alt="product ของเรา"
                />
            </section>

            <section className="py-4">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-col items-center justify-center gap-4 px-10 lg:px-16">
                        <h4 className="text-center text-lg text-purple-500">
                            คุณสมบัติ
                        </h4>
                        <h1 className="text-center text-3xl lg:text-4xl">
                            เราจะช่วยให้การจัดอีเวนต์สะดวกขึ้นได้อย่างไร
                        </h1>
                        <h6 className="max-w-2xl text-center text-gray-500">
                            โซลูชั่นที่ถูกออกแบบโดยยึดพื้นฐานจาก Pain Point
                            ของนักจัดอีเวนต์หลากหลายกลุ่ม หลากหลายสาย
                        </h6>
                    </div>
                    <div className="grid grid-cols-1 gap-4 px-12 pb-16 pt-8 md:grid-cols-2 lg:grid-cols-4">
                        <Feature
                            icon="⏱️"
                            name="จัดการตารางเวลาวันงาน"
                            desc="ปรับเปลี่ยนตารางเวลาแบบเรียลไทม์ และสามารถ sync กับสตาฟทุกคนได้ในทันที"
                        />
                        <Feature
                            icon="📝"
                            name="สร้าง Template สำหรับสปอนเซอร์"
                            desc="ลดเวลาในการทำเอกสารเพื่อผู้สนับสนุน ผู้น่ารักของคุณ ให้ติดต่อกันได้ง่ายขึ้น"
                        />
                        <Feature
                            icon="🙌"
                            name="สตาฟเริ่มงานได้ทันที"
                            desc="คลิกเดียวเท่านั้น! Staff และอาสาสมัครทุกคนของคุณสามารถเข้าถึงข้อมูลของทั้งอีเวนต์ของคุณทันที"
                        />
                        <Feature
                            icon="📒"
                            name="บริหารข้อมูลทรัพยากร"
                            desc="ศูนย์กลางข้อมูลห้องที่ใช้ อาหาร ที่จอดรถ รายชื่อสตาฟ และบทบาททั้งหมด แบบมัดรวมในที่เดียว"
                        />
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center justify-center gap-6 border-y border-gray-200 bg-gray-50 p-8 lg:gap-8">
                <h1 className="max-w-3xl text-center text-2xl lg:text-4xl">
                    จัดอีเวนต์สนุก เพื่อนชอบ ลูกค้าชอบ ทุกระดับประทับใจ
                    ไม่ต้องปวดหัวกับปัญหายิบย่อยวุ่นวาย 🔥
                </h1>
                <div className="flex flex-col items-center justify-center">
                    <div className="aspect-square h-12 overflow-hidden rounded-full bg-purple-500">
                        <Image
                            src="/nutpinyo.jpg"
                            alt=""
                            width="48"
                            height="48"
                        />
                    </div>
                    <h6 className="pt-4 text-base">ณัฎฐ์ ภิญโญ</h6>
                    <p className="text-sm text-gray-500">
                        Senior Advisor / Ex-president, Thinc.
                    </p>
                </div>
            </section>
            <section>
                <div className="flex flex-col items-center justify-center gap-8 p-10 lg:px-16 lg:pt-24">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <h1 className="text-center text-3xl lg:text-4xl">
                            เกิดมาเพื่ออีเวนต์ และคนจัดอีเวนต์เท่านั้น
                        </h1>
                        <h3 className="text-2xl text-gray-700">
                            คุณเคยเจอปัญหานี้หรือไม่:
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-8 px-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 lg:px-0">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="flex aspect-square items-center justify-center rounded-full border border-purple-200 bg-purple-100 p-4 text-4xl">
                                📅
                            </div>
                            <h6 className="max-w-2xl text-center text-gray-500">
                                ใช้ monday ทำ agenda
                                แล้วการแก้บล็อคเวลาสักช่วงทำให้ในหลายครั้งคุณต้องรื้อโครงสร้างของตารางใหม่
                            </h6>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="flex aspect-square items-center justify-center rounded-full border border-purple-200 bg-purple-100 p-4 text-4xl">
                                🗄️
                            </div>
                            <h6 className="max-w-2xl text-center text-gray-500">
                                ใช้ notion ทำรายละเอียดอีเวนต์​
                                แต่นานเข้าโครงสร้างข้อมูลก็บวมจนหาไม่เจอ
                            </h6>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="flex aspect-square items-center justify-center rounded-full border border-purple-200 bg-purple-100 p-4 text-4xl">
                                📑
                            </div>
                            <h6 className="max-w-2xl text-center text-gray-500">
                                ใช้ excel ทำข้อมูลสตาฟ
                                แต่รูปแบบข้อมูลก็ยากจะนำไปประยุกต์ใช้ต่อ
                            </h6>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="flex aspect-square items-center justify-center rounded-full border border-purple-200 bg-purple-100 p-4 text-4xl">
                                📱
                            </div>
                            <h6 className="max-w-2xl text-center text-gray-500">
                                รัน operation วันงานด้วยกระดาษและ messaging app
                                แต่ก็ out-of-sync
                                จนต้องนัดบรีฟออฟไลน์กันบ่อยครั้งจนเสียเวลา
                            </h6>
                        </div>
                    </div>
                    <div className="flex max-w-2xl flex-col items-center justify-center gap-4 lg:gap-2">
                        <h3 className="max-w-3xl text-center text-lg text-gray-700">
                            เพราะเครื่องมือที่
                            <span className="font-semibold">
                                ครอบคลุมที่สุด{' '}
                            </span>
                            อาจไม่ใช่เครื่องมือที่
                            <span className="font-semibold">สะดวกที่สุด </span>
                            เสมอไป
                        </h3>
                        <h3 className="max-w-3xl text-center text-lg text-gray-700">
                            👌🏻 oknize
                            ออกแบบมาเพื่อคนจัดอีเวนต์และจะเป็นเช่นนี้ต่อไป
                            เพื่อสร้างเครื่องมือที่เป็นมิตรต่อกลุ่มผู้จัดอีเวนต์มากที่สุด
                        </h3>
                        <h3 className="group relative max-w-3xl pt-3 text-center text-lg font-semibold text-purple-600">
                            <Link href="/about">
                                <span>🙋🏻 เกี่ยวกับเรา </span>
                                <span>&gt;</span>
                            </Link>
                        </h3>
                    </div>
                </div>
            </section>
            {/* <section className="bg-purple-50 grid grid-cols-1 md:grid-cols-3 gap-8 p-8 lg:px-32 md:gap-16 border border-purple-200">
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Personal</h1>
            <h3 className="text-lg">0 THB/mth</h3>
          </div>
          <div className="mt-2">
            <h4 className="font-medium mb-1">Including:</h4>
            <ul className="flex flex-col gap-1 list-disc list-inside">
              <li>Agenda</li>
              <li>Sequence</li>
              <li>Budget Plan</li>
              <li>Automatic Rundown</li>
              <li>Starter Template</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Enterprise</h1>
            <h3 className="text-lg">259 THB/mth</h3>
          </div>
          <div className="mt-2">
            <h4 className="font-medium mb-1">Including:</h4>
            <ul className="flex flex-col gap-1 list-disc list-inside">
              <li>Unlimited Template</li>
              <li>Free Document Template</li>
              <li>Add your logo</li>
              <li>Connect with Supplier</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Pro</h1>
            <h3 className="text-lg">From 8499 THB/mth</h3>
          </div>
          <div className="mt-2">
            <h4 className="font-medium mb-1">Including:</h4>
            <ul className="flex flex-col gap-1 list-disc list-inside">
              <li>Customization</li>
              <li>Event Consultant</li>
              <li>Man power service</li>
              <li>Support team</li>
            </ul>
          </div>
        </div>
      </section> */}
            <Footer />
        </div>
    );
};

export default Landing;
