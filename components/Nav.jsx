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
        const isActive = link.path === pathname;
        return (
          <Link
            key={index}
            href={link.path}
            className={`${
              isActive
                ? "bg-primary text-primary-foreground border-3 border-foreground shadow-[2px_2px_0px_0px_var(--border)]"
                : "border-3 border-transparent hover:border-foreground hover:bg-muted text-foreground/80 hover:text-foreground"
            } capitalize font-bold px-3 py-1.5 rounded-md transition-all duration-150`}
          >
            {t(link.name)}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
