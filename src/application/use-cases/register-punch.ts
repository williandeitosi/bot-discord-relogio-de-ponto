import { Punch, type PunchType } from "../../domain/entities/punch";
import type { PrismaPunchRepository } from "../../repositories/database/prisma/prisma-punch-repository";

export class RegisterPunchUseCase {
  constructor(private punchRepository: PrismaPunchRepository) {}

  async execute(userId: string, type: PunchType) {
    const punchesToday = await this.punchRepository.findByUserAndDate(
      userId,
      new Date()
    );

    if (["entrada", "almoco", "saida"].includes(type)) {
      const alreadyExists = punchesToday.some((p) => p.type === type);
      if (alreadyExists) {
        throw new Error(`Já foi registrado um ${type} hoje`);
      }
    }

    const punch = new Punch(userId, type);
    await this.punchRepository.create(punch);
  }
}
