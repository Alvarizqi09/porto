"use client";

import { motion } from "framer-motion";
import ProjectForm from "@/components/project/ProjectForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function ProjectAddModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-black">
            Tambah Project Baru
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            Isi data project baru dan simpan
          </SheetDescription>
        </SheetHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <ProjectForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            initialData={null}
          />
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
