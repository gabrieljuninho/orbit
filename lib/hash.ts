import bcrypt from "bcryptjs";

const generateSalt = async (): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);

    return salt;
  } catch {
    throw new Error("Failed to generate salt");
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await generateSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch {
    throw new Error("Failed to hash password");
  }
};
