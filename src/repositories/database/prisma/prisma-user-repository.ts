import type { User } from "../../../domain/entities/user";
import type { PrismaClient } from "../../../generated/prisma/client";

export class PrismaUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findByDiscordId(discordId: string) {
    return await this.prisma.user.findUnique({
      where: {
        discordId,
      },
    });
  }

  async create(data: User) {
    return await this.prisma.user.create({
      data: {
        name: data.name,
        discordId: data.discordId,
      },
    });
  }
}
