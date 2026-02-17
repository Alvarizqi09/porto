import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard"; // component lama kamu

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Jika tidak ada session, redirect ke login
  if (!session) {
    redirect("/admin/login");
  }

  // Jika session valid, render component
  return <AdminDashboard />;
}
