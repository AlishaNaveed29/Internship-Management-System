import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    companyName: String,
    website: String,
    industry: String,
    description: String,
    location: String,
    phone: String,
    size: String,
    logo: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Company", companySchema);
