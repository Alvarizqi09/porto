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
    <nav className="flex gap-8 items-center">
      {links.map((link, index) => {
        return (
          <Link
            key={index}
            href={link.path}
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent transition-all`}
          >
            {t(link.name)}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
