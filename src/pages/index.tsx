import { useRouter } from "next/router";
import { Button } from "../components/ui/button";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";

const Feature = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="bg-purple-100 text-4xl rounded-full aspect-square p-4 flex items-center justify-center">
        K
      </div>
      <h6 className="text-lg">Lorem Ipsum Dolor.</h6>
      <p className="text-center text-gray-500">
        Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page
        and in the loop.
      </p>
    </div>
  );
};

const Landing = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <section>
        <div className="p-10 flex flex-col gap-6 justify-center items-center sm:p-16">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl text-center">
              จัดอีเวนต์ให้ <span className="font-semibold">nice</span> ด้วย{" "}
              <span className="font-semibold">oknize 👌🏻</span>
            </h1>
            <h4 className="text-lg sm:text-xl text-neutral-500 text-center">
              แพลตฟอร์มและชุดเครื่องมือ ออกแบบโดยนักจัดอีเวนต์ เพื่อนักจัดอีเวนต์
            </h4>
          </div>
          <div>
            <Button
              className="bg-purple-500"
              onClick={() => {
                router.push("/home");
              }}
            >
              ลองใช้เลย!
            </Button>
          </div>
        </div>
      </section>

      <section className="py-4">
        <Image src="/assets/product.png" width={1920} height={1080} alt="product ของเรา" />
      </section>

      <section className="py-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="px-10 lg:px-16 flex flex-col justify-center items-center gap-4">
            <h4 className="text-lg text-purple-500 text-center">คุณสมบัติ</h4>
            <h1 className="text-3xl lg:text-4xl text-center">
              เราจะช่วยให้การจัดอีเวนต์สะดวกขึ้นได้อย่างไร
            </h1>
            <h6 className="text-center text-gray-500 max-w-2xl">
              Powerful, self-serve product and growth analytics to help you convert, engage, and
              retain more users. Trusted by over 4,000 startups.
            </h6>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-12 pt-8 pb-16">
            <Feature />
            <Feature />
            <Feature />
            <Feature />
          </div>
        </div>
      </section>
      <section className="bg-gray-50 p-8 flex flex-col justify-center items-center py- lg:py-16 gap-6 lg:gap-8 border-y border-gray-200">
        <h1 className="text-2xl lg:text-4xl text-center max-w-3xl">
          จัดอีเวนต์สนุก เพื่อนชอบ ลูกค้าชอบ ทุกระดับประทับใจ ไม่ต้องปวดหัวกับปัญหายิบย่อยวุ่นวาย 🔥
        </h1>
        <div className="flex flex-col justify-center items-center">
          <div className="h-12 rounded-full aspect-square bg-purple-500"></div>
          <h6 className="text-base pt-4">สมสวัสดิ์ กิตประเสริฐกาล</h6>
          <p className="text-gray-500 text-sm">นักออกแบบแฮคอะทอน, Pra Titan Company</p>
        </div>
      </section>
      <section>
        <div className="p-10 lg:px-16 lg:pt-24 flex flex-col justify-center items-center gap-8">
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-3xl lg:text-4xl text-center">
              เกิดมาเพื่ออีเวนต์ และคนจัดอีเวนต์เท่านั้น
            </h1>
            <h3 className="text-gray-700 text-2xl">คุณเคยเจอปัญหานี้หรือไม่:</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 px-8 lg:px-0">
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="bg-purple-100 rounded-full aspect-square text-4xl p-4 border border-purple-200 flex items-center justify-center">
                📅
              </div>
              <h6 className="text-center text-gray-500 max-w-2xl">
                ใช้ monday ทำ agenda
                แล้วการแก้บล็อคเวลาสักช่วงทำให้ในหลายครั้งคุณต้องรื้อโครงสร้างของตารางใหม่
              </h6>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="bg-purple-100 rounded-full aspect-square text-4xl p-4 border border-purple-200 flex items-center justify-center">
                🗄️
              </div>
              <h6 className="text-center text-gray-500 max-w-2xl">
                ใช้ notion ทำรายละเอียดอีเวนต์​ แต่นานเข้าโครงสร้างข้อมูลก็บวมจนหาไม่เจอ
              </h6>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="bg-purple-100 text-4xl p-4 rounded-full aspect-square border border-purple-200 flex items-center justify-center">
                📑
              </div>
              <h6 className="text-center text-gray-500 max-w-2xl">
                ใช้ excel ทำข้อมูลสตาฟ แต่รูปแบบข้อมูล --- จนนำไปใช้ประโยชน์อื่น ๆ ต่อได้ยาก
              </h6>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="bg-purple-100 rounded-full aspect-square text-4xl p-4 border border-purple-200 flex items-center justify-center">
                📱
              </div>
              <h6 className="text-center text-gray-500 max-w-2xl">
                รัน operation วันงานด้วยกระดาษและ messaging app แต่ก็ out-of-sync
                จนต้องนัดบรีฟออฟไลน์กันบ่อยครั้งจนเสียเวลา
              </h6>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 lg:gap-2 max-w-2xl">
            <h3 className="text-gray-700 text-lg max-w-3xl text-center">
              เพราะเครื่องมือที่
              <span className="font-semibold">ครอบคลุมที่สุด </span>
              อาจไม่ใช่เครื่องมือที่
              <span className="font-semibold">สะดวกที่สุด </span>เสมอไป
            </h3>
            <h3 className="text-gray-700 text-lg max-w-3xl text-center">
              👌🏻 okmize ออกแบบมาเพื่อคนจัดอีเวนต์และจะเป็นเช่นนี้ต่อไป
              เพื่อสร้างเครื่องมือที่เป็นมิตรต่อกลุ่มผู้จัดอีเวนต์มากที่สุด
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
