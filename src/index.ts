import {
  ChannelType,
  Client,
  Events,
  GatewayIntentBits,
  Interaction,
  type TextChannel,
} from "discord.js";
import { RegisterPunchUseCase } from "./application/use-cases/register-punch";
import { RegisterUserUseCase } from "./application/use-cases/register-user";
import * as painelCommand from "./commands/register-panel";
import { env } from "./env";
import { PrismaClient } from "./generated/prisma/client";
import { handleButtonInteraction } from "./interactions/handle-button-interaction";
import { PrismaPunchRepository } from "./repositories/database/prisma/prisma-punch-repository";
import { PrismaUserRepository } from "./repositories/database/prisma/prisma-user-repository";
import { createStyledPanel } from "./utils/create-panel";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const prisma = new PrismaClient();

const userRepo = new PrismaUserRepository(prisma);
const punchRepo = new PrismaPunchRepository(prisma);

const registerUser = new RegisterUserUseCase(userRepo);
const registerPunch = new RegisterPunchUseCase(punchRepo);

client.once(Events.ClientReady, async () => {
  console.log(`✅ Bot logado como ${client.user?.tag}`);

  const canalId = "1363313700060008468";
  const canal = await client.channels.fetch(canalId);

  if (canal && canal.type === ChannelType.GuildText) {
    const { embed, components } = createStyledPanel();

    await (canal as TextChannel).send({
      embeds: [embed],
      components,
    });
  }
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "painel") {
      return painelCommand.execute(interaction);
    }
  }

  if (interaction.isButton()) {
    return handleButtonInteraction(interaction, registerUser, registerPunch);
  }
});

client.login(env.BOT_TOKEN);
