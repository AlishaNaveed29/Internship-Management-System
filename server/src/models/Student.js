import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    fullName: { type: String, trim: true },
    email: { type: String, trim: true },
    university: { type: String, trim: true, default: "" },
    degree: { type: String, trim: true, default: "" },
    major: { type: String, trim: true, default: "" },
    graduationYear: { type: String, trim: true, default: "" },
    skills: { type: String, default: "" },
    phone: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    bio: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
