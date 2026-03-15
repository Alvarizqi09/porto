import React from "react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");
  return (
    <div className="mt-0 mb-10">
      <p className="text-center font-normal text-foreground/80 dark:text-white md:mb-0 mt-6 xl:mt-0">
        &copy; {currentYear}
        <a
          href="https://github.com/Alvarizqi09"
          aria-label="Visit Alvarizqi's GitHub profile"
          rel="noopener noreferrer"
          target="_blank"
        >
          <strong> Alvarizqi</strong>
        </a>
        . {t("rights")}
      </p>
    </div>
  );
};

export default Footer;
