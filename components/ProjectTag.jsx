import React from "react";
import { Button } from "./ui/button";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyle = isSelected ? "text-black" : "text-black/80 border-accent";
  return (
    <Button
      className={`${buttonStyle}  hover:text-black rounded-full border-2 px-3 py-6 text-lg cursor-pointer`}
      variant="outline"
      onClick={() => onClick(name)}
    >
      {name}
    </Button>
  );
};

export default ProjectTag;
