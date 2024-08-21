import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="mt-0 mb-10">
      <h5
        variant="small"
        className="text-center font-normal text-black/80 md:mb-0 mt-6 xl:mt-0"
      >
        &copy; {currentYear}{" "}
        <a href="https://github.com/Alvarizqi09">
          <strong>Alvarizqi</strong>
        </a>
        . All Rights Reserved.
      </h5>
    </div>
  );
};

export default Footer;
