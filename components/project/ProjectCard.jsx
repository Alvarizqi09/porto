"use client";
import Link from "next/link";
import Image from "next/image";
import { BsInfoCircleFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { useLocale } from "next-intl";
import { getLocalizedText } from "@/utils/localization";
import { DEFAULT_PROJECT_IMAGE } from "@/utils/imageFallback";

const ProjectCard = ({ id, image, title, desc, preview, icon, demo }) => {
  const locale = useLocale();
  const localizedTitle = getLocalizedText(title, locale);
  const localizedDesc = getLocalizedText(desc, locale);

  return (
    <div className="glass-card bg-[#FEFCF6]/85 border border-foreground/15 rounded-3xl w-full flex flex-col mx-auto relative overflow-hidden shadow-nature hover:shadow-nature-xl hover:-translate-y-1.5 transition-all duration-500 group">
      {/* Top Image Showcase */}
      <div className="w-full min-h-[230px] flex-grow relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#E3EDE5]/50 to-[#EDE9DF]/50 p-6">
        {/* Soft rounded image wrapper */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden z-[1] border border-foreground/10 shadow-sm group-hover:scale-105 transition-transform duration-700 ease-out bg-white">
          <Image
            src={image || DEFAULT_PROJECT_IMAGE}
            alt={`${localizedTitle} - Project preview`}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
            className="object-cover"
            quality={85}
          />
        </div>

        {/* Hover overlay with dreamy blur and buttons */}
        <div className="items-center justify-center absolute inset-0 bg-[#3D4F3D]/60 backdrop-blur-sm gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex">
          <Link
            href={id ? `/pages/projects/${id}` : "#"}
            className="h-12 w-12 rounded-full bg-card/90 text-foreground border border-white/50 shadow-nature hover:bg-primary hover:text-white hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-200"
            title="Lihat Detail"
            aria-label={`View details for ${localizedTitle} project`}
          >
            <BsInfoCircleFill className="text-xl" />
          </Link>
          {demo && (
            <Link
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 w-12 rounded-full bg-card/90 text-foreground border border-white/50 shadow-nature hover:bg-primary hover:text-white hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-200"
              title="Buka Demo"
              aria-label={`Open demo for ${localizedTitle}`}
            >
              <FiExternalLink className="text-xl" />
            </Link>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col justify-between border-t border-foreground/10 flex-grow bg-card/50">
        <div>
          <h5 className="text-lg xl:text-xl text-center font-bold font-display text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {localizedTitle}
          </h5>
          <p className="text-sm text-foreground/75 text-center line-clamp-2 leading-relaxed">
            {localizedDesc}
          </p>
        </div>

        {/* Tech Stack Icons */}
        {icon && icon.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2 mt-5 justify-center items-center pt-3 border-t border-foreground/5 text-foreground/70">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
