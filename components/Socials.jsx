import Link from "next/link";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

const social = [
  { icon: <FaGithub />, path: "https://github.com/Alvarizqi09", label: "GitHub" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/alvarizqi/", label: "LinkedIn" },
  { icon: <FaInstagram />, path: "https://instagram.com/alvarizqi__", label: "Instagram" },
  { icon: <FaFacebook />, path: "https://www.facebook.com/faizada.alvarizqi/", label: "Facebook" },
];
const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {social.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles} aria-label={item.label}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
