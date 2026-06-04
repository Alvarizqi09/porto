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
    <header className="py-7 xl:py-3 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" aria-label="Alvarizqi - Go to home" className="relative w-20 h-20 flex items-center">
          <Image
            src={logo}
            alt="Alvarizqi logo"
            fill
            className="object-contain"
            priority
            quality={80}
          />
        </Link>
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/pages/contact">
            <Button className="hover:text-foreground">Hire me</Button>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="xl:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
