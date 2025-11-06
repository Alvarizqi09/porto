"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const StackitDetail = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="py-12 bg-primary"
    >
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn}
          className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="relative h-80 w-full">
            <Image
              src="/assets/stackit.png"
              alt="Stackit Project"
              layout="fill"
              objectFit="cover"
              className="rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <motion.h1
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-6xl font-extrabold text-white tracking-wider"
              >
                Stackit
              </motion.h1>
            </div>
          </div>
          <div className="p-8 md:p-12">
            <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-accent mb-4">
                  About the Project
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Stackit is a web application that helps users manage financial
                  portfolios by providing real-time data visualization and
                  analytics. It is designed for both individual investors and
                  financial professionals to track investments and make informed
                  decisions.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-accent mb-4">
                  Technologies Used
                </h2>
                <motion.div variants={fadeIn} className="flex flex-wrap gap-3">
                  {[
                    "Express.js",
                    "React",
                    "Tailwind CSS",
                    "MongoDB",
                    "Node.js",
                  ].map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="bg-accent/10 text-accent px-4 py-2 rounded-full text-md font-semibold"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
            <motion.div variants={fadeIn} className="text-center mt-12">
              <Link href="https://letsstack-it.vercel.app/" passHref>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent-hover text-white"
                  >
                    Visit Website
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default StackitDetail;
