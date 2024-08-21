import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import Image from "next/image";
import logo from "@/public/assets/logo1.png";

const Header = () => {
  return (
    <header className="py-7 text-black xl:py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" className="w-20 h-20  items-center" />
        </Link>
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button className="hover:text-black/80">Hire me</Button>
          </Link>
        </div>

        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
