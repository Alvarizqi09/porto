"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCode, FaEye } from "react-icons/fa";

const ProjectCard = ({ image, title, desc, preview, demo }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div
        className={`h-52 md:h-72 rounded-t-xl relative group transition-opacity duration-500 ${
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
            className="h-14 w-14 border-2 relative rounded-full border-[#27272c] hover:border-black group/link"
          >
            <FaCode className="h-10 w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/60 cursor-pointer group-hover/link:text-black" />
          </Link>
          <Link
            href={preview}
            className="h-14 w-14 border-2 relative rounded-full border-[#27272c] hover:border-black group/link"
          >
            <FaEye className="h-10 w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/60 cursor-pointer group-hover/link:text-black" />
          </Link>
        </div>
      </div>
      <div className="rounded-b-xl bg-[#27272c] py-6">
        <h5 className="text-4xl font-semibold text-white mb-2 ">{title}</h5>
        <p className="text-white/60">{desc}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
