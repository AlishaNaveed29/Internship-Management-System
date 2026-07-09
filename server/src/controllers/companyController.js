import Company from "../models/Company.js";

export const getProfile = async (req, res) => {
  try {
    let company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      company = await Company.create({ userId: req.user._id, companyName: req.user.fullName, email: req.user.email });
    }
    res.json({ company });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to get profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const allowed = ["companyName", "email", "industry", "location", "website", "phone", "description", "size"];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    let company = await Company.findOneAndUpdate({ userId: req.user._id }, updates, { new: true, upsert: true });
    res.json({ company });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update profile" });
  }
};
