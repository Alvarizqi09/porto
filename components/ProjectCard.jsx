"use client";
import Link from "next/link";
import { FaCode, FaEye } from "react-icons/fa";
import Image from "next/image";

const ProjectCard = ({ image, title, desc, preview, icon, demo }) => {
  return (
    <div className="shadow-xl border-accent border-4 rounded-2xl w-full sm:max-w-[25rem] h-auto sm:h-[400px] flex flex-col justify-between mx-auto relative overflow-hidden">
      <div className="w-full h-[280px] sm:h-[240px] rounded-t-xl relative group overflow-hidden bg-gray-200">
        <Image
          src={image}
          alt={title}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, 25rem"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-accent gap-8 bg-opacity-0 rounded-t-xl hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 z-10">
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

      <div className="rounded-b-xl bg-[#DFD3C3] min-h-[10rem] py-2 px-6 flex flex-col justify-between">
        <div>
          <h5 className="text-xl text-center font-semibold text-black mb-1">
            {title}
          </h5>
          <p className="text-sm text-black/60 text-center line-clamp-2">
            {desc}
          </p>
        </div>
        <div className="flex flex-row gap-4 mt-5">{icon}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
