import type { User } from "../../domain/entities/user";
import type { PrismaUserRepository } from "../../repositories/database/prisma/prisma-user-repository";

export class RegisterUserUseCase {
  constructor(private userRepository: PrismaUserRepository) {}

  async execute(data: User) {
    const userExists = await this.userRepository.findByDiscordId(
      data.discordId
    );

    if (userExists) {
      return userExists;
    }

    const newUser = await this.userRepository.create(data);
    return newUser;
  }
}
