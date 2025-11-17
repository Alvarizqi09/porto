// ============================================
// FILE: scripts/seed.js
// Run: node scripts/seed.js
// ============================================

const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env" });

const projectsData = [
  {
    image: "/assets/vilume.jpg",
    title: "Vilume",
    tag: ["All", "Web"],
    desc: "VILUME is a website created to fulfill the tasks of the Alterra Academy mini-project. This website was created with ReactJS+Vite and also styled using Tailwind. There is also Firebase integration for login and OpenAi for Customer Services",
    demo: "detail/Vilume",
    preview: "https://vilume.vercel.app",
    tech_stack: ["Vite", "React", "Tailwind"],
    featured: true,
    order: 1,
  },
  {
    image: "/assets/indra.jpg",
    title: "Company Profile - CVINDRADEWANTI",
    tag: ["All", "Web"],
    desc: "Company Profile Website for CVINDRADEWANTI, a company engaged in the field of construction services. This website was created with ReactJS and TailwindCSS then deployed with Vercel",
    preview: "https://cvindradewanti.com",
    demo: "detail/Cvindradewanti",
    tech_stack: ["ReactJS", "Tailwind", "Typescript", "Vite"],
    featured: false,
    order: 2,
  },
  {
    image: "/assets/farmasi.jpg",
    title: "Rosati Farmasi",
    tag: ["All", "Web"],
    desc: "Rosati Pharmacy is a website created for the final project of a software engineering course. This website was created with Laravel and Bootstrap then deployed with Digital Ocean",
    demo: "detail/Rosati",
    preview: "http://rosatifarmasi.me",
    tech_stack: ["Laravel", "PHP"],
    featured: false,
    order: 3,
  },
  {
    image: "/assets/Qbills.jpg",
    title: "QBILLS POS APP",
    tag: ["All", "Web"],
    desc: "QBILLS is a Point of Sale application that I created for the final project of the Alterra Academy MSIB Batch 5 Programs. This website was created with NextJS and TailwindCSS then deployed with Vercel",
    demo: "https://qbills.vercel.app/",
    preview: "https://qbills.vercel.app/",
    tech_stack: ["Next", "Tailwind"],
    featured: true,
    order: 4,
  },
  {
    image: "/assets/TechAnn.jpg",
    title: "TechAnn",
    tag: ["All", "Web"],
    desc: "An online shop website that has a simple CRUD project feature made with Vue3 and uses Vue-router for page routing, the first project for practicing using the VueJS Framework.",
    demo: "https://tech-ann.vercel.app/",
    preview: "https://tech-ann.vercel.app/",
    tech_stack: ["Vue", "Tailwind"],
    featured: false,
    order: 5,
  },
  {
    image: "/assets/AmdMandiri.jpg",
    title: "AMD Mandiri(MixPitch)",
    tag: ["All", "Web"],
    desc: "Developing and deploying 20+ new features with superior monitoring & evaluation (monev) features in 2 of the 5 top banks in Indonesia, namely BNI (Bank Negara Indonesia) and Bank Mandiri.",
    demo: "https://mandiri.ideaboxapp.com/",
    preview: "https://mandiri.ideaboxapp.com/",
    tech_stack: ["CI4", "Bootstrap"],
    featured: false,
    order: 6,
  },
  {
    image: "/assets/BNI.jpg",
    title: "Ideabox BNI",
    tag: ["All", "Web"],
    desc: "Developing and deploying 20+ new features with superior monitoring & evaluation (monev) features in 2 of the 5 top banks in Indonesia, namely BNI (Bank Negara Indonesia) and Bank Mandiri.",
    demo: "https://bni.ideaboxapp.com",
    preview: "https://bni.ideaboxapp.com",
    tech_stack: ["CI4", "Bootstrap"],
    featured: false,
    order: 7,
  },
  {
    image: "/assets/Kliq.jpg",
    title: "Kliq Chat Prototype",
    tag: ["All", "Design"],
    desc: "Prototype and design of Kliq Chat Application",
    demo: "https://www.figma.com/proto/vdG44rI7YvM4ulDvRyYHL4/Untitled?node-id=32-319&scaling=scale-down&page-id=0%3A1&starting-point-node-id=0%3A3&t=g6ZzcObxLkLOHk5S-1",
    preview:
      "https://www.figma.com/proto/vdG44rI7YvM4ulDvRyYHL4/Untitled?node-id=32-319&scaling=scale-down&page-id=0%3A1&starting-point-node-id=0%3A3&t=g6ZzcObxLkLOHk5S-1",
    tech_stack: ["Figma"],
    featured: false,
    order: 8,
  },
  {
    image: "/assets/farmasi.jpg",
    title: "Rosati Prototype",
    tag: ["All", "Design"],
    desc: "Prototype and design of Rosati Farmasi Website",
    demo: "https://www.figma.com/proto/MQApVvVWRme1DlK8eMuPsR/Farmasi?node-id=367-5293&t=WVgwxU8QO2YzmKe1-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A3&starting-point-node-id=357%3A1592",
    preview:
      "https://www.figma.com/proto/MQApVvVWRme1DlK8eMuPsR/Farmasi?node-id=367-5293&t=WVgwxU8QO2YzmKe1-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A3&starting-point-node-id=357%3A1592",
    tech_stack: ["Figma"],
    featured: false,
    order: 9,
  },
  {
    image: "/assets/Alterra.jpg",
    title: "Alterra Submission",
    tag: ["All", "Web"],
    desc: "Alterra Submission is one of the tasks from Alterra Academy which is required by several criteria. I created this website with ReactJS + Vite with bootstrap styling. It contains CRUD to add products and is also integrated with OpenAi",
    demo: "detail/Alterra",
    preview: "https://react-ai-nu.ver",
    tech_stack: ["Vite", "React", "Bootstrap"],
    featured: false,
    order: 10,
  },
  {
    image: "/assets/Apshort.jpg",
    title: "Apshort",
    tag: ["All", "Web"],
    desc: "APShort is a fullstack website with simple mission: to create the most reliable, secure, and user-friendly URL shortening service on the market.",
    demo: "detail/Apshort",
    preview: "https://apshort.vercel.app/",
    tech_stack: ["Vite", "React", "Supabase", "Tailwind"],
    featured: false,
    order: 11,
  },
  {
    image: "/assets/stackit.png",
    title: "Stackit",
    tag: ["All", "Web"],
    desc: "Stackit is a fullstack web application built with MERN technology that helps users manage financial portfolios by providing real-time data visualization and analytics. It is designed for both individual investors and financial professionals to track investments and make informed decisions.",
    demo: "detail/Stackit",
    preview: "https://letsstack-it.vercel.app/",
    tech_stack: ["Node.js", "React", "MongoDB", "Tailwind", "Express"],
    featured: true,
    order: 12,
  },
];

async function seedDatabase() {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    console.error("❌ MONGO_URL not found in .env.local");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    console.log("🔄 Connecting to MongoDB...");
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("portfolio");
    const collection = db.collection("projects");

    // Clear existing data
    console.log("🗑️  Clearing existing projects...");
    await collection.deleteMany({});

    // Add timestamps
    const projectsWithTimestamps = projectsData.map((project) => ({
      ...project,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insert new data
    console.log("📥 Inserting projects...");
    const result = await collection.insertMany(projectsWithTimestamps);
    console.log(`✅ Successfully inserted ${result.insertedCount} projects`);

    // Create indexes
    console.log("🔧 Creating indexes...");
    await collection.createIndex({ tag: 1 });
    await collection.createIndex({ featured: 1 });
    await collection.createIndex({ order: 1 });
    await collection.createIndex({ createdAt: -1 });
    console.log("✅ Indexes created");

    // Display summary
    console.log("\n📊 Summary:");
    console.log(`Total projects: ${result.insertedCount}`);
    const webCount = await collection.countDocuments({ tag: "Web" });
    const designCount = await collection.countDocuments({ tag: "Design" });
    const featuredCount = await collection.countDocuments({ featured: true });
    console.log(`Web projects: ${webCount}`);
    console.log(`Design projects: ${designCount}`);
    console.log(`Featured projects: ${featuredCount}`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("\n✅ Database seeding completed!");
    console.log("🚀 You can now run: npm run dev");
  }
}

seedDatabase();
