import { body, validationResult } from "express-validator";

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

const email = body("email")
  .trim()
  .notEmpty().withMessage("Email is required")
  .isEmail().withMessage("Please provide a valid email")
  .normalizeEmail();

const password = body("password")
  .notEmpty().withMessage("Password is required")
  .isLength({ min: 6 }).withMessage("Password must be at least 6 characters");

const fullName = body("fullName")
  .trim()
  .notEmpty().withMessage("Full name is required")
  .isLength({ min: 2, max: 100 }).withMessage("Name must be 2-100 characters");

const role = body("role")
  .notEmpty().withMessage("Role is required")
  .isIn(["student", "company", "admin"]).withMessage("Invalid role");

const companyName = body("companyName")
  .trim()
  .notEmpty().withMessage("Company name is required")
  .isLength({ max: 200 }).withMessage("Company name too long");

const website = body("website")
  .optional({ values: "falsy" })
  .trim()
  .isURL({ protocols: ["http", "https"] }).withMessage("Please provide a valid URL (http/https)");

const phone = body("phone")
  .optional({ values: "falsy" })
  .trim()
  .matches(/^[\d\s\-+()]{7,20}$/).withMessage("Please provide a valid phone number");

const internshipTitle = body("title")
  .trim()
  .notEmpty().withMessage("Title is required")
  .isLength({ max: 200 }).withMessage("Title too long");

const description = body("description")
  .trim()
  .notEmpty().withMessage("Description is required")
  .isLength({ max: 5000 }).withMessage("Description too long");

const location = body("location")
  .optional({ values: "falsy" })
  .trim()
  .isLength({ max: 200 }).withMessage("Location too long");

const duration = body("duration")
  .optional({ values: "falsy" })
  .trim()
  .isLength({ max: 100 }).withMessage("Duration too long");

const type = body("type")
  .optional({ values: "falsy" })
  .trim()
  .isLength({ max: 100 }).withMessage("Type too long");

const stipend = body("stipend")
  .optional({ values: "falsy" })
  .trim()
  .isLength({ max: 100 }).withMessage("Stipend too long");

const skills = body("skills")
  .optional({ values: "falsy" })
  .trim()
  .isLength({ max: 2000 }).withMessage("Skills too long");

const requirements = body("requirements")
  .optional({ values: "falsy" })
  .trim()
  .isLength({ max: 2000 }).withMessage("Requirements too long");

const positions = body("positions")
  .optional({ values: "falsy" })
  .isInt({ min: 1, max: 9999 }).withMessage("Positions must be a number between 1-9999");

const applicationStatus = body("status")
  .trim()
  .notEmpty().withMessage("Status is required")
  .isIn(["pending", "reviewed", "accepted", "rejected"]).withMessage("Invalid status value");

const university = body("university")
  .optional({ values: "falsy" })
  .trim()
  .isLength({ max: 200 }).withMessage("University name too long");

const degree = body("degree")
  .optional({ values: "falsy" })
  .trim()
  .isLength({ max: 200 }).withMessage("Degree too long");

const major = body("major")
  .optional({ values: "falsy" })
  .trim()
  .isLength({ max: 200 }).withMessage("Major too long");

const graduationYear = body("graduationYear")
  .optional({ values: "falsy" })
  .trim()
  .matches(/^\d{4}$/).withMessage("Graduation year must be a 4-digit year");

const bio = body("bio")
  .optional({ values: "falsy" })
  .trim()
  .isLength({ max: 2000 }).withMessage("Bio too long");

const industry = body("industry")
  .optional({ values: "falsy" })
  .trim()
  .isLength({ max: 200 }).withMessage("Industry too long");

const size = body("size")
  .optional({ values: "falsy" })
  .trim()
  .isLength({ max: 100 }).withMessage("Size too long");

export const registerRules = [fullName, email, password, role, handleErrors];
export const loginRules = [email, password, handleErrors];
export const updateStudentRules = [
  university, degree, major, graduationYear, skills, phone, location, bio,
  handleErrors,
];
export const updateCompanyRules = [
  companyName, website, phone, industry, size, location,
  handleErrors,
];
export const createCompanyRules = [
  companyName, website, phone, industry, size, location,
  handleErrors,
];
export const createInternshipRules = [
  internshipTitle, description, location, duration, type, stipend, skills, requirements, positions,
  handleErrors,
];
export const updateInternshipRules = [
  internshipTitle, description, location, duration, type, stipend, skills, requirements, positions,
  handleErrors,
];
export const updateStatusRules = [applicationStatus, handleErrors];
