"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import Image from "next/image";
import logo from "@/public/assets/logo1.png";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "projects",
    path: "/pages/projects",
  },
  {
    name: "about",
    path: "/pages/about",
  },
  {
    name: "contact",
    path: "/pages/contact",
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="mt-32 mb-8 mx-auto text-2xl">
          <Link href="/">
            <Image src={logo} alt="logo" className="w-32 h-32 " />
          </Link>
        </div>
        <nav className="flex flex-col justify-center items-center gap-6 w-full px-4">
          {links.map((link, index) => {
            const isActive = link.path === pathname;
            return (
              <Link
                key={index}
                href={link.path}
                className={`${
                  isActive
                    ? "bg-primary text-primary-foreground border-3 border-foreground shadow-[3px_3px_0px_0px_var(--border)]"
                    : "border-3 border-transparent hover:border-foreground hover:bg-muted text-foreground/80"
                } capitalize text-xl font-bold px-5 py-2.5 rounded-md transition-all duration-150 w-full text-center`}
              >
                {t(link.name)}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
