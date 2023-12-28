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
        NOT: {
          id: userId,
        },
      },
    });
  } else {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
}
