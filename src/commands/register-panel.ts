import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js";
import { createStyledPanel } from "../utils/create-panel";

export const data = new SlashCommandBuilder()
  .setName("painel")
  .setDescription("Envia o painel de registro de ponto");

export async function execute(interaction: ChatInputCommandInteraction) {
  const { embed, components } = createStyledPanel();

  await interaction.reply({
    embeds: [embed],
    components,
    ephemeral: true,
  });
}
