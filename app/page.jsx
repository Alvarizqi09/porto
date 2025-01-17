"use client";

import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiDownload } from "react-icons/fi";

const Home = () => {
  const handleDownloadCV = () => {
    window.open(
      "https://drive.google.com/file/d/1tN3F2haGux10CCJ2fxbsNqJh0AGs4UTG/view?usp=sharing",
      "_blank"
    );
  };
  return (
    <section className="h-full mb-10">
      <div className="container mx-auto ">
        <div className=" flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Front-End Web Developer</span>
            <h1 className="h1">
              Hello i`m <br />
              <span className="text-accent">Alvarizqi</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-black/80">
              With expertise in React, Vue, Next.js, and Laravel, I transform
              ideas into seamless, visually stunning web experiences. Let's
              collaborate to create something truly extraordinary together!
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
                onClick={handleDownloadCV}
              >
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button>
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
          "Building the web, one pixel at a time. Let's make the digital world a
          more beautiful place together!"
        </p>
      </div>
    </section>
  );
};

export default Home;
