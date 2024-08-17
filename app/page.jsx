import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiDownload } from "react-icons/fi";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className=" flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Front-End Web Developer</span>
            <h1 className="h1">
              Hello i`m <br />
              <span className="text-accent">Alvarizqi</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              I`m currently pursuing a Bachelor`s degree in Computer Science at
              Universitas Negeri Semarang, focusing on front-end web
              development, UI/UX design, and graphic design. I`m proficient in
              React, Next.js, and Laravel, with strong skills in wireframing,
              prototyping, HTML, CSS, and JavaScript. I also use tools like
              Canva and Corel Draw to bring creative ideas to life. Let`s
              collaborate and create exceptional digital experiences! solutions.
              Lets collaborate and bring creative visions to life!
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
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
    </section>
  );
};

export default Home;
