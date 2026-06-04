"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau password salah");
      } else if (result?.ok) {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border-4 border-foreground rounded-md shadow-neobrutal-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <div className="w-24 h-2 bg-primary border-2 border-foreground mx-auto mb-3" />
            <p className="text-foreground/80 font-medium">Masuk untuk mengelola project</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-100 border-3 border-foreground text-red-800 rounded-md font-bold shadow-[2px_2px_0px_0px_var(--border)]"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-foreground mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@alva.com"
                className="w-full px-4 py-2 border-3 border-foreground rounded-md bg-background focus:outline-none focus:shadow-neobrutal transition-all duration-150 text-foreground placeholder:text-foreground/50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-foreground mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border-3 border-foreground rounded-md bg-background focus:outline-none focus:shadow-neobrutal transition-all duration-150 text-foreground placeholder:text-foreground/50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-white font-bold py-2.5 px-4 rounded-md border-3 border-foreground shadow-neobrutal hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-neobrutal-hover active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all duration-150 disabled:bg-muted disabled:text-foreground/45 disabled:pointer-events-none"
            >
              {isLoading ? "Loading..." : "Masuk"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-muted border-3 border-foreground rounded-md text-foreground">
            <p className="text-sm text-foreground/80 font-medium leading-relaxed">
              <span className="font-extrabold block mb-1">Demo Credentials:</span>
              Email: admin@alva.com
              <br />
              Password: qwerty123
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AdminLogin;
