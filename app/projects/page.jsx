import ProjectsClient from "@/components/client/ProjectsClient";

// Server-side data fetching
async function getProjects() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/projects`, {
      next: { revalidate: 0 }, // No cache - revalidate on every request
      cache: "no-store", // Disable cache completely
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
