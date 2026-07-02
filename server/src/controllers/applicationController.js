import Application from "../models/Application.js";
import Internship from "../models/Internship.js";
import Student from "../models/Student.js";
import Company from "../models/Company.js";

const studentPopulate = { path: "student", populate: { path: "user", select: "fullName email" } };
const internshipPopulate = {
  path: "internship",
  populate: { path: "company", select: "companyName industry location", populate: { path: "user", select: "fullName email" } },
};

export const applyInternship = async (req, res) => {
  try {
    let student = await Student.findOne({ user: req.user._id });
    if (!student) {
      student = await Student.create({ user: req.user._id });
    }

    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ success: false, message: "Internship not found." });
    }

    const existing = await Application.findOne({ internship: internship._id, student: student._id });
    if (existing) {
      return res.status(400).json({ success: false, message: "Already applied." });
    }

    const application = await Application.create({ internship: internship._id, student: student._id });
    await Internship.findByIdAndUpdate(req.params.id, { $inc: { applicantCount: 1 } });

    res.status(201).json({ success: true, message: "Application submitted.", application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const myApplications = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student profile not found." });
    }

    const applications = await Application.find({ student: student._id })
      .populate(internshipPopulate)
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCompanyApplications = async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user._id });
    if (!company) {
      return res.status(404).json({ success: false, message: "Company profile not found." });
    }

    const companyInternships = await Internship.find({ company: company._id }).select("_id");
    const ids = companyInternships.map((i) => i._id);

    const applications = await Application.find({ internship: { $in: ids } })
      .populate(studentPopulate)
      .populate(internshipPopulate)
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    res.status(200).json({ success: true, message: "Status updated.", application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate(studentPopulate)
      .populate(internshipPopulate)
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
