import User from "../models/User.js";
import Company from "../models/Company.js";
import Internship from "../models/Internship.js";
import Application from "../models/Application.js";

export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = {};
    if (search) query.fullName = { $regex: search, $options: "i" };

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ users, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch users" });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = {};
    if (search) query.companyName = { $regex: search, $options: "i" };

    const total = await Company.countDocuments(query);
    const companies = await Company.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ companies, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch companies" });
  }
};

export const getInternships = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = {};
    if (search) query.title = { $regex: search, $options: "i" };

    const total = await Internship.countDocuments(query);
    const internships = await Internship.find(query)
      .populate("company", "companyName industry")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ internships, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch internships" });
  }
};

export const getApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = {};
    if (status && status !== "all") query.status = status;

    const total = await Application.countDocuments(query);
    const applications = await Application.find(query)
      .populate("student", "fullName email")
      .populate({ path: "internship", populate: { path: "company", select: "companyName" } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ applications, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch applications" });
  }
};

export const getStats = async (req, res) => {
  try {
    const [totalUsers, totalCompanies, totalInternships, totalApplications] = await Promise.all([
      User.countDocuments(),
      Company.countDocuments(),
      Internship.countDocuments(),
      Application.countDocuments(),
    ]);

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      stats: { totalUsers, totalCompanies, totalInternships, totalApplications },
      recentUsers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch stats" });
  }
};
