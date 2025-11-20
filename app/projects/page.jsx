import ProjectsClient from "@/components/client/ProjectsClient";

// Server-side data fetching
async function getProjects() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/projects`, {
      next: { revalidate: 25 }, // Cache for 25 seconds, then revalidate
      cache: "force-cache", // Use cached version when available
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || "Failed to fetch projects");
    }

    return result.data;
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [];
  }
}

export default async function Projects() {
  const projects = await getProjects();

  return <ProjectsClient projects={projects} />;
}
