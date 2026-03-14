import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Recommendation } from "@/lib/models/Recommendation";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    // Clear existing for a fresh re-seed
    await Recommendation.deleteMany({});

    const recommendations = [
      {
        name: "Adhi Pamungkas Wijayadi",
        role: {
          en: "Full-Stack Web Developer | Computer Science Fresh Graduate | Proficient in JavaScript Front-End Ecosystem",
          id: "Full-Stack Web Developer | Computer Science Fresh Graduate | Proficient in JavaScript Front-End Ecosystem",
        },
        date: {
          en: "August 31, 2024",
          id: "31 Agustus 2024",
        },
        text: {
          en: "I had the pleasure of working with Alva Rizqi during the Certified Internship Program (MSIB) Batch 6 at Telkom Indonesia, where we both served as Front-End Developers. Alva consistently demonstrated exceptional technical skills, particularly in JavaScript, React, and other front-end technologies. His ability to approach complex problems with creativity and precision was truly impressive.",
          id: "Saya senang bisa bekerja sama dengan Alva Rizqi selama Magang Bersertifikat (MSIB) Batch 6 di Telkom Indonesia, di mana kami berdua bertugas sebagai Front-End Developer. Alva secara konsisten menunjukkan kemampuan teknis yang luar biasa, khususnya di JavaScript, React, dan teknologi front-end lainnya. Kemampuannya memecahkan masalah kompleks dengan kreativitas dan presisi sangat mengesankan.",
        },
        image: "https://ui-avatars.com/api/?name=Adhi+Pamungkas+Wijayadi&background=random&color=fff",
        order: 1,
      },
      {
        name: "Josh Samuel Dumanauw",
        role: {
          en: "Retention Business Analyst at Astra Credit Companies (ACC)",
          id: "Retention Business Analyst at Astra Credit Companies (ACC)",
        },
        date: {
          en: "July 8, 2024",
          id: "8 Juli 2024",
        },
        text: {
          en: "High-performing and proactive, yet low-maintenance—these qualities perfectly describe Alvarizqi in both his professional and personal life. Technically, he's a quick learner, and I can confidently say you won’t have to worry about his ability to bring any idea to life. Communication with Alvarizqi is always a pleasure; I enjoy our professional discussions as well as our chats outside of office hours. While he may not be the most dominant presence, Alvarizqi’s management skills are impressive. Overall, I am deeply honored to have worked with Alvarizqi and to call him a good friend. I would highly recommend him time and again. Fly higher, Mas Alva!",
          id: "Berkinerja tinggi dan proaktif, namun low-maintenance—kualitas inilah yang secara sempurna mendeskripsikan Alvarizqi di kehidupan profesional maupun personalnya. Secara teknis, dia cepat belajar, dan saya sangat yakin Anda tak perlu khawatir dengan kemampuannya mewujudkan ide. Berkomunikasi dengan Alvarizqi selalu menyenangkan; saya menikmati diskusi profesional maupun santai di luar jam kerja dengannya. Meskipun ia mungkin tak terlalu mendominasi, kemampuan manajemen Alvarizqi sangat berkesan. Secara keseluruhan, saya sangat bangga pernah bekerja bersamanya dan menganggapnya teman baik. Saya dengan tulus merekomendasikannya. Terbanglah lebih tinggi, Mas Alva!",
        },
        image: "https://ui-avatars.com/api/?name=Josh+Samuel+Dumanauw&background=random&color=fff",
        order: 2,
      },
      {
        name: "Afif Rohul Abrori",
        role: {
          en: "Back End Developer at Shelter Indonesia | Facilitator Full-Stack Web Developer at Coding Camp powered by DBMS Foundation",
          id: "Back End Developer at Shelter Indonesia | Facilitator Full-Stack Web Developer at Coding Camp powered by DBMS Foundation",
        },
        date: {
          en: "July 8, 2024",
          id: "8 Juli 2024",
        },
        text: {
          en: "Alva has flexible skills as a developer, especially as a front-end web developer. During his time as my intern partner, he was given tasks and has a good ability to complete these tasks. He can also manage several projects at the same time. Alva has the ability to be a front-end web developer, such as mastering the react and next js frameworks. As a developer, Alva also has good communication skills that allow him to work with many people on a particular project.",
          id: "Alva memiliki keterampilan yang fleksibel sebagai developer, terutama sebagai front-end web developer. Selama menjadi rekan magang saya, ia diberikan tugas dan memiliki kemampuan yang baik untuk menyelesaikannya. Ia juga dapat mengelola beberapa proyek pada saat yang bersamaan. Alva memiliki kemampuan menjadi front-end web developer, seperti menguasai framework React dan Next.js. Sebagai developer, Alva juga memiliki kemampuan komunikasi yang baik yang memungkinkannya bekerja dengan banyak orang dalam proyek tertentu.",
        },
        image: "https://ui-avatars.com/api/?name=Afif+Rohul+Abrori&background=random&color=fff",
        order: 3,
      },
      {
        name: "Muhammad Fairus",
        role: {
          en: "Web Developer | Cloud Computing Bangkit Distinction Graduate | ex-Frontend developer at Telkom Indonesia",
          id: "Web Developer | Cloud Computing Bangkit Distinction Graduate | ex-Frontend developer at Telkom Indonesia",
        },
        date: {
          en: "July 7, 2024",
          id: "7 Juli 2024",
        },
        text: {
          en: "Alvarizqi showcased a profound grasp of front-end technologies and best practices. His skill in transforming design ideas into functional and visually appealing web pages was remarkable. He consistently produced high-quality work, ensuring our project met all design and functionality standards. Additionally, Alvarizqi was highly adaptable during our collaboration, managing professional discussions effectively whenever we faced confusion. His vast knowledge was clear in his prompt task completion and his clear problem-solving explanations. Furthermore, Alvarizqi finished tasks swiftly and communicated exceptionally well.",
          id: "Alvarizqi menunjukkan pemahaman mendalam tentang teknologi front-end dan best practices. Keterampilannya dalam mengubah ide desain menjadi halaman web yang fungsional dan menarik secara visual sungguh luar biasa. Ia konsisten menghasilkan pekerjaan berkualitas tinggi, memastikan proyek kami memenuhi semua standar desain dan fungsionalitas. Selain itu, Alvarizqi sangat adaptif selama kolaborasi kami, mengelola diskusi profesional dengan efektif setiap kali kami menemui kebingungan. Pengetahuannya yang luas terlihat jelas dari penyelesaian tugasnya yang cepat dan penjelasannya yang jelas dalam pemecahan masalah. Selain itu, ia menyelesaikan tugas dengan sigap dan berkomunikasi dengan sangat baik.",
        },
        image: "https://ui-avatars.com/api/?name=Muhammad+Fairus&background=random&color=fff",
        order: 4,
      },
      {
        name: "Nadhila Shafaresta",
        role: {
          en: "Junior Mobile Engineer at Jakmall | BNSP Certified Software Engineer | ex-Front End Mobile Developer Intern @ Telkom Indonesia",
          id: "Junior Mobile Engineer at Jakmall | BNSP Certified Software Engineer | ex-Front End Mobile Developer Intern @ Telkom Indonesia",
        },
        date: {
          en: "July 2, 2024",
          id: "2 Juli 2024",
        },
        text: {
          en: "During our internship at Telkom Indonesia, although I worked on a different project, I had the opportunity to interact and collaborate with Alvarizqi, a highly skilled and dedicated Frontend Developer intern. He was part of the Shared Services team and demonstrated exceptional proficiency in JavaScript, React, and Next.js. Alvarizqi consistently impressed everyone with his ability to tackle complex frontend challenges and deliver high-quality solutions...",
          id: "Selama masa magang kami di Telkom Indonesia, meskipun saya bekerja di proyek yang berbeda, saya berkesempatan untuk berinteraksi dan berkolaborasi dengan Alvarizqi, intern Frontend Developer yang sangat terampil dan berdedikasi. Dia tergabung dalam tim Shared Services dan menunjukkan kemahiran luar biasa dalam JavaScript, React, dan Next.js. Alvarizqi selalu membuat semua orang terkesan dengan kemampuannya menghadapi tantangan frontend yang kompleks...",
        },
        // Cut short due to length to fit well, leaving the core message
        image: "https://ui-avatars.com/api/?name=Nadhila+Shafaresta&background=random&color=fff",
        order: 5,
      },
      {
        name: "Irfan Hanif Habibi",
        role: {
          en: "Fullstack Developer | Backend Developer",
          id: "Fullstack Developer | Backend Developer",
        },
        date: {
          en: "July 1, 2024",
          id: "1 Juli 2024",
        },
        text: {
          en: "I had the opportunity to work with Alva during our internship at Telkom Indonesia, where we collaborated on projects such as Ideabox BNI, Ideabox Mandiri, and AMD Mandiri. Alva is a skilled developer, particularly knowledgeable in Javascript, React, and Next.js. His deep understanding of front-end development and integration, combined with his excellent communication skills, ensured smooth and efficient project progression. Moreover, Alva is incredibly approachable and easy to discuss ideas with.",
          id: "Saya berkesempatan bekerja dengan Alva selama masa magang di Telkom Indonesia, di mana kami berkolaborasi pada proyek-proyek seperti Ideabox BNI, Ideabox Mandiri, dan AMD Mandiri. Alva adalah developer yang terampil, berpengetahuan luas terutama di JavaScript, React, dan Next.js. Pemahamannya yang mendalam tentang pengembangan dan integrasi front-end, dipadukan dengan keterampilan komunikasinya yang sangat baik, memastikan progres proyek berjalan lancar dan efisien. Selain itu, Alva sangat ramah dan mudah diajak berdiskusi tentang ide-ide.",
        },
        image: "https://ui-avatars.com/api/?name=Irfan+Hanif+Habibi&background=random&color=fff",
        order: 6,
      },
      {
        name: "Muhammad Satria Rajendra",
        role: {
          en: "Full Stack Developer at Acuity | Certified Senior Programmer BNSP",
          id: "Full Stack Developer at Acuity | Certified Senior Programmer BNSP",
        },
        date: {
          en: "June 30, 2024",
          id: "30 Juni 2024",
        },
        text: {
          en: "I had the pleasure of working with Alvarizqi, a front-end web developer on the shared service team at PT Telkom Indonesia. Alvarizqi played a pivotal role in several projects, including Ideabox Mandiri and Ideabox BNI, where his expertise and dedication were clearly evident. Alvarizqi demonstrated exceptional proficiency in front-end development. His ability to create user-friendly, responsive, and visually appealing interfaces significantly contributed to the success of our projects.",
          id: "Saya senang bisa bekerja sama dengan Alvarizqi, front-end web developer di tim shared service PT Telkom Indonesia. Alvarizqi memainkan peran penting dalam beberapa proyek, termasuk Ideabox Mandiri dan Ideabox BNI, di mana keahlian dan dedikasinya terlihat jelas. Alvarizqi menunjukkan kemahiran luar biasa dalam pengembangan front-end. Kemampuannya membuat antarmuka yang ramah pengguna, responsif, dan menarik secara visual berkontribusi secara signifikan pada kesuksesan proyek-proyek kami.",
        },
        image: "https://ui-avatars.com/api/?name=Muhammad+Satria+Rajendra&background=random&color=fff",
        order: 7,
      },
      {
        name: "Faris Faikar Razannafi",
        role: {
          en: "Full Stack Engineer | Laravel, Next.js",
          id: "Full Stack Engineer | Laravel, Next.js",
        },
        date: {
          en: "June 30, 2024",
          id: "30 Juni 2024",
        },
        text: {
          en: "I had the pleasure of working alongside Alva at Telkom, where his front-end web engineer expertise was outstanding. Alva's proficiency in jQuery and React was instrumental in delivering high-quality, user-friendly web applications. Beyond his technical skills, Alva excels as a communicator, fostering a collaborative and positive team environment. Alva's knack for bringing the team together, encouraging open dialogue, and ensuring everyone felt heard and valued was invaluable.",
          id: "Saya merasa senang bisa bekerja bersama Alva di Telkom, kompentensinya sebagai front-end web engineer sangat luar biasa. Kemahiran Alva di jQuery dan React sangat berperan penting dalam memberikan aplikasi web yang berkualitas tinggi dan ramah pengguna. Di luar kemampuan teknisnya, Alva adalah seorang komunikator yang unggul, membangun lingkungan tim yang kolaboratif dan positif. Kemampuan Alva untuk menyatukan tim, mendorong dialog terbuka, dan memastikan semua orang merasa didengar sangatlah berharga.",
        },
        image: "https://ui-avatars.com/api/?name=Faris+Faikar+Razannafi&background=random&color=fff",
        order: 8,
      },
      {
        name: "Johanes Alberto Siahaan",
        role: {
          en: "Software Engineer @ LG Sinar Mas | Ex Tetherfi Singapore | Ex Telkom Indonesia | 350+ Problems on Leetcode",
          id: "Software Engineer @ LG Sinar Mas | Ex Tetherfi Singapore | Ex Telkom Indonesia | 350+ Problems on Leetcode",
        },
        date: {
          en: "June 27, 2024",
          id: "27 Juni 2024",
        },
        text: {
          en: "I highly recommend Alvarizqi. He is a talented frontend web developer at Telkom, where he has successfully contributed to numerous projects. Alvarizqi consistently delivers exceptional results, demonstrating his strong commitment to quality and professionalism. His ability to complete projects efficiently and with great outcomes is truly impressive, making him a valuable asset to any team. If you're looking for a dedicated and skilled frontend developer, Alvarizqi would be an excellent choice to consider.",
          id: "Saya sangat merekomendasikan Alvarizqi. Dia adalah web developer frontend yang berbakat di Telkom, tempat ia berhasil berkontribusi pada berbagai proyek. Alvarizqi secara konsisten memberikan hasil yang luar biasa, menunjukkan komitmennya yang kuat pada kualitas dan profesionalisme. Kemampuannya menyelesaikan proyek dengan efisien dan hasil yang bagus sungguh mengesankan, menjadikannya aset berharga bagi tim mana pun. Jika Anda mencari frontend developer yang berdedikasi dan terampil, Alvarizqi adalah pilihan yang tepat.",
        },
        image: "https://ui-avatars.com/api/?name=Johanes+Alberto+Siahaan&background=random&color=fff",
        order: 9,
      }
    ];

    await Recommendation.insertMany(recommendations);

    return NextResponse.json({
      success: true,
      message: `Seeded ${recommendations.length} LinkedIn recommendations successfully! You can now delete app/api/seed-recommendations/route.js`,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
