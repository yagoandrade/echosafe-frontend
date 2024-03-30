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
