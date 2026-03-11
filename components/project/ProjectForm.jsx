"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { motion } from "framer-motion";
import { FiUpload, FiX, FiPlus, FiTrash2, FiCheckCircle } from "react-icons/fi";

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
    title_en: initialData?.title?.en || initialData?.title || "",
    title_id: initialData?.title?.id || initialData?.title || "",
    desc_en: initialData?.desc?.en || initialData?.desc || "",
    desc_id: initialData?.desc?.id || initialData?.desc || "",
    long_desc_en: initialData?.long_desc?.en || initialData?.long_desc || "",
    long_desc_id: initialData?.long_desc?.id || initialData?.long_desc || "",
    image: initialData?.image || "",
    demo: initialData?.demo || "",
    preview: initialData?.preview || "",
    github: initialData?.github || "",
    tag: initialData?.tag || ["All"],
    tech_stack: initialData?.tech_stack || [],
    featured: initialData?.featured || false,
    order: initialData?.order || 0,
    pages: initialData?.pages?.map((p) => ({
      ...p,
      title_en: p.title?.en || p.title || "",
      title_id: p.title?.id || p.title || "",
    })) || [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState({});

  // Pages state
  const [pageImageFiles, setPageImageFiles] = useState({});
  const [pageImagePreviews, setPageImagePreviews] = useState({});
  const [uploadingPageImage, setUploadingPageImage] = useState({});

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

  // === Pages handlers ===
  const handleAddPage = () => {
    setFormData((prev) => ({
      ...prev,
      pages: [...prev.pages, { title_en: "", title_id: "", image: "" }],
    }));
  };

  const handleRemovePage = (index) => {
    setFormData((prev) => ({
      ...prev,
      pages: prev.pages.filter((_, i) => i !== index),
    }));
    // Cleanup file state
    setPageImageFiles((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
    setPageImagePreviews((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const handlePageTitleChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      pages: prev.pages.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      ),
    }));
  };

  const handlePageImageSelect = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPageImageFiles((prev) => ({ ...prev, [index]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPageImagePreviews((prev) => ({ ...prev, [index]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPageImage = async (index) => {
    const file = pageImageFiles[index];
    if (!file) return;

    setUploadingPageImage((prev) => ({ ...prev, [index]: true }));
    try {
      const response = await uploadToCloudinary(file);
      const imageUrl = response.url || response.data?.url;
      if (!imageUrl) throw new Error("Upload gagal");

      setFormData((prev) => ({
        ...prev,
        pages: prev.pages.map((p, i) =>
          i === index ? { ...p, image: imageUrl } : p
        ),
      }));
      setPageImageFiles((prev) => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
    } catch (error) {
      console.error("Page image upload error:", error);
      alert("Gagal upload gambar: " + error.message);
    } finally {
      setUploadingPageImage((prev) => ({ ...prev, [index]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title_en.trim() || !formData.title_id.trim()) newErrors.title = "Judul (EN & ID) harus diisi";
    if (!formData.desc_en.trim() || !formData.desc_id.trim()) newErrors.desc = "Deskripsi (EN & ID) harus diisi";
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

    const pagesTransformed = formData.pages.map(p => ({
      ...p,
      title: { en: p.title_en, id: p.title_id }
    }));

    const finalData = {
      ...formData,
      title: { en: formData.title_en, id: formData.title_id },
      desc: { en: formData.desc_en, id: formData.desc_id },
      long_desc: { en: formData.long_desc_en, id: formData.long_desc_id },
      pages: pagesTransformed,
    };
    delete finalData.title_en; delete finalData.title_id;
    delete finalData.desc_en; delete finalData.desc_id;
    delete finalData.long_desc_en; delete finalData.long_desc_id;

    await onSubmit(finalData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
    >
      {/* Title */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Judul Project <span className="text-gray-400 font-normal">(EN)</span>
          </label>
          <input
            type="text"
            name="title_en"
            value={formData.title_en}
            onChange={handleChange}
            placeholder="e.g., Fantastic Web App"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d77864] transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Judul Project <span className="text-gray-400 font-normal">(ID)</span>
          </label>
          <input
            type="text"
            name="title_id"
            value={formData.title_id}
            onChange={handleChange}
            placeholder="e.g., Aplikasi Web Luar Biasa"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d77864] transition"
          />
        </div>
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Deskripsi Singkat <span className="text-gray-400 font-normal">(EN) - Max 500</span>
          </label>
          <textarea
            name="desc_en"
            value={formData.desc_en}
            onChange={handleChange}
            placeholder="Short description..."
            maxLength="500"
            rows="3"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d77864] transition"
          />
          <p className="text-gray-400 text-xs mt-1 text-right">{formData.desc_en.length}/500</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Deskripsi Singkat <span className="text-gray-400 font-normal">(ID) - Max 500</span>
          </label>
          <textarea
            name="desc_id"
            value={formData.desc_id}
            onChange={handleChange}
            placeholder="Deskripsi singkat..."
            maxLength="500"
            rows="3"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d77864] transition"
          />
          <p className="text-gray-400 text-xs mt-1 text-right">{formData.desc_id.length}/500</p>
        </div>
        {errors.desc && (
          <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
        )}
      </div>

      {/* Long Description */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Deskripsi Lengkap <span className="text-gray-400 font-normal">(EN) - Max 2000</span>
          </label>
          <textarea
            name="long_desc_en"
            value={formData.long_desc_en}
            onChange={handleChange}
            placeholder="Detailed description, features, challenges..."
            maxLength="2000"
            rows="5"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d77864] transition"
          />
          <p className="text-gray-400 text-xs mt-1 text-right">
            {formData.long_desc_en.length}/2000
          </p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Deskripsi Lengkap <span className="text-gray-400 font-normal">(ID) - Max 2000</span>
          </label>
          <textarea
            name="long_desc_id"
            value={formData.long_desc_id}
            onChange={handleChange}
            placeholder="Penjelasan detail tentang project, fitur-fitur..."
            maxLength="2000"
            rows="5"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d77864] transition"
          />
          <p className="text-gray-400 text-xs mt-1 text-right">
            {formData.long_desc_id.length}/2000
          </p>
        </div>
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
        {formData.image && !imageFile && (
          <p className="text-green-600 text-xs mt-1 flex items-center gap-1"><FiCheckCircle className="w-3.5 h-3.5" /> Gambar sudah diupload</p>
        )}
      </div>

      {/* Demo URL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            URL Demo
          </label>
          <input
            type="url"
            name="demo"
            value={formData.demo}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d77864] transition"
          />
          {errors.demo && (
            <p className="text-red-500 text-sm mt-1">{errors.demo}</p>
          )}
        </div>

        {/* Preview URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            URL Preview (Repository)
          </label>
          <input
            type="url"
            name="preview"
            value={formData.preview}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d77864] transition"
          />
          {errors.preview && (
            <p className="text-red-500 text-sm mt-1">{errors.preview}</p>
          )}
        </div>
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

      {/* Pages - Halaman Website Screenshots */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Halaman Website (Screenshot)
          </label>
          <button
            type="button"
            onClick={handleAddPage}
            className="flex items-center gap-1 px-3 py-1 bg-accent hover:bg-accent/90 text-white text-sm rounded-lg transition-colors"
          >
            <FiPlus className="w-4 h-4" /> Tambah Halaman
          </button>
        </div>

        {formData.pages.length === 0 ? (
          <p className="text-gray-400 text-sm italic">
            Belum ada halaman. Klik "Tambah Halaman" untuk menambahkan screenshot halaman website.
          </p>
        ) : (
          <div className="space-y-4">
            {formData.pages.map((page, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative"
              >
                <button
                  type="button"
                  onClick={() => handleRemovePage(index)}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="Hapus halaman"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>

                <div className="pr-8 space-y-3">
                  {/* Page Title */}
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Judul <span className="text-gray-400 font-normal">(EN)</span>
                      </label>
                      <input
                        type="text"
                        value={page.title_en}
                        onChange={(e) => handlePageTitleChange(index, "title_en", e.target.value)}
                        placeholder="e.g., Home Page"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d77864] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Judul <span className="text-gray-400 font-normal">(ID)</span>
                      </label>
                      <input
                        type="text"
                        value={page.title_id}
                        onChange={(e) => handlePageTitleChange(index, "title_id", e.target.value)}
                        placeholder="e.g., Halaman Utama"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d77864] transition"
                      />
                    </div>
                  </div>

                  {/* Page Image */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Screenshot
                    </label>

                    {/* Preview */}
                    {(pageImagePreviews[index] || page.image) && (
                      <div className="mb-2">
                        <Image
                          src={pageImagePreviews[index] || page.image}
                          alt={page.title || `Page ${index + 1}`}
                          width={400}
                          height={192}
                          className="w-full h-36 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    <div className="flex gap-2">
                      <input
                        type="file"
                        id={`page-image-${index}`}
                        accept="image/*"
                        onChange={(e) => handlePageImageSelect(index, e)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`page-image-${index}`}
                        className="flex-1 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-accent transition-colors text-center text-sm"
                      >
                        <FiUpload className="w-4 h-4 inline mr-1" />
                        Pilih gambar
                      </label>
                      {pageImageFiles[index] && (
                        <button
                          type="button"
                          onClick={() => handleUploadPageImage(index)}
                          disabled={uploadingPageImage[index]}
                          className="px-4 py-2 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white text-sm rounded-lg"
                        >
                          {uploadingPageImage[index] ? "Uploading..." : "Upload"}
                        </button>
                      )}
                    </div>
                    {page.image && (
                      <p className="text-green-600 text-xs mt-1 flex items-center gap-1"><FiCheckCircle className="w-3.5 h-3.5" /> Gambar sudah diupload</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
