import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: { type: String, required: [true, "Description is required"], trim: true },
    location: { type: String, trim: true, default: "Remote" },
    duration: { type: String, trim: true, default: "" },
    type: { type: String, enum: ["Full-time", "Part-time", "Remote", "Hybrid", ""], default: "" },
    stipend: { type: String, trim: true, default: "" },
    skills: { type: String, default: "" },
    requirements: { type: String, default: "" },
    positions: { type: Number, default: 1 },
    status: { type: String, enum: ["active", "closed"], default: "active" },
  },
  { timestamps: true }
);

internshipSchema.index({ title: "text", "description": "text" });

export default mongoose.model("Internship", internshipSchema);
