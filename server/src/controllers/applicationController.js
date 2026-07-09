import Application from "../models/Application.js";
import Internship from "../models/Internship.js";
import Student from "../models/Student.js";
import Company from "../models/Company.js";

export const apply = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Internship not found" });

    let student = await Student.findOne({ userId: req.user._id });
    if (!student) {
      student = await Student.create({ userId: req.user._id, fullName: req.user.fullName, email: req.user.email });
    }

    const existing = await Application.findOne({ student: student._id, internship: internship._id });
    if (existing) return res.status(400).json({ message: "Already applied" });

    const application = await Application.create({ student: student._id, internship: internship._id });
    res.status(201).json({ application });
  } catch (err) {
    res.status(500).json({ message: err.message || "Application failed" });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) return res.json({ applications: [], total: 0, page: 1, pages: 0 });

    const { page = 1, limit = 10 } = req.query;
    const query = { student: student._id };

    const total = await Application.countDocuments(query);
    const applications = await Application.find(query)
      .populate({ path: "internship", populate: { path: "company", select: "companyName industry" } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ applications, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch applications" });
  }
};

export const getCompanyApplications = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) return res.status(404).json({ message: "Company profile not found" });

    const internships = await Internship.find({ company: company._id }).select("_id");
    const ids = internships.map((i) => i._id);

    const { page = 1, limit = 10 } = req.query;
    const query = { internship: { $in: ids } };

    const total = await Application.countDocuments(query);
    const applications = await Application.find(query)
      .populate("student", "fullName email")
      .populate("internship", "title")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ applications, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch applications" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });

    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: "Application not found" });

    if (!["pending", "reviewed", "accepted", "rejected"].includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    application.status = req.body.status;
    await application.save();
    res.json({ application });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update status" });
  }
};
