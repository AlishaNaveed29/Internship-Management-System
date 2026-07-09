import Internship from "../models/Internship.js";
import Company from "../models/Company.js";
import Application from "../models/Application.js";

export const getInternships = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, location, duration, type } = req.query;
    const query = { status: "active" };

    if (search) query.title = { $regex: search, $options: "i" };
    if (location && location !== "All") query.location = location;
    if (duration && duration !== "All") query.duration = duration;
    if (type && type !== "All") query.type = type;

    const total = await Internship.countDocuments(query);
    const internships = await Internship.find(query)
      .populate("company", "companyName industry location")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ internships, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch internships" });
  }
};

export const getMyInternships = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) return res.status(404).json({ message: "Company profile not found" });

    const { page = 1, limit = 10 } = req.query;
    const query = { company: company._id };

    const total = await Internship.countDocuments(query);
    const internships = await Internship.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    const withCounts = await Promise.all(
      internships.map(async (item) => ({
        ...item,
        applicantCount: await Application.countDocuments({ internship: item._id }),
      }))
    );

    res.json({ internships: withCounts, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch my internships" });
  }
};

export const getInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate("company");
    if (!internship) return res.status(404).json({ message: "Internship not found" });
    res.json({ internship });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch internship" });
  }
};

export const createInternship = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ message: "Title is required" });
    if (!description || !description.trim()) return res.status(400).json({ message: "Description is required" });

    const company = await Company.findOne({ userId: req.user._id });
    if (!company) return res.status(404).json({ message: "Create company profile first" });

    const allowed = ["title", "description", "location", "duration", "type", "stipend", "skills", "requirements", "positions"];
    const data = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) data[key] = req.body[key];
    }
    data.company = company._id;

    const internship = await Internship.create(data);
    res.status(201).json({ internship });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to create internship" });
  }
};

export const updateInternship = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    const internship = await Internship.findOne({ _id: req.params.id, company: company._id });
    if (!internship) return res.status(404).json({ message: "Internship not found or not authorized" });

    const allowed = ["title", "description", "location", "duration", "type", "stipend", "skills", "requirements", "positions", "status"];
    for (const key of allowed) {
      if (req.body[key] !== undefined) internship[key] = req.body[key];
    }
    await internship.save();

    res.json({ internship });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update internship" });
  }
};

export const deleteInternship = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    const internship = await Internship.findOneAndDelete({ _id: req.params.id, company: company._id });
    if (!internship) return res.status(404).json({ message: "Internship not found or not authorized" });

    await Application.deleteMany({ internship: internship._id });
    res.json({ message: "Internship deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to delete internship" });
  }
};
