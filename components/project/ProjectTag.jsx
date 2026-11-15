import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyle = isSelected
    ? "bg-primary text-white border border-primary/30 shadow-nature shadow-glow font-bold -translate-y-0.5"
    : "bg-card/90 text-foreground border border-foreground/20 hover:border-primary/40 hover:text-primary hover:bg-card hover:-translate-y-0.5 shadow-sm font-semibold";

  return (
    <button
      className={`${buttonStyle} rounded-full px-6 py-2 text-sm font-display cursor-pointer transition-all duration-300 active:scale-95`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
