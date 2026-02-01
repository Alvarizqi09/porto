"use client";
import Link from "next/link";
import Image from "next/image";
import { BsInfoCircleFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { MdPreview } from "react-icons/md";

const ProjectCard = ({ id, image, title, desc, preview, icon, demo }) => {
  return (
    <div className="shadow-xl border-accent border-4 rounded-2xl w-full sm:max-w-[25rem] h-auto sm:h-[400px] flex flex-col justify-between mx-auto relative overflow-hidden">
      <div className="w-full h-[280px] sm:h-[240px] rounded-t-xl relative group overflow-hidden bg-gray-200">
        <Image
          src={image}
          alt={`${title} - Project preview`}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25rem"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          quality={80}
        />
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-accent gap-8 bg-opacity-0 rounded-t-xl hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 z-10">
          <Link
            href={id ? `/pages/projects/${id}` : "#"}
            className="h-14 w-14 border-2 relative rounded-full border-[#DFD3C3] hover:border-black group/link flex items-center justify-center transition-all"
            title="Lihat Detail"
            aria-label={`View details for ${title} project`}
          >
            <BsInfoCircleFill className="text-3xl text-black/80 group-hover/link:text-white transition-colors" />
          </Link>
          <Link
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 w-14 border-2 relative rounded-full border-[#DFD3C3] hover:border-black group/link flex items-center justify-center transition-all"
            title="Buka Demo"
            aria-label={`Open demo for ${title}`}
          >
            <FiExternalLink className="text-3xl text-black/80 group-hover/link:text-white transition-colors" />
          </Link>
          <Link
            href={preview}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 w-14 border-2 relative rounded-full border-[#DFD3C3] hover:border-black group/link flex items-center justify-center transition-all"
            title="Lihat Preview"
            aria-label={`View preview for ${title}`}
          >
            <MdPreview className="text-3xl text-black/80 group-hover/link:text-white transition-colors" />
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
