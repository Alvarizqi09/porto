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
    <div className="min-h-screen bg-gradient-to-br from-primary via-white to-accent/10">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
            <p className="text-gray-600">
              Selamat datang, {session?.user?.name}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Projects Card */}
          <Link href="/admin/projects">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <FiFileText className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-black">Projects</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Kelola semua project portfolio Anda. Tambah, edit, atau hapus
                project dengan mudah.
              </p>
              <div className="flex items-center text-accent font-semibold">
                Manage Projects →
              </div>
            </motion.div>
          </Link>

          {/* About Card*/}
          <Link href="/admin/about">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <FiSettings className="w-8 h-8 text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-black">About</h2>
              </div>
              <p className="text-accent mb-4">
                Atur informasi tentang diri Anda yang akan ditampilkan di
                halaman About.
              </p>
              <div className="flex items-center text-accent font-semibold">
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
          className="mt-12 bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-xl font-bold text-black mb-4">Info Penting</h3>
          <ul className="space-y-2 text-gray-600">
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
