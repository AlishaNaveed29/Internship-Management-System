import User from "../models/User.js";
import Company from "../models/Company.js";
import Internship from "../models/Internship.js";
import Application from "../models/Application.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate("user", "fullName email").sort({ createdAt: -1 });
    res.status(200).json({ success: true, companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminInternships = async (req, res) => {
  try {
    const internships = await Internship.find()
      .populate({
        path: "company",
        select: "companyName industry location",
        populate: { path: "user", select: "fullName email" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, internships });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate({ path: "student", populate: { path: "user", select: "fullName email" } })
      .populate({
        path: "internship",
        populate: { path: "company", select: "companyName" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
