import mongoose from "mongoose";
import { About, Resume, Education, Skill } from "../lib/models/About.js";
import dotenv from "dotenv";
dotenv.config();

// --- HARDCODED DATA FROM OLD about/page.jsx ---
const aboutData = {
  title: "About Me",
  description:
    "Hi, I`m Alvarizqi! I specialize in wireframing, prototyping, and have hands-on experience with HTML, CSS, JavaScript, and graphic design tools like Canva and Corel Draw. Right now, I`m deepening my skills in Next.js and Laravel. As a creative problem solver, Im passionate about turning innovative ideas into user-centric designs. Let`s collaborate and make great things happen!",
  info: [
    { fieldName: "Name", fieldValue: "Alvarizqi" },
    { fieldName: "Phone", fieldValue: "(+62) 8132 7963 181" },
    { fieldName: "Email", fieldValue: "Alvarizqi80@gmail.com" },
    { fieldName: "Instagram", fieldValue: "@Alvarizqi__" },
    { fieldName: "Location", fieldValue: "Semarang,Indonesia" },
  ],
};

const resumeData = {
  title: "Experience",
  description:
    " I have worked on several personal projects, including a portfolio website and a blog. I am always looking for new opportunities to learn and grow as a designer and developer.",
  items: [
    {
      company: "Telkom Indonesia",
      date: "Feb 2024 - Jun 2024",
      position: "Front-end Web Developer Intern",
    },
    {
      company: "Alterra Academy",
      date: "Aug 2023 - Dec 2023",
      position: "Students in Alterra Academy",
    },
    {
      company: "BEM FMIPA 2022",
      date: "Feb 2022 - Dec 2022",
      position: "Staff of Information and Media Division",
    },
    {
      company: "SKETSA FMIPA 2023",
      date: "Mar 2023 - Dec 2023",
      position: "Head of Relation and Media Division",
    },
  ],
};

const educationData = {
  title: "My Education",
  description:
    "I am currently pursuing a Bachelor's degree in Computer Science at Universitas Negeri Semarang. I have completed several courses in UI/UX design, front-end development, and web development. I am passionate about learning and always looking for new opportunities to expand my knowledge and skills.",
  items: [
    {
      school: "Universitas Negeri Semarang",
      date: "2021 - Present",
      degree: "Bachelor's Degree in Computer Science",
    },
    {
      school: "SMAN 1 Ajibarang",
      date: "2018 - 2021",
      degree: "High School",
    },
  ],
};

const skillData = {
  title: "My Skills",
  description:
    "I have experience working with a variety of tools and technologies. Here are some of the skills that I have developed over the years:",
  skillList: [
    { name: "HTML" },
    { name: "CSS" },
    { name: "JavaScript" },
    { name: "TypeScript" },
    { name: "React" },
    { name: "Vue.js" },
    { name: "Tailwind CSS" },
    { name: "Bootstrap" },
    { name: "Next.js" },
    { name: "Laravel" },
    { name: "Figma" },
    { name: "Canva" },
    { name: "Corel Draw" },
    { name: "Supabase" },
    { name: "Firebase" },
    { name: "Mongodb" },
    { name: "Github" },
    { name: "Gitlab" },
    { name: "Bitbucket" },
    { name: "Jira" },
    { name: "Trello" },
  ],
};

async function migrate() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");

  await About.findOneAndUpdate({}, aboutData, { upsert: true, new: true });
  await Resume.findOneAndUpdate({}, resumeData, { upsert: true, new: true });
  await Education.findOneAndUpdate({}, educationData, {
    upsert: true,
    new: true,
  });
  await Skill.findOneAndUpdate({}, skillData, { upsert: true, new: true });

  console.log("About data migrated!");
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
