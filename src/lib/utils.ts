import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import bcrypt from "bcryptjs";

export async function validatePassword(
  inputPassword: string,
  hashedPasswordInDB: string,
) {
  const isPasswordValid = await bcrypt.compare(
    inputPassword,
    hashedPasswordInDB,
  );
  return isPasswordValid;
}

export function validateEmail(email: string) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}
