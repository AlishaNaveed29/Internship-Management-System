import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    university: String,
    degree: String,
    major: String,
    graduationYear: String,
    skills: String,
    phone: String,
    location: String,
    bio: String,
    resume: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", studentSchema);
