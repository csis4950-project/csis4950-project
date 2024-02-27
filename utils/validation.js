export function validateName(name) {
  if (!name || name.trim() === "") {
    return "name cannot be empty.";
  }

  if (name.length < 2) {
    return "name must be at least 2 characters long.";
  }

  if (name.length > 20) {
    return "name cannot exceed 20 characters.";
  }

  const allowedChars = /^[a-zA-Z0-9\-_]+$/;
  if (!allowedChars.test(name)) {
    return "name can only contain letters, numbers, hyphens, or underscores.";
  }

  return "";
}


export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-\.]+\.[a-zA-Z]{2,}$/;
  if (!email || email.trim() === "") {
    return "Email cannot be empty.";
  }

  if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }

  return "";
}

export function validatePassword(password, cPassword) {
  if (!password || password.trim() === "") {
    return "Password cannot be empty.";
  }

  if (password !== cPassword) {
    return "Passwords don't match. Please try again.";
  }

  const minLength = 8;
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }

  const hasUppercase = /[A-Z]+/.test(password);
  const hasLowercase = /[a-z]+/.test(password);
  const hasNumber = /[0-9]+/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':",./<>?]+/.test(password);
  const requiredTypes = 3;
  const metTypes = [hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;

  if (metTypes < requiredTypes) {
    return "Password must contain at least " + requiredTypes +
      " of the following: uppercase letter, lowercase letter, number, special character.";
  }

  return "";
}

export function isValidRequest(userInput) {
  const { typeName } = userInput;
  if (typeName === "cancel") {

  }

  if (typeName === "change") {

  }

  if (typeName === "vacation") {

  }

  if (typeName === "offer-admin") {

  }

  if (typeName === "offer-user") {

  }
  return false
}