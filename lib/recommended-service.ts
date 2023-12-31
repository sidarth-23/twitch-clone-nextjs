import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { User } from "@prisma/client";

export async function getRecommended() {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users: User[] = [];

  if (userId) {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
}
