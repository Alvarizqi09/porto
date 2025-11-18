// Helper untuk upload ke Cloudinary
// Method 1: Direct upload ke Cloudinary (requires unsigned preset)
export const uploadToCloudinaryDirect = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "porto_projects"); // Must create this unsigned preset di Cloudinary

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Upload failed");
    }

    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    throw new Error(`Upload error: ${error.message}`);
  }
};

// Method 2: Upload via backend (recommended for security)
export const uploadToCloudinaryBackend = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/cloudinary/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Upload failed");
    }

    return data;
  } catch (error) {
    throw new Error(`Upload error: ${error.message}`);
  }
};

// Default export - menggunakan backend (lebih aman)
export const uploadToCloudinary = uploadToCloudinaryBackend;

// Helper untuk delete dari Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const response = await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Delete failed");
    }

    return data;
  } catch (error) {
    throw new Error(`Delete error: ${error.message}`);
  }
};
