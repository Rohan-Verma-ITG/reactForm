export const validateName = (name, lable) => {
  if (name === undefined) {
    return `${lable} is required.`;
  }
  if (typeof name !== "string") {
    return `${lable} must be a string.`;
  }
  if (name.trim() === "") {
    return `${lable} is required.`;
  }
  if (name.length > 50) {
    return `${lable} cannot exceed 50 characters.`;
  }
  if (/\d/.test(name)) {
    return `${lable} cannot contain numbers.`;
  }
  if (/[^a-zA-Z\s]/.test(name)) {
    return `${lable} cannot contain special characters.`;
  }
  if (/\s{2,}/.test(name)) {
    return `${lable} cannot contain multiple consecutive spaces.`;
  }
  if (/^\s|\s$/.test(name)) {
    return `${lable} cannot start or end with a space.`;
  }

  return "";
};

export const validateEmail = (email) => {
  if (email === undefined) {
    return "Email is required.";
  }
  if (typeof email !== "string") {
    return "Email must be a string.";
  }
  if (email.trim() === "") {
    return "Email is required.";
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return "Invalid email format.";
  }
  return "";
};
