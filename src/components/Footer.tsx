import Image from "next/image";

function FooterSection() {
  return (
    <div className="relative bottom-0 bg-[#3b2216] py-8 text-white w-full">
      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-evenly items-center">
        <div className="flex flex-col items-center gap-3">
          <Image src={"/logo.png"} width={60} height={60} alt="Logo" />
          <h1 className="font-bold text-xl">HighwayHomes</h1>
        </div>
        <div className="flex flex-col items-center">
            <h3 className="font-bold text-xl">Contact Us</h3>
            <a href="tel:49-30-161989682" className="text-sm">Phone: +49 89 161989682</a>
            <a href="mailto:support@highwayhomes.store" className="text-sm">Email: support@highwayhomes.store</a>
        </div>
        <div className="flex flex-col items-center">
            <h3 className="font-bold text-xl">Address</h3>
            <p className="text-sm">Etterschlager Straße 14</p>
            <p className="text-sm">Munich, Germany 82266</p>
        </div>
        <div className="flex flex-col items-center">
            <h3 className="font-bold text-xl">Opening Hours</h3>
            <ul className="text-sm text-center">
                <li>Monday : 10:00 AM  – 6:00 PM</li>
                <li>Tuesday : 10:00 AM  – 6:00 PM</li>
                <li>Wednesday : 10:00 AM  – 6:00 PM</li>
                <li>Thursday : 10:00 AM  – 6:00 PM</li>
                <li>Friday : 10:00 AM  – 6:00 PM</li>
                <li>Saturday : 10:00 AM  – 3:00 PM</li>
                <li>Sunday : Closed</li>
            </ul>
        </div>
      </div>
    </div>
  );
}

export default FooterSection;
