import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getGPUTier } from "detect-gpu";

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

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits ?? 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const isHardwareAccelerationEnabled = async () => {
  const gpuTier = await getGPUTier();
  return gpuTier.tier >= 2;
};

export const parseBullyingReportOrientationsFromGPT = (text: string | null) => {
  if (!text) return [];
  const points: string[] = [];
  const specificPoints = ["1.", "2.", "3."];

  for (const specificPoint of specificPoints) {
    let startIndex = text.indexOf(specificPoint);

    while (startIndex !== -1) {
      // Find the index of the next occurrence of "."
      const dotIndex = startIndex + specificPoint.length - 1;

      // Find the end of the point text (next occurrence of specific point or end of string)
      const nextSpecificPointIndex = text.indexOf(specificPoint, dotIndex + 1);
      const endIndex =
        nextSpecificPointIndex !== -1 ? nextSpecificPointIndex : text.length;

      // Extract the point text
      const pointText = text.substring(dotIndex + 1, endIndex).trim();

      // Add point text to the array
      points.push(pointText);

      // Update the startIndex to continue searching from the end of this point
      startIndex = text.indexOf(specificPoint, endIndex);
    }
  }

  return points;
};

export type UserRole = "STUDENT" | "COORDINATOR" | "PSYCHOLOGIST" | "DIRECTOR";

export function getInstitutionsRelationName(role: UserRole) {
  switch (role) {
    case "STUDENT":
      return "institutionsAsStudent";
    case "COORDINATOR":
      return "institutionsAsCoordinator";
    case "PSYCHOLOGIST":
      return "institutionsAsPsychologist";
    case "DIRECTOR":
      return "institutionsAsDirector";
    default:
      throw new Error("Invalid user role");
  }
}
