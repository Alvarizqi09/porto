import React from "react";
import { Button } from "@/components/ui/button";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyle = isSelected
    ? "bg-primary text-primary-foreground border-3 border-foreground shadow-[2px_2px_0px_0px_var(--border)] translate-x-[-1px] translate-y-[-1px]"
    : "bg-card text-foreground/80 border-3 border-foreground hover:bg-muted shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-150";
  return (
    <button
      className={`${buttonStyle} rounded-md px-5 py-2 text-lg font-bold cursor-pointer transition-all duration-150`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
