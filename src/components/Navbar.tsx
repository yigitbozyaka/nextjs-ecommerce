import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "All Rv's", href: "/rvs/all" },
  { name: "Process", href: "/#process" },
  { name: "About us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bgColor, setBgColor] = useState("bg-transparent");
  const [textColor, setTextColor] = useState("#000");

  const handleScroll = () => {
    if (window.scrollY >= 10) {
      setBgColor("bg-[#ECF2FF] drop-shadow-[0_6px_12px_rgba(196,126,51,0.6)]");
      setTextColor("text-black");
    } else {
      setBgColor("bg-transparent");
      setTextColor("#000");
    }
  };

  if (typeof window !== "undefined")
    window.addEventListener("scroll", handleScroll);

  return (
    <header className="fixed inset-x-0 top-0 z-50 ease-in-out duration-300">
      <nav
        className={`flex items-center justify-between p-6 lg:px-8 ease-in-out duration-300 ${bgColor}`}
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">HighwayHomes</span>
            <Image width={60} height={60} src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 text-orange-400" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`font-semibold leading-6 ${textColor}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
          <Link
            href="/rvs/all"
            className={`font-semibold bg-orange-400 duration-300 hover:bg-orange-500 text-white px-4 py-2 rounded-lg leading-6 ${textColor}`}
          >
            Buy Now <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">HighwayHomes</span>
              <Image width={60} height={60} src="/logo.png" alt="Logo" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-4 py-6">
                <Link
                  href="#"
                  className="bg-orange-400 text-white -mx-3 block max-w-[6rem] text-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Navbar;
