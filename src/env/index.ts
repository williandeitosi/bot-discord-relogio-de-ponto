import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  APPLICATION_ID: z.coerce.number(),
  PUBLIC_KEY: z.string(),
  BOT_TOKEN: z.string(),
  TIMEZONE: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("âŒ Invalid environments variables", _env.error.format());

  throw new Error("Invalid environments variables");
}

export const env = _env.data;
