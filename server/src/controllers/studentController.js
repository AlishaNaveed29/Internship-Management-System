import Student from "../models/Student.js";
import Internship from "../models/Internship.js";
import Application from "../models/Application.js";

export const getStudentProfile = async (req, res) => {
  try {
    let student = await Student.findOne({ user: req.user.id }).populate("user", "-password");

    if (!student) {
      student = await Student.create({ user: req.user.id });
      student = await Student.findById(student._id).populate("user", "-password");
    }

    const data = {
      ...student.toObject(),
      fullName: student.user?.fullName || "",
      email: student.user?.email || "",
    };

    res.status(200).json({ success: true, student: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    let student = await Student.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true, upsert: true }
    ).populate("user", "-password");

    const data = {
      ...student.toObject(),
      fullName: student.user?.fullName || "",
      email: student.user?.email || "",
    };

    res.status(200).json({ success: true, student: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStudentDashboardStats = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    const totalInternships = await Internship.countDocuments({ status: "Active" });

    let applied = 0, accepted = 0, rejected = 0;

    if (student) {
      applied = await Application.countDocuments({ student: student._id });
      accepted = await Application.countDocuments({ student: student._id, status: "accepted" });
      rejected = await Application.countDocuments({ student: student._id, status: "rejected" });
    }

    res.status(200).json({
      success: true,
      internships: totalInternships,
      applied,
      accepted,
      rejected,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
