"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { motion } from "framer-motion";
import { FiUpload, FiX } from "react-icons/fi";

const TECH_STACK_OPTIONS = [
  "Vite",
  "React",
  "ReactJS",
  "Tailwind",
  "Typescript",
  "Laravel",
  "PHP",
  "Next",
  "Vue",
  "CI4",
  "Bootstrap",
  "Figma",
  "Supabase",
  "Firebase",
  "Node.js",
  "MongoDB",
  "Express",
];

const TAG_OPTIONS = ["All", "Web", "Design"];

const ProjectForm = ({ onSubmit, isLoading, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    desc: initialData?.desc || "",
    long_desc: initialData?.long_desc || "",
    image: initialData?.image || "",
    demo: initialData?.demo || "",
    preview: initialData?.preview || "",
    github: initialData?.github || "",
    tag: initialData?.tag || ["All"],
    tech_stack: initialData?.tech_stack || [],
    featured: initialData?.featured || false,
    order: initialData?.order || 0,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) {
      setErrors((prev) => ({
        ...prev,
        image: "Pilih gambar terlebih dahulu",
      }));
      return;
    }

    setUploadingImage(true);
    try {
      const response = await uploadToCloudinary(imageFile);

      // Handle both direct response { url, publicId } and wrapped response { success, url, publicId }
      const imageUrl = response.url || response.data?.url;

      if (!imageUrl) {
        throw new Error("Tidak ada URL yang dikembalikan dari upload");
      }

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
      setImageFile(null);
      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
    } catch (error) {
      console.error("Upload error:", error);
      setErrors((prev) => ({
        ...prev,
        image: error.message,
      }));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleTagChange = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tag: prev.tag.includes(tag)
        ? prev.tag.filter((t) => t !== tag)
        : [...prev.tag, tag],
    }));
  };

  const handleTechStackChange = (tech) => {
    setFormData((prev) => ({
      ...prev,
      tech_stack: prev.tech_stack.includes(tech)
        ? prev.tech_stack.filter((t) => t !== tech)
        : [...prev.tech_stack, tech],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Judul harus diisi";
    if (!formData.desc.trim()) newErrors.desc = "Deskripsi harus diisi";
    if (!formData.image) newErrors.image = "Gambar harus diunggah";
    if (!formData.demo.trim()) newErrors.demo = "URL demo harus diisi";
    if (!formData.preview.trim()) newErrors.preview = "URL preview harus diisi";
    if (formData.tag.length === 0)
      newErrors.tag = "Minimal satu tag harus dipilih";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
    >
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Judul Project
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Nama project"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deskripsi (Max 500 karakter)
        </label>
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          placeholder="Deskripsi singkat project"
          maxLength="500"
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <p className="text-gray-500 text-sm mt-1">{formData.desc.length}/500</p>
        {errors.desc && (
          <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
        )}
      </div>

      {/* Long Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deskripsi Lengkap (Max 2000 karakter)
        </label>
        <textarea
          name="long_desc"
          value={formData.long_desc}
          onChange={handleChange}
          placeholder="Penjelasan detail tentang project, fitur-fitur, challenge yang dihadapi, dll"
          maxLength="2000"
          rows="6"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <p className="text-gray-500 text-sm mt-1">
          {formData.long_desc.length}/2000
        </p>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gambar Project
        </label>

        {imagePreview && (
          <div className="mb-4 relative">
            <Image
              src={imagePreview}
              alt="Preview"
              width={400}
              height={192}
              className="w-full h-48 object-cover rounded-lg"
            />
            {!initialData && (
              <button
                type="button"
                onClick={() => {
                  setImagePreview("");
                  setImageFile(null);
                  setFormData((prev) => ({
                    ...prev,
                    image: "",
                  }));
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="file"
            id="image-input"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="image-input"
            className="flex-1 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-accent transition-colors text-center"
          >
            <FiUpload className="w-5 h-5 inline mr-2" />
            Pilih gambar
          </label>
          {imageFile && (
            <button
              type="button"
              onClick={handleUploadImage}
              disabled={uploadingImage}
              className="px-6 py-2 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white rounded-lg"
            >
              {uploadingImage ? "Uploading..." : "Upload"}
            </button>
          )}
        </div>
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image}</p>
        )}
      </div>

      {/* Demo URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL Demo
        </label>
        <input
          type="url"
          name="demo"
          value={formData.demo}
          onChange={handleChange}
          placeholder="https://example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {errors.demo && (
          <p className="text-red-500 text-sm mt-1">{errors.demo}</p>
        )}
      </div>

      {/* Preview URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL Preview (Repository/Source)
        </label>
        <input
          type="url"
          name="preview"
          value={formData.preview}
          onChange={handleChange}
          placeholder="https://github.com/..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {errors.preview && (
          <p className="text-red-500 text-sm mt-1">{errors.preview}</p>
        )}
      </div>

      {/* GitHub URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL GitHub (Optional)
        </label>
        <input
          type="url"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="https://github.com/..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tag
        </label>
        <div className="flex gap-4">
          {TAG_OPTIONS.map((tag) => (
            <label key={tag} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.tag.includes(tag)}
                onChange={() => handleTagChange(tag)}
                className="w-4 h-4 rounded accent-accent"
              />
              <span className="text-gray-700">{tag}</span>
            </label>
          ))}
        </div>
        {errors.tag && (
          <p className="text-red-500 text-sm mt-1">{errors.tag}</p>
        )}
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tech Stack (Pilih yang relevan)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TECH_STACK_OPTIONS.map((tech) => (
            <label
              key={tech}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.tech_stack.includes(tech)}
                onChange={() => handleTechStackChange(tech)}
                className="w-4 h-4 rounded accent-accent"
              />
              <span className="text-gray-700 text-sm">{tech}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Order & Featured */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order (Urutan tampil)
          </label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer w-full">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 rounded accent-accent"
            />
            <span className="text-gray-700">Featured Project</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-all duration-300"
      >
        {isLoading
          ? "Menyimpan..."
          : initialData
          ? "Update Project"
          : "Tambah Project"}
      </button>
    </motion.form>
  );
};

export default ProjectForm;
