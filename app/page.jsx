import { connectDB } from "@/lib/db";
import { About } from "@/lib/models/About";
import HomeClient from "./HomeClient";

export default async function Page() {
  try {
    await connectDB();
    const aboutData = await About.findOne().lean();
    
    return (
      <HomeClient 
        initialCvLink={aboutData?.cvLink || ""} 
        initialCvLinkEnglish={aboutData?.cvLinkEnglish || ""} 
      />
    );
  } catch (error) {
    console.error("Error fetching initial CV data:", error);
    return <HomeClient />;
  }
}
