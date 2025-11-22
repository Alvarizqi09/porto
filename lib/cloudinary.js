import axios from "axios";

// Create axios instance for API calls
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

// Method 1: Direct upload ke Cloudinary (requires unsigned preset)
export const uploadToCloudinaryDirect = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "porto_projects"); // Must create this unsigned preset di Cloudinary

  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message || error.message || "Upload failed"
    );
  }
};

// Method 2: Upload via backend (recommended for security)
export const uploadToCloudinaryBackend = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await api.post("/api/cloudinary/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!data.success) throw new Error(data.error);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || error.message || "Upload failed"
    );
  }
};

// Default export - menggunakan backend (lebih aman)
export const uploadToCloudinary = uploadToCloudinaryBackend;

// Helper untuk delete dari Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const { data } = await api.post("/api/cloudinary/delete", {
      publicId,
    });

    if (!data.success) throw new Error(data.error);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || error.message || "Delete failed"
    );
  }
};
