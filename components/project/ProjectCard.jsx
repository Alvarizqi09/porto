"use client";
import Link from "next/link";
import Image from "next/image";
import { BsInfoCircleFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { MdPreview } from "react-icons/md";
import { useLocale } from "next-intl";
import { getLocalizedText } from "@/utils/localization";
import { DEFAULT_PROJECT_IMAGE } from "@/utils/imageFallback";

// Decorative SVG wave pattern matching the accent color
const waveBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23C5705D' fill-opacity='0.15'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 0 0-30 15 15 0 0 0 0 30z' fill-rule='evenodd'/%3E%3C/g%3E%3C/svg%3E")`;

const ProjectCard = ({ id, image, title, desc, preview, icon, demo }) => {
  const locale = useLocale();
  const localizedTitle = getLocalizedText(title, locale);
  const localizedDesc = getLocalizedText(desc, locale);

  return (
    <div className="shadow-xl border-accent border-4 rounded-2xl w-full flex flex-col mx-auto relative overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div
        className="w-full min-h-[250px] flex-grow relative group overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `${waveBg}, linear-gradient(135deg, #D0B8A8 0%, #DFD3C3 40%, #C5705D20 70%, #DFD3C3 100%)`,
        }}
      >
        {/* Circular logo container */}
        <div className="relative w-[65%] aspect-square rounded-full overflow-hidden z-[1] shadow-xl border-4 border-white/60 group-hover:scale-105 transition-transform duration-500 bg-white">
          <Image
            src={image || DEFAULT_PROJECT_IMAGE}
            alt={`${localizedTitle} - Project logo`}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 220px"
            className="object-cover"
            quality={80}
          />
        </div>

        {/* Hover overlay */}
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-accent gap-8 bg-opacity-0 rounded-t-xl hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 z-10">
          <Link
            href={id ? `/pages/projects/${id}` : "#"}
            className="h-14 w-14 border-2 relative rounded-full border-[#DFD3C3] hover:border-black group/link flex items-center justify-center transition-all"
            title="Lihat Detail"
            aria-label={`View details for ${localizedTitle} project`}
          >
            <BsInfoCircleFill className="text-3xl text-black/80 group-hover/link:text-white transition-colors" />
          </Link>
          <Link
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 w-14 border-2 relative rounded-full border-[#DFD3C3] hover:border-black group/link flex items-center justify-center transition-all"
            title="Buka Demo"
            aria-label={`Open demo for ${localizedTitle}`}
          >
            <FiExternalLink className="text-3xl text-black/80 group-hover/link:text-white transition-colors" />
          </Link>
          <Link
            href={preview}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 w-14 border-2 relative rounded-full border-[#DFD3C3] hover:border-black group/link flex items-center justify-center transition-all"
            title="Lihat Preview"
            aria-label={`View preview for ${localizedTitle}`}
          >
            <MdPreview className="text-3xl text-black/80 group-hover/link:text-white transition-colors" />
          </Link>
        </div>
      </div>

      <div className="rounded-b-xl bg-[#DFD3C3] py-4 px-6 flex flex-col justify-between">
        <div>
          <h5 className="text-xl text-center font-semibold text-black mb-1">
            {localizedTitle}
          </h5>
          <p className="text-sm text-black/60 text-center line-clamp-2">
            {localizedDesc}
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-3 mt-4 justify-center">{icon}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
