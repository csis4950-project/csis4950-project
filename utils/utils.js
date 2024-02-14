import bcrypt from "bcrypt";

export async function isValidPassword(password, encryptedPassword) {
  return await bcrypt.compare(password, encryptedPassword);
}

export async function matchPassword(password, confirmPassword) {
  return password.match(confirmPassword);
}

export async function hashPassword(password) {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
}