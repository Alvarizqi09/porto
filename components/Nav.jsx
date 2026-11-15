"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

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

const Nav = () => {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  return (
    <nav className="flex gap-1.5 items-center bg-card/85 backdrop-blur-md p-1.5 rounded-full border border-foreground/15 shadow-sm">
      {links.map((link, index) => {
        const isActive = link.path === pathname;
        return (
          <Link
            key={index}
            href={link.path}
            className={`${
              isActive
                ? "bg-primary text-white shadow-nature font-bold"
                : "text-foreground hover:text-primary hover:bg-primary/10 font-semibold"
            } capitalize font-display px-4 py-1.5 rounded-full text-sm transition-all duration-300`}
          >
            {t(link.name)}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
