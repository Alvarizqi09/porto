"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { FiMenu } from "react-icons/fi";
import { Sparkles } from "lucide-react";
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
      <SheetTrigger className="p-2.5 rounded-full bg-card/80 text-foreground hover:bg-card border border-foreground/15 shadow-sm transition-all duration-200">
        <FiMenu className="text-2xl text-primary" />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <div className="mt-16 mb-10 mx-auto">
            <Link href="/" className="block relative w-24 h-24">
              <Image
                src={logo}
                alt="logo"
                fill
                className="object-contain drop-shadow-md"
              />
            </Link>
          </div>
          <nav className="flex flex-col justify-center items-center gap-3 w-full px-2">
            {links.map((link, index) => {
              const isActive = link.path === pathname;
              return (
                <Link
                  key={index}
                  href={link.path}
                  className={`${
                    isActive
                      ? "bg-primary text-white shadow-nature font-bold"
                      : "text-foreground hover:text-primary hover:bg-primary/10 font-semibold bg-card/75"
                  } capitalize font-display text-lg px-6 py-3 rounded-2xl transition-all duration-300 w-full text-center border border-foreground/15`}
                >
                  {t(link.name)}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="text-center text-xs text-foreground/50 pb-6 font-display flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Studio Ghibli Inspired Portfolio</span>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
