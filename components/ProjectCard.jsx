"use client";
import Link from "next/link";
import { FaCode, FaEye } from "react-icons/fa";
import Image from "next/image";

const ProjectCard = ({ id, image, title, desc, preview, icon, demo }) => {
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
            href={id ? `/projects/${id}` : "#"}
            className="h-14 w-14 border-2 relative rounded-full border-[#DFD3C3] hover:border-black group/link"
            title="Lihat Detail"
          >
            <svg
              className="h-10 w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black/80 group-hover/link:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Link>
          <Link
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 w-14 border-2 relative rounded-full border-[#DFD3C3] hover:border-black group/link"
            title="Buka Demo"
          >
            <svg
              className="h-10 w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black/80 group-hover/link:text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </Link>
          <Link
            href={preview}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 w-14 border-2 relative rounded-full border-[#DFD3C3] hover:border-black group/link"
            title="Lihat Preview"
          >
            <svg
              className="h-10 w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black/80 group-hover/link:text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.3-1.54c-.39-.49-1.02-.49-1.41 0-.39.49-.39 1.28 0 1.77l2 2.34c.39.49 1.02.49 1.41 0l4.15-5.34c.39-.49.39-1.28 0-1.77-.39-.49-1.02-.49-1.41 0z" />
            </svg>
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
