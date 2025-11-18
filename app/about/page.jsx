import AboutClient from "@/components/AboutClient";

// Server-side data fetching
async function getAboutData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/about`, {
      next: { revalidate: 600 }, // Revalidate every 10 minutes
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || "Failed to fetch about data");
    }

    return result.data;
  } catch (err) {
    console.error("Error fetching about data:", err);
    return null;
  }
}

export default async function About() {
  const aboutData = await getAboutData();

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading About Data</h2>
          <p>Failed to load about data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return <AboutClient aboutData={aboutData} />;
}
