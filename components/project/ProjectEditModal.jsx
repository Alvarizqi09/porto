"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectForm from "@/components/project/ProjectForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function ProjectEditModal({
  isOpen,
  onClose,
  project,
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
            Edit Project
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            Update project details and save changes
          </SheetDescription>
        </SheetHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          {project && (
            <ProjectForm
              onSubmit={onSubmit}
              isLoading={isLoading}
              initialData={project}
            />
          )}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
