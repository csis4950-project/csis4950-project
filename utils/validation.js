import { toDate } from "./utils";

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

export function validateRequestInput(userInput) {
  if (!userInput.userId) throw new Error("Invalid User ID. Please log out and then log in again.");
  if (!userInput.department) throw new Error("Please select at least one department from the list.");
  if (!userInput.typeName) throw new Error("Please select at least one request type from the list.");
  if (!userInput.detail) throw new Error("Please explain the purpose of your request.");

  const { typeName } = userInput;
  if (typeName === "cancel") {
    if (!userInput.shift) throw new Error("Please select a shift from the list.");
  }

  if (typeName === "change") {
    if (!userInput.shift) throw new Error("Please select a shift from the list.");
    checkTimeInput(userInput);
  }

  if (typeName === "vacation") {
    checkTimeInput(userInput);
  }

  if (typeName === "offer-admin") {
    try {
      if (!userInput.shift) {
        checkTimeInput(userInput);
      }

      if (typeName === "offer-user") {
        if (!userInput.shift) throw new Error("Please select a shift from the list.");
      }
    } catch (e) {
      throw new Error(
        `Either selecting a shift or filling all shift time is required. we found an error based on your input: ${e.message}`
      )
    }
  }
}

function checkTimeInput(userInput) {
  const start = toDate(userInput.startDate, userInput.startTime);
  const end = toDate(userInput.endDate, userInput.endTime);
  if (!userInput.startDate) throw new Error("Please fill start date.");
  if (!userInput.startTime) throw new Error("Please fill start time.");
  if (!userInput.endDate) throw new Error("Please fill end date.");
  if (!userInput.endTime) throw new Error("Please fill end time.");
  if (start.getTime() >= end.getTime()) throw new Error("Start time should be earlier time than end time");
}