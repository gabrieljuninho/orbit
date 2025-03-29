import { Member } from "@prisma/client";

import { db } from "@/lib/db";

export type TTeam = Pick<Member, "teamId">;

export const getTeamsByUserId = async (
  userId: string
): Promise<Array<TTeam>> => {
  try {
    const teams = await db.member.findMany({
      where: {
        userId,
        status: "ACTIVE",
      },
      select: {
        teamId: true,
      },
    });

    return teams || [];
  } catch {
    return [];
  }
};
