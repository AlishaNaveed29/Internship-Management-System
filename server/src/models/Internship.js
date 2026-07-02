import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },

    title: String,
    description: String,
    location: String,
    duration: String,
    type: String,
    stipend: String,
    skills: String,
    requirements: String,
    positions: { type: Number, default: 1 },
    applicantCount: { type: Number, default: 0 },
    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Internship", internshipSchema);
