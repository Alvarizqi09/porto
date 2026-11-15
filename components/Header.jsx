import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import Nav from "./Nav";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import logo from "@/public/assets/logo1.png";

const MobileNav = dynamic(() => import("./MobileNav"), { ssr: false });

const Header = () => {
  return (
    <header className="py-4 xl:py-5 sticky top-0 z-40 transition-all duration-300">
      <div className="container mx-auto">
        <div className="glass-card bg-[#FCFAF4]/95 backdrop-blur-md rounded-full px-6 py-2.5 flex justify-between items-center shadow-nature border border-foreground/15">
          <Link
            href="/"
            aria-label="Alvarizqi - Go to home"
            className="relative w-14 h-14 flex items-center transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={logo}
              alt="Alvarizqi logo"
              fill
              className="object-contain drop-shadow-sm"
              priority
              quality={90}
            />
          </Link>

          <div className="hidden xl:flex items-center gap-6">
            <Nav />
            <Link href="/pages/contact">
              <Button size="sm" className="shadow-nature hover:shadow-glow">
                Hire me
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
            </div>
          </div>

          <div className="xl:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
