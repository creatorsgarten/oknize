import { Button } from "../../components/ui/button";

const Feature = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="bg-purple-100 rounded-full aspect-square h-8 flex items-center justify-center">
        K
      </div>
      <h6 className="text-lg">Lorem Ipsum Dolor.</h6>
      <p className="text-center text-gray-500">
        Whether you have a team of 2 or 200, our shared team inboxes keep
        everyone on the same page and in the loop.
      </p>
    </div>
  );
};

const Landing = () => {
  return (
    <div>
      <section>
        <div className="flex flex-col gap-6 justify-center items-center p-16">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl text-center">
              จัดอีเวนต์ให้ &quot;ไนซ์&quot; ด้วย &quot;โอเคไนซ์&quot;
            </h1>
            <h4 className="text-xl text-neutral-500 text-center">
              แพลตฟอร์มตัวช่วยการจัดอีเวนต์แบบครบ จบ ในที่เดียว
            </h4>
          </div>
          <div>
            <Button className="bg-purple-500">ลองใช้เลย!</Button>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="px-10 lg:px-16 flex flex-col justify-center items-center gap-4">
            <h4 className="text-lg text-purple-500 text-center">คุณสมบัติ</h4>
            <h1 className="text-3xl lg:text-4xl text-center">
              เราจะช่วยให้การจัดอีเวนต์สะดวกขึ้นได้อย่างไร
            </h1>
            <h6 className="text-center text-gray-500 max-w-2xl">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more users. Trusted by over 4,000
              startups.
            </h6>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
            <Feature />
            <Feature />
            <Feature />
            <Feature />
          </div>
        </div>
      </section>
      <section className="bg-gray-50 p-8 flex flex-col justify-center items-center py-8 lg:py-16 gap-6 lg:gap-8">
        <h1 className="text-2xl lg:text-4xl text-center max-w-3xl">
          จัดอีเวนต์สนุก เพื่อนชอบ ลูกค้าชอบ ทุกระดับประทับใจ
          ไม่ต้องปวดหัวกับปัญหายิบย่อยวุ่นวาย 🔥
        </h1>
        <div className="flex flex-col justify-center items-center">
          <div className="h-12 rounded-full aspect-square bg-purple-500"></div>
          <h6 className="text-base pt-4">สมสวัสดิ์ กิตประเสริฐกาล</h6>
          <p className="text-gray-500 text-sm">
            นักออกแบบแฮคอะทอน, Pra Titan Company
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
