import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type ButtonInteraction,
} from "discord.js";
import type { RegisterPunchUseCase } from "../application/use-cases/register-punch";
import type { RegisterUserUseCase } from "../application/use-cases/register-user";
import type { PunchType } from "../domain/entities/punch";

export async function handleButtonInteraction(
  interaction: ButtonInteraction,
  registerUser: RegisterUserUseCase,
  registerPunch: RegisterPunchUseCase
) {
  const discordId = interaction.user.id;
  const username = interaction.user.username;

  const [action, type] = interaction.customId.split(":");

  if (action === "confirmar") {
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`finalizar:${type}`)
        .setLabel("✅ Confirmar")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("cancelar")
        .setLabel("❌ Cancelar")
        .setStyle(ButtonStyle.Danger)
    );

    return await interaction.reply({
      content: `Você confirma o registro de **${type}**?`,
      components: [row],
      ephemeral: true,
    });
  }

  if (action === "finalizar") {
    try {
      const user = await registerUser.execute({ discordId, name: username });
      await registerPunch.execute(user.id, type as PunchType);

      return await interaction.reply({
        content: `✅ Registro de **${type}** confirmado com sucesso!`,
        ephemeral: true,
      });
    } catch (err) {
      return await interaction.reply({
        content: `❗ Erro: ${(err as Error).message}`,
        ephemeral: true,
      });
    }
  }

  if (interaction.customId === "cancelar") {
    return await interaction.reply({
      content: `❌ Registro cancelado.`,
      ephemeral: true,
    });
  }
}
