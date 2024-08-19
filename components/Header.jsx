import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import Image from "next/image";
import logo from "@/public/assets/Logo.png";

const Header = () => {
  return (
    <nav className="py-7 text-white sticky xl:py-5">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" className="w-20 h-20  items-center" />
        </Link>
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button>Hire me</Button>
          </Link>
        </div>

        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Header;
