export const validators = {
  required: (value, label) => {
    if (!value || (typeof value === "string" && !value.trim())) {
      return `${label} is required`;
    }
    return null;
  },

  email: (value) => {
    if (!value) return null;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? null : "Please enter a valid email address";
  },

  password: (value) => {
    if (!value) return null;
    if (value.length < 6) return "Password must be at least 6 characters";
    return null;
  },

  phone: (value) => {
    if (!value) return null;
    const re = /^[\d\s\-+()]{7,20}$/;
    return re.test(value) ? null : "Please enter a valid phone number";
  },

  url: (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return "Please enter a valid URL (including https://)";
    }
  },

  year: (value) => {
    if (!value) return null;
    const re = /^\d{4}$/;
    if (!re.test(value)) return "Must be a 4-digit year";
    const y = parseInt(value);
    if (y < 1950 || y > 2100) return "Please enter a valid year";
    return null;
  },

  minLength: (min) => (value) => {
    if (!value) return null;
    return value.length >= min ? null : `Must be at least ${min} characters`;
  },

  maxLength: (max) => (value) => {
    if (!value) return null;
    return value.length <= max ? null : `Must be at most ${max} characters`;
  },

  number: (value, label) => {
    if (!value) return null;
    const num = parseInt(value);
    return isNaN(num) ? `${label} must be a number` : null;
  },

  positive: (value, label) => {
    if (!value) return null;
    const num = parseInt(value);
    return num > 0 ? null : `${label} must be greater than 0`;
  },
};

export function validate(fields, values) {
  const errors = {};
  for (const [field, rules] of Object.entries(fields)) {
    for (const rule of rules) {
      const error = rule(values[field]);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }
  return errors;
}
