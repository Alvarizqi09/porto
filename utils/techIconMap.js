import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaFigma,
  FaReact,
  FaLaravel,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiBootstrap,
  SiNextdotjs,
  SiVuedotjs,
  SiTypescript,
  SiSupabase,
  SiMongodb,
  SiFirebase,
  SiQuasar,
  SiGithub,
  SiGitlab,
  SiBitbucket,
  SiJira,
  SiTrello,
  SiNodedotjs,
  SiExpress,
  SiDocker,
  SiPostgresql,
  SiMysql,
  SiGraphql,
  SiRedux,
  SiVite,
  SiPhp,
  SiCodeigniter,
} from "react-icons/si";

const techIconMap = {
  HTML: <FaHtml5 title="HTML" aria-label="HTML" role="img" />,
  CSS: <FaCss3 title="CSS" aria-label="CSS" role="img" />,
  JavaScript: <FaJs title="JavaScript" aria-label="JavaScript" role="img" />,
  TypeScript: (
    <SiTypescript title="TypeScript" aria-label="TypeScript" role="img" />
  ),
  React: <FaReact title="React" aria-label="React" role="img" />,
  "Vue.js": <SiVuedotjs title="Vue.js" aria-label="Vue.js" role="img" />,
  "Next.js": <SiNextdotjs title="Next.js" aria-label="Next.js" role="img" />,
  "Tailwind CSS": (
    <SiTailwindcss title="Tailwind CSS" aria-label="Tailwind CSS" role="img" />
  ),
  Bootstrap: (
    <SiBootstrap title="Bootstrap" aria-label="Bootstrap" role="img" />
  ),
  Quasar: <SiQuasar title="Quasar" aria-label="Quasar" role="img" />,
  Laravel: <FaLaravel title="Laravel" aria-label="Laravel" role="img" />,
  Figma: <FaFigma title="Figma" aria-label="Figma" role="img" />,
  Supabase: <SiSupabase title="Supabase" aria-label="Supabase" role="img" />,
  Firebase: <SiFirebase title="Firebase" aria-label="Firebase" role="img" />,
  Mongodb: <SiMongodb title="MongoDB" aria-label="MongoDB" role="img" />,
  Github: <SiGithub title="GitHub" aria-label="GitHub" role="img" />,
  Gitlab: <SiGitlab title="GitLab" aria-label="GitLab" role="img" />,
  Bitbucket: (
    <SiBitbucket title="Bitbucket" aria-label="Bitbucket" role="img" />
  ),
  Jira: <SiJira title="Jira" aria-label="Jira" role="img" />,
  Trello: <SiTrello title="Trello" aria-label="Trello" role="img" />,
  "Node.js": <SiNodedotjs title="Node.js" aria-label="Node.js" role="img" />,
  Express: <SiExpress title="Express" aria-label="Express" role="img" />,
  Docker: <SiDocker title="Docker" aria-label="Docker" role="img" />,
  PostgreSQL: (
    <SiPostgresql title="PostgreSQL" aria-label="PostgreSQL" role="img" />
  ),
  MySQL: <SiMysql title="MySQL" aria-label="MySQL" role="img" />,
  GraphQL: <SiGraphql title="GraphQL" aria-label="GraphQL" role="img" />,
  Redux: <SiRedux title="Redux" aria-label="Redux" role="img" />,
  Vite: <SiVite title="Vite" aria-label="Vite" role="img" />,
  PHP: <SiPhp title="PHP" aria-label="PHP" role="img" />,
  CodeIgniter: (
    <SiCodeigniter title="CodeIgniter" aria-label="CodeIgniter" role="img" />
  ),
};

// Helper: normalize common aliases and return a cloned element with optional size class
import { cloneElement } from "react";

const aliasMap = {
  reactjs: "React",
  react: "React",
  typescript: "TypeScript",
  javascript: "JavaScript",
  tailwind: "Tailwind CSS",
  tailwindcss: "Tailwind CSS",
  nextjs: "Next.js",
  vue: "Vue.js",
  vuedotjs: "Vue.js",
  mongodb: "Mongodb",
  mongo: "Mongodb",
  node: "Node.js",
  nodejs: "Node.js",
  express: "Express",
  docker: "Docker",
  postgres: "PostgreSQL",
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  graphql: "GraphQL",
  redux: "Redux",
  vite: "Vite",
  github: "Github",
  gitlab: "Gitlab",
  bitbucket: "Bitbucket",
  php: "PHP",
  codeigniter: "CodeIgniter",
  ci4: "CodeIgniter",
  next: "Next.js",
};

export function getIcon(name, sizeClass) {
  if (!name) return null;
  const keyDirect = techIconMap[name];
  if (keyDirect) {
    return sizeClass
      ? cloneElement(keyDirect, { className: sizeClass })
      : keyDirect;
  }

  const lookup = String(name)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
  const alias = aliasMap[lookup];
  if (alias && techIconMap[alias]) {
    return sizeClass
      ? cloneElement(techIconMap[alias], { className: sizeClass })
      : techIconMap[alias];
  }

  return null;
}

export default techIconMap;
