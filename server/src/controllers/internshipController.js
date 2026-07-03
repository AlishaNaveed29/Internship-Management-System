import Internship from "../models/Internship.js";
import Company from "../models/Company.js";
import Application from "../models/Application.js";

const populateOptions = {
  path: "company",
  select: "companyName industry location logo user",
  populate: { path: "user", select: "fullName email" },
};

const allowedInternshipFields = [
  "title", "description", "location", "duration", "type",
  "stipend", "skills", "requirements", "positions", "status",
];

export const createInternship = async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user._id });
    if (!company) {
      return res.status(404).json({ success: false, message: "Company profile not found." });
    }

    const data = { company: company._id };
    allowedInternshipFields.forEach((field) => {
      if (req.body[field] !== undefined) data[field] = req.body[field];
    });

    const internship = await Internship.create(data);

    res.status(201).json({ success: true, message: "Internship created.", internship });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInternships = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const [internships, total] = await Promise.all([
      Internship.find().populate(populateOptions).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Internship.countDocuments(),
    ]);

    res.status(200).json({ success: true, internships, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate(populateOptions);
    if (!internship) {
      return res.status(404).json({ success: false, message: "Internship not found." });
    }
    res.status(200).json({ success: true, internship });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyInternships = async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user._id });
    if (!company) {
      return res.status(404).json({ success: false, message: "Company profile not found." });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [internships, total] = await Promise.all([
      Internship.find({ company: company._id }).populate(populateOptions).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Internship.countDocuments({ company: company._id }),
    ]);

    const withCounts = await Promise.all(
      internships.map(async (internship) => {
        const count = await Application.countDocuments({ internship: internship._id });
        return { ...internship.toObject(), applicantCount: count };
      })
    );

    res.status(200).json({ success: true, internships: withCounts, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInternship = async (req, res) => {
  try {
    const updates = {};
    allowedInternshipFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const internship = await Internship.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
    if (!internship) {
      return res.status(404).json({ success: false, message: "Internship not found." });
    }
    res.status(200).json({ success: true, message: "Internship updated.", internship });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) {
      return res.status(404).json({ success: false, message: "Internship not found." });
    }
    await Application.deleteMany({ internship: req.params.id });
    res.status(200).json({ success: true, message: "Internship deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
