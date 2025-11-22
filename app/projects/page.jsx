import ProjectsClient from "@/components/client/ProjectsClient";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";

// Server-side data fetching - Direct DB query (no API call)
async function getProjects() {
  try {
    await connectDB();
    const projects = await Project.find({})
      .select("_id title desc image tag demo preview tech_stack featured order")
      .sort({ order: 1, createdAt: -1 })
      .lean()
      .exec();
    return projects;
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [];
  }
}

export default async function Projects() {
  const projects = await getProjects();

  return <ProjectsClient projects={projects} />;
}
