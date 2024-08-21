"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCode, FaEye } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon

const ProjectCard = ({ image, title, desc, preview, icon, demo }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="shadow-xl border-accent border-4 rounded-2xl max-w-[25rem] xl:h-[360px] h-[400px] flex flex-col justify-between mx-auto relative">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-2xl">
          <FaSpinner className="text-black text-4xl animate-spin" />
        </div>
      )}
      <div
        className={`xl:w-full xl:h-full h-[280px] rounded-t-xl relative group transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `url(${image})`,
          backgroundSize: "cover",
          visibility: loaded ? "visible" : "hidden",
        }}
      >
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-accent gap-8 bg-opacity-0 rounded-t-xl hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
          <Link
            href={demo}
            className="h-14 w-14 border-2 relative rounded-full border-[#DFD3C3] hover:border-black group/link"
          >
            <FaCode className="h-10 w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black/80 cursor-pointer group-hover/link:text-white" />
          </Link>
          <Link
            href={preview}
            className="h-14 w-14 border-2 relative rounded-full border-[#DFD3C3] hover:border-black group/link"
          >
            <FaEye className="h-10 w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black/80 cursor-pointer group-hover/link:text-white" />
          </Link>
        </div>
      </div>
      <div
        className={`rounded-b-xl bg-[#DFD3C3] py-2 px-6 flex flex-col justify-between transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          visibility: loaded ? "visible" : "hidden",
        }}
      >
        <div>
          <h5 className="text-xl text-center font-semibold text-black mb-1 ">
            {title}
          </h5>
          <p className="text-sm text-black/60 text-center line-clamp-2">
            {desc}
          </p>
        </div>
        <div className="flex flex-row gap-4 mt-10">{icon}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
