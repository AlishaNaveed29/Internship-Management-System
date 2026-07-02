import Company from "../models/Company.js";

export const getCompanyProfile = async (req, res) => {
  try {
    let company = await Company.findOne({ user: req.user._id }).populate("user", "-password");

    if (!company) {
      company = await Company.create({ user: req.user._id, companyName: req.user.fullName || "My Company" });
      company = await Company.findById(company._id).populate("user", "-password");
    }

    const data = {
      ...company.toObject(),
      fullName: company.user?.fullName || "",
      email: company.user?.email || "",
    };

    res.status(200).json({ success: true, company: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      { user: req.user._id },
      { $set: req.body },
      { new: true, upsert: true }
    ).populate("user", "-password");

    const data = {
      ...company.toObject(),
      fullName: company.user?.fullName || "",
      email: company.user?.email || "",
    };

    res.status(200).json({ success: true, company: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCompany = async (req, res) => {
  try {
    const existing = await Company.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({ success: false, message: "Company profile already exists." });
    }

    const company = await Company.create({ user: req.user._id, ...req.body });

    res.status(201).json({ success: true, message: "Company profile created.", company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
