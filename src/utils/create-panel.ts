import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";

export function createStyledPanel() {
  const embed = new EmbedBuilder()
    .setTitle("🕒 Painel de Registro de Ponto")
    .setDescription("Clique nos botões abaixo para registrar sua ação.")
    .setColor(0x5e05f7);

  // Primeira linha de botões
  const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("entrada")
      .setLabel("🟢 Entrada")
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId("almoco")
      .setLabel("🍽️ Almoço")
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId("saida")
      .setLabel("🔴 Saída")
      .setStyle(ButtonStyle.Secondary)
  );

  // Segunda linha de botões
  const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("pausa")
      .setLabel("☕ Pausa")
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId("retorno")
      .setLabel("🔄 Retorno")
      .setStyle(ButtonStyle.Secondary)
  );

  return {
    embed,
    components: [row1, row2],
  };
}
