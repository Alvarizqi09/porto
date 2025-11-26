import React from "react";
import { Button } from "@/components/ui/button";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyle = isSelected
    ? "text-white bg-accent "
    : "text-black/80 border-accent";
  return (
    <Button
      className={`${buttonStyle}  hover:text-white rounded-full border-2 px-3 py-6 text-lg cursor-pointer`}
      variant="outline"
      onClick={() => onClick(name)}
    >
      {name}
    </Button>
  );
};

export default ProjectTag;
