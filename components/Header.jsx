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
    <header className="py-7 text-black xl:py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" aria-label="Alvarizqi - Go to home">
          <Image
            src={logo}
            alt="Alvarizqi logo"
            width={80}
            height={80}
            className="w-20 h-20 items-center"
            priority
            quality={80}
          />
        </Link>
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/pages/contact">
            <Button className="hover:text-black/80">Hire me</Button>
          </Link>
          <LanguageSwitcher />
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
