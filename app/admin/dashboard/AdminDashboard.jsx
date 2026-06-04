"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiLogOut, FiFileText, FiSettings } from "react-icons/fi";

const AdminDashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card border-b-4 border-foreground shadow-[0_4px_0_0_rgba(28,41,60,0.05)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">Admin Dashboard</h1>
            <p className="text-foreground/75 font-medium mt-1">
              Selamat datang, {session?.user?.name}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md border-3 border-foreground shadow-[2.5px_2.5px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3.5px_3.5px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-150"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Projects Card */}
          <Link href="/admin/projects">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card rounded-md border-4 border-foreground shadow-neobrutal-card p-8 cursor-pointer hover:shadow-neobrutal-card-hover transition-all duration-150 h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary border-3 border-foreground p-4 rounded-md shadow-[2px_2px_0px_0px_var(--border)] text-foreground">
                  <FiFileText className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-extrabold text-foreground">Projects</h2>
              </div>
              <p className="text-foreground/75 font-medium mb-4 leading-relaxed">
                Kelola semua project portfolio Anda. Tambah, edit, atau hapus
                project dengan mudah.
              </p>
              <div className="flex items-center text-accent font-extrabold">
                Manage Projects →
              </div>
            </motion.div>
          </Link>

          {/* About Card*/}
          <Link href="/admin/about">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card rounded-md border-4 border-foreground shadow-neobrutal-card p-8 cursor-pointer hover:shadow-neobrutal-card-hover transition-all duration-150 h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary border-3 border-foreground p-4 rounded-md shadow-[2px_2px_0px_0px_var(--border)] text-foreground">
                  <FiSettings className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-extrabold text-foreground">About</h2>
              </div>
              <p className="text-foreground/75 font-medium mb-4 leading-relaxed">
                Atur informasi tentang diri Anda yang akan ditampilkan di
                halaman About.
              </p>
              <div className="flex items-center text-accent font-extrabold">
                Manage About →
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-card rounded-md border-4 border-foreground shadow-neobrutal-card p-8"
        >
          <h3 className="text-xl font-extrabold text-foreground mb-4">Info Penting</h3>
          <ul className="space-y-2 text-foreground/80 font-medium">
            <li>
              • Data project akan langsung tersinkronisasi dengan halaman
              Projects setelah menambah atau mengubah
            </li>
            <li>
              • Gambar akan di-upload otomatis ke Cloudinary saat Anda klik
              tombol "Upload"
            </li>
            <li>
              • Anda dapat memilih multiple tags dan tech stack untuk setiap
              project
            </li>
            <li>
              • Featured project akan muncul lebih prioritas di halaman utama
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
