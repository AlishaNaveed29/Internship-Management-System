import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    companyName: { type: String, trim: true },
    email: { type: String, trim: true },
    industry: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    website: { type: String, trim: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    size: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
