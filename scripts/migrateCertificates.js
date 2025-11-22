import mongoose from "mongoose";
import { Certificate } from "../lib/models/About.js";
import { connectDB } from "../lib/db.js";

const certificateData = {
  title: "My Certificates",
  description: "Professional certifications and training programs",
  items: [
    {
      name: "MySkill UI/UX Research & Design",
      publisher: "MySkill",
      date: "2023",
      order: 0,
    },
    {
      name: "Belajar membuat Front-End Web untuk Pemula",
      publisher: "Dicoding",
      date: "2023",
      order: 1,
    },
    {
      name: "Belajar Membuat Aplikasi Web dengan React",
      publisher: "Dicoding",
      date: "2023",
      order: 2,
    },
    {
      name: "HTML",
      publisher: "MySkill Front End",
      date: "2023",
      order: 3,
    },
    {
      name: "Belajar membuat Git dengan Github",
      publisher: "Dicoding",
      date: "2023",
      order: 4,
    },
    {
      name: "React",
      publisher: "MySkill Front End",
      date: "2023",
      order: 5,
    },
    {
      name: "Belajar Dasar Pemrograman Web",
      publisher: "Dicoding",
      date: "2023",
      order: 6,
    },
    {
      name: "Belajar Dasar Pemrograman Javascript",
      publisher: "Dicoding",
      date: "2023",
      order: 7,
    },
    {
      name: "Java Fundamental",
      publisher: "Oracle",
      date: "2023",
      order: 8,
    },
    {
      name: "Pelatihan Kepemimpinan dan Manajemen Mahasiswa Tingkat Jurusan",
      publisher: "HIMA ILKOM UNNES",
      date: "2021",
      order: 9,
    },
    {
      name: "Pelatihan Kepemimpinan dan Manajemen Mahasiswa Tingkat Dasar UNNES",
      publisher: "BEM FMIPA",
      date: "2021",
      order: 10,
    },
    {
      name: "HTML & CSS",
      publisher: "Progate",
      date: "2021",
      order: 11,
    },
    {
      name: "Sertifikat Kepanitiaan",
      publisher: "PKKMB FMIPA UNNES 2022",
      date: "2022",
      order: 12,
    },
    {
      name: "Sertifikat Kepengurusan",
      publisher: "BEM FMIPA UNNES 2022",
      date: "2022",
      order: 13,
    },
    {
      name: "MSIB Batch 5",
      publisher: "Alterra Academy",
      date: "2023",
      order: 14,
    },
    {
      name: "MSIB Batch 6",
      publisher: "Telkom Indonesia",
      date: "2024",
      order: 15,
    },
  ],
};

async function migrateCertificates() {
  try {
    await connectDB();
    console.log("Connected to database");

    // Delete existing certificates
    await Certificate.deleteMany({});
    console.log("Cleared existing certificates");

    // Insert new certificates
    const result = await Certificate.create(certificateData);
    console.log("✅ Certificates migrated successfully!");
    console.log(`Total certificates inserted: ${result.items.length}`);
    console.log("\nCertificates:");
    result.items.forEach((cert, idx) => {
      console.log(
        `${idx + 1}. ${cert.name} - ${cert.publisher} (${cert.date})`
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrateCertificates();
