import type { Punch } from "../../../domain/entities/punch";
import type { PrismaClient } from "../../../generated/prisma/client";

export class PrismaPunchRepository {
  constructor(private prisma: PrismaClient) {}

  async findByUserAndDate(userId: string, date: Date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const punches = await this.prisma.punch.findMany({
      where: {
        userId,
        timestamp: {
          gte: start,
          lte: end,
        },
      },
    });

    return punches;
  }

  async create(punch: Punch) {
    const punchAction = await this.prisma.punch.create({
      data: {
        userId: punch.userId,
        type: punch.type,
        timestamp: punch.timestamp,
      },
    });

    return punchAction;
  }
}
