import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

export function sign(payload, options = {}) {
  return jwt.sign(payload, SECRET, options);
}

export function verify(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
