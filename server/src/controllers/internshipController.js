import Internship from "../models/Internship.js";
import Company from "../models/Company.js";
import Application from "../models/Application.js";

const populateOptions = {
  path: "company",
  select: "companyName industry location logo user",
  populate: { path: "user", select: "fullName email" },
};

export const createInternship = async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user._id });
    if (!company) {
      return res.status(404).json({ success: false, message: "Company profile not found." });
    }

    const internship = await Internship.create({ company: company._id, ...req.body });

    res.status(201).json({ success: true, message: "Internship created.", internship });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find().populate(populateOptions);
    res.status(200).json({ success: true, internships });
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

    const internships = await Internship.find({ company: company._id }).populate(populateOptions);

    const withCounts = await Promise.all(
      internships.map(async (internship) => {
        const count = await Application.countDocuments({ internship: internship._id });
        return { ...internship.toObject(), applicantCount: count };
      })
    );

    res.status(200).json({ success: true, internships: withCounts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
