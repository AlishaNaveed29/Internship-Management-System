import Student from "../models/Student.js";

export const getProfile = async (req, res) => {
  try {
    let student = await Student.findOne({ userId: req.user._id });
    if (!student) {
      student = await Student.create({ userId: req.user._id, fullName: req.user.fullName, email: req.user.email });
    }
    res.json({ student });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to get profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const allowed = ["fullName", "email", "university", "degree", "major", "graduationYear", "skills", "phone", "location", "bio"];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    let student = await Student.findOneAndUpdate({ userId: req.user._id }, updates, { new: true, upsert: true });
    res.json({ student });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update profile" });
  }
};
