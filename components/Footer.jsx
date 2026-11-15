import React from "react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");

  return (
    <footer className="mt-20 mb-8 relative z-10">
      {/* Decorative calm divider */}
      <div className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 mb-4 text-foreground/30">
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-foreground/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-foreground/20" />
      </div>

      <p className="text-center font-display text-sm text-foreground/75">
        &copy; {currentYear}{" "}
        <a
          href="https://github.com/Alvarizqi09"
          aria-label="Visit Alvarizqi's GitHub profile"
          rel="noopener noreferrer"
          target="_blank"
          className="font-bold text-foreground hover:text-primary transition-colors underline decoration-primary/40 underline-offset-4"
        >
          Alvarizqi
        </a>
        . {t("rights")}
      </p>
    </footer>
  );
};

export default Footer;
