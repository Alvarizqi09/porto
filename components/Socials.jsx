import Link from "next/link";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

const social = [
  { icon: <FaGithub />, path: "https://github.com/Alvarizqi09" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/alvarizqi/" },
  { icon: <FaInstagram />, path: "https://instagram.com/alvarizqi__" },
  { icon: <FaFacebook />, path: "https://www.facebook.com/faizada.alvarizqi/" },
];
const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {social.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
