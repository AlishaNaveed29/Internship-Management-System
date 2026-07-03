import User from "../models/User.js";
import Company from "../models/Company.js";
import Internship from "../models/Internship.js";
import Application from "../models/Application.js";

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find().select("-password").sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(),
    ]);

    res.status(200).json({ success: true, users, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [companies, total] = await Promise.all([
      Company.find().populate("user", "fullName email").sort({ createdAt: -1 }).skip(skip).limit(limit),
      Company.countDocuments(),
    ]);

    res.status(200).json({ success: true, companies, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminInternships = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [internships, total] = await Promise.all([
      Internship.find()
        .populate({
          path: "company",
          select: "companyName industry location",
          populate: { path: "user", select: "fullName email" },
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Internship.countDocuments(),
    ]);

    res.status(200).json({ success: true, internships, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      Application.find()
        .populate({ path: "student", populate: { path: "user", select: "fullName email" } })
        .populate({
          path: "internship",
          populate: { path: "company", select: "companyName" },
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Application.countDocuments(),
    ]);

    res.status(200).json({ success: true, applications, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
