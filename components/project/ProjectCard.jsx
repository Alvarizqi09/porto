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
    <div className="border-4 border-foreground bg-card rounded-md w-full flex flex-col mx-auto relative overflow-hidden shadow-neobrutal-card hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-neobrutal-card-hover transition-all duration-200 group">
      <div className="w-full min-h-[250px] flex-grow relative group overflow-hidden flex items-center justify-center bg-muted/30">
        {/* Decorative Square logo container */}
        <div className="relative w-[60%] aspect-square rounded-md overflow-hidden z-[1] border-3 border-foreground shadow-[3px_3px_0px_0px_var(--border)] group-hover:scale-105 transition-transform duration-500 bg-white">
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
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-accent/90 gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex hidden group-hover:flex">
          <Link
            href={id ? `/pages/projects/${id}` : "#"}
            className="h-12 w-12 border-3 bg-card text-foreground border-foreground relative rounded-md shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center transition-all"
            title="Lihat Detail"
            aria-label={`View details for ${localizedTitle} project`}
          >
            <BsInfoCircleFill className="text-xl text-foreground" />
          </Link>
          <Link
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-12 border-3 bg-card text-foreground border-foreground relative rounded-md shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center transition-all"
            title="Buka Demo"
            aria-label={`Open demo for ${localizedTitle}`}
          >
            <FiExternalLink className="text-xl text-foreground" />
          </Link>
        </div>
      </div>

      <div className="bg-card py-5 px-6 flex flex-col justify-between border-t-4 border-foreground">
        <div>
          <h5 className="text-xl text-center font-bold text-foreground mb-1">
            {localizedTitle}
          </h5>
          <p className="text-sm text-foreground/75 text-center line-clamp-2">
            {localizedDesc}
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-2.5 mt-4 justify-center">{icon}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
