"use client";

import dynamic from "next/dynamic";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiDownload, FiLoader } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { aboutApi } from "@/lib/api/aboutApi";
import { useTranslations } from "next-intl";

const Stats = dynamic(() => import("@/components/Stats"), { ssr: false });
const RecommendationsCarousel = dynamic(() => import("@/components/client/ui/RecommendationsCarousel"), { ssr: false });
const Photo = dynamic(() => import("@/components/Photo"), {
  ssr: true,
  loading: () => (
    <div className="w-[300px] h-[300px] xl:w-[440px] xl:h-[440px] bg-[#FAF8F0] border-4 border-foreground rounded-lg shadow-[6px_6px_0px_0px_#1C293C] animate-pulse" />
  ),
});

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["about-data"],
    queryFn: aboutApi.fetchAboutData,
  });
  
  const t = useTranslations("Hero");

  const cvLink = data?.about?.cvLink || "";
  const cvLinkEnglish = data?.about?.cvLinkEnglish || "";

  const handleDownloadCV = async () => {
    if (cvLink) {
      window.open(cvLink, "_blank");
    } else {
      try {
        const freshData = await aboutApi.fetchAboutData();
        if (freshData?.about?.cvLink) {
          window.open(freshData.about.cvLink, "_blank");
        }
      } catch (error) {
        console.error("Failed to fetch CV link", error);
      }
    }
  };

  const handleDownloadCVenglish = async () => {
    if (cvLinkEnglish) {
      window.open(cvLinkEnglish, "_blank");
    } else {
      try {
        const freshData = await aboutApi.fetchAboutData();
        if (freshData?.about?.cvLinkEnglish) {
          window.open(freshData.about.cvLinkEnglish, "_blank");
        }
      } catch (error) {
        console.error("Failed to fetch English CV link", error);
      }
    }
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
            <p className="max-w-[500px] mb-9 text-foreground/80">
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
                  iconStyles="w-10 h-10 border-3 border-foreground rounded-md flex justify-center items-center text-foreground text-base bg-card hover:bg-primary shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[3.5px_3.5px_0px_0px_var(--border)] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all duration-150"
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
      <div className="text-center mt-12 mb-20">
        <p className="text-lg text-foreground/80">
          {t("quote")}
        </p>
      </div>

      <RecommendationsCarousel />
    </section>
  );
};

export default Home;
