import { User } from "@prisma/client";

import { db } from "@/lib/db";

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const generateImageUrl = (username: string): string => {
  return `https://avatar.iran.liara.run/username?username=${username}&background=F4F4F5&color=09090B`;
};
