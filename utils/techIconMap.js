import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaFigma,
  FaReact,
  FaLaravel,
  FaVuejs,
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
  SiJest,
  SiCanva,
  SiVercel,
  SiNetlify,
  SiFramer,
  SiGreensock,
  SiAxios,
  SiReactquery,
  SiShadcnui,
  SiMui,
  SiStyledcomponents,
  SiChakraui,
  SiAntdesign,
  SiRadixui,
  SiReactrouter,
  SiSocketdotio,
  SiPrisma,
  SiDrizzle,
  SiSass,
  SiWebpack,
  SiTurborepo,
} from "react-icons/si";
import { TbMessageQuestion } from "react-icons/tb";

const techIconMap = {
  HTML: <FaHtml5 title="HTML" aria-label="HTML" role="img" />,
  CSS: <FaCss3 title="CSS" aria-label="CSS" role="img" />,
  JavaScript: <FaJs title="JavaScript" aria-label="JavaScript" role="img" />,
  TypeScript: <SiTypescript title="TypeScript" aria-label="TypeScript" role="img" />,
  React: <FaReact title="React" aria-label="React" role="img" />,
  "Vue.js": <SiVuedotjs title="Vue.js" aria-label="Vue.js" role="img" />,
  "Next.js": <SiNextdotjs title="Next.js" aria-label="Next.js" role="img" />,
  "Tailwind CSS": <SiTailwindcss title="Tailwind CSS" aria-label="Tailwind CSS" role="img" />,
  Bootstrap: <SiBootstrap title="Bootstrap" aria-label="Bootstrap" role="img" />,
  Quasar: <SiQuasar title="Quasar" aria-label="Quasar" role="img" />,
  Laravel: <FaLaravel title="Laravel" aria-label="Laravel" role="img" />,
  Figma: <FaFigma title="Figma" aria-label="Figma" role="img" />,
  Supabase: <SiSupabase title="Supabase" aria-label="Supabase" role="img" />,
  Firebase: <SiFirebase title="Firebase" aria-label="Firebase" role="img" />,
  Mongodb: <SiMongodb title="MongoDB" aria-label="MongoDB" role="img" />,
  Github: <SiGithub title="GitHub" aria-label="GitHub" role="img" />,
  Gitlab: <SiGitlab title="GitLab" aria-label="GitLab" role="img" />,
  Bitbucket: <SiBitbucket title="Bitbucket" aria-label="Bitbucket" role="img" />,
  Jira: <SiJira title="Jira" aria-label="Jira" role="img" />,
  Trello: <SiTrello title="Trello" aria-label="Trello" role="img" />,
  "Node.js": <SiNodedotjs title="Node.js" aria-label="Node.js" role="img" />,
  Express: <SiExpress title="Express" aria-label="Express" role="img" />,
  Docker: <SiDocker title="Docker" aria-label="Docker" role="img" />,
  PostgreSQL: <SiPostgresql title="PostgreSQL" aria-label="PostgreSQL" role="img" />,
  MySQL: <SiMysql title="MySQL" aria-label="MySQL" role="img" />,
  GraphQL: <SiGraphql title="GraphQL" aria-label="GraphQL" role="img" />,
  Redux: <SiRedux title="Redux" aria-label="Redux" role="img" />,
  Vite: <SiVite title="Vite" aria-label="Vite" role="img" />,
  PHP: <SiPhp title="PHP" aria-label="PHP" role="img" />,
  CodeIgniter: <SiCodeigniter title="CodeIgniter" aria-label="CodeIgniter" role="img" />,
  // New Skills
  Jest: <SiJest title="Jest" aria-label="Jest" role="img" />,
  Canva: <SiCanva title="Canva" aria-label="Canva" role="img" />,
  Vercel: <SiVercel title="Vercel" aria-label="Vercel" role="img" />,
  Netlify: <SiNetlify title="Netlify" aria-label="Netlify" role="img" />,
  "Framer Motion": <SiFramer title="Framer Motion" aria-label="Framer Motion" role="img" />,
  GSAP: <SiGreensock title="GSAP" aria-label="GSAP" role="img" />,
  Vuex: <FaVuejs title="Vuex" aria-label="Vuex" role="img" />, // Using FaVuejs for Vuex as specific icon might not exist in commonly used subset
  Axios: <SiAxios title="Axios" aria-label="Axios" role="img" />,
  gRPC: <TbMessageQuestion title="gRPC" aria-label="gRPC" role="img" />, // TbMessageQuestion or text fallback for gRPC if no specific icon
  "React Query": <SiReactquery title="React Query" aria-label="React Query" role="img" />,
  "TanStack Query": <SiReactquery title="TanStack Query" aria-label="TanStack Query" role="img" />,
  "shadcn/ui": <SiShadcnui title="shadcn/ui" aria-label="shadcn/ui" role="img" />,
  "Material UI": <SiMui title="Material UI" aria-label="Material UI" role="img" />,
  "Styled Components": <SiStyledcomponents title="Styled Components" aria-label="Styled Components" role="img" />,
  "Chakra UI": <SiChakraui title="Chakra UI" aria-label="Chakra UI" role="img" />,
  "Ant Design": <SiAntdesign title="Ant Design" aria-label="Ant Design" role="img" />,
  "Radix UI": <SiRadixui title="Radix UI" aria-label="Radix UI" role="img" />,
  "React Router": <SiReactrouter title="React Router" aria-label="React Router" role="img" />,
  "Socket.io": <SiSocketdotio title="Socket.io" aria-label="Socket.io" role="img" />,
  Prisma: <SiPrisma title="Prisma" aria-label="Prisma" role="img" />,
  Drizzle: <SiDrizzle title="Drizzle" aria-label="Drizzle" role="img" />,
  Sass: <SiSass title="Sass" aria-label="Sass" role="img" />,
  Webpack: <SiWebpack title="Webpack" aria-label="Webpack" role="img" />,
  Turborepo: <SiTurborepo title="Turborepo" aria-label="Turborepo" role="img" />,
  Zustand: <span title="Zustand" aria-label="Zustand" role="img" style={{ fontSize: "1.25em", lineHeight: 1 }}>🐻</span>,
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
  // New Skill Aliases
  jest: "Jest",
  canva: "Canva",
  vercel: "Vercel",
  netlify: "Netlify",
  framermotion: "Framer Motion",
  framer: "Framer Motion",
  gsap: "GSAP",
  vuex: "Vuex",
  axios: "Axios",
  grpc: "gRPC",
  reactquery: "React Query",
  tanstackquery: "TanStack Query",
  shadcnui: "shadcn/ui",
  shadcn: "shadcn/ui",
  materialui: "Material UI",
  mui: "Material UI",
  styledcomponents: "Styled Components",
  chakraui: "Chakra UI",
  chakra: "Chakra UI",
  antdesign: "Ant Design",
  antd: "Ant Design",
  radixui: "Radix UI",
  radix: "Radix UI",
  reactrouter: "React Router",
  socketio: "Socket.io",
  socket: "Socket.io",
  prisma: "Prisma",
  drizzle: "Drizzle",
  sass: "Sass",
  scss: "Sass",
  webpack: "Webpack",
  turborepo: "Turborepo",
  zustand: "Zustand",
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
