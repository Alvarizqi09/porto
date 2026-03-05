"use client";

import dynamic from "next/dynamic";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiDownload } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { aboutApi } from "@/lib/api/aboutApi";
import { useTranslations } from "next-intl";

const Photo = dynamic(() => import("@/components/Photo"), { ssr: false });
const Stats = dynamic(() => import("@/components/Stats"), { ssr: false });

const Home = () => {
  const { data } = useQuery({
    queryKey: ["about-data"],
    queryFn: aboutApi.fetchAboutData,
  });
  
  const t = useTranslations("Hero");

  const cvLink = data?.about?.cvLink || "";
  const cvLinkEnglish = data?.about?.cvLinkEnglish || "";

  const handleDownloadCV = () => {
    window.open(cvLink, "_blank");
  };

  const handleDownloadCVenglish = () => {
    window.open(cvLinkEnglish, "_blank");
  };
  return (
    <section className="h-full mb-10">
      <div className="container mx-auto ">
        <div className=" flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">{t("role")}</span>
            <h1 className="h1">
              {t("titlePrefix")} <br />
              <span className="text-accent">Alvarizqi</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-black/80">
              {t("description")}
            </p>
            <div className="flex flex-col items-center justify-center xl:justify-start gap-6 mb-8">
              <div className="flex flex-col xl:flex-row items-center gap-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                  onClick={handleDownloadCV}
                >
                  <span>{t("downloadCV")}</span>
                  <FiDownload className="text-xl" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                  onClick={handleDownloadCVenglish}
                >
                  <span>{t("englishVersion")}</span>
                  <FiDownload className="text-xl" />
                </Button>
              </div>
              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
      <div className="text-center mt-12">
        <p className="text-lg text-black/80">
          {t("quote")}
        </p>
      </div>
    </section>
  );
};

export default Home;
