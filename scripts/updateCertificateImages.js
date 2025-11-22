require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "My Certificates",
    },
    description: {
      type: String,
      default: "",
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    items: [
      {
        name: String,
        publisher: String,
        image: String,
        date: String,
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

async function updateCertificateImages() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL not set");
    }

    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");

    // Find all certificates
    const certificate = await Certificate.findOne();

    if (!certificate) {
      console.log("No certificates found");
      return;
    }

    console.log(
      `Found certificate record with ${certificate.items.length} items`
    );

    // Update each item to ensure it has an image field
    let updated = false;
    certificate.items.forEach((item) => {
      if (!item.image) {
        item.image = ""; // Set to empty string if missing
        updated = true;
      }
    });

    if (updated) {
      await certificate.save();
      console.log("✅ Updated certificate items with image field");
    } else {
      console.log("✅ All certificate items already have image field");
    }

    // Display updated data
    console.log("\nUpdated certificates:");
    certificate.items.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.name} (${item.publisher}) - Image: ${
          item.image || "empty"
        }`
      );
    });

    mongoose.connection.close();
    console.log("\n✅ Update complete!");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

updateCertificateImages();
