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

const Socials = ({
  containerStyles = "flex gap-4",
  iconStyles = "w-11 h-11 rounded-full border border-foreground/15 bg-card/85 backdrop-blur-sm flex justify-center items-center text-foreground/80 hover:text-white hover:bg-primary hover:border-primary shadow-nature hover:shadow-glow hover:-translate-y-1 active:scale-95 transition-all duration-300",
}) => {
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
