const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;

client.once("clientReady", () => {
  console.log(`🪙 Coin is online as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  // Ignore bots
  if (message.author.bot) return;

  // Must mention Coin
  if (!message.mentions.has(client.user)) return;

  // Must be a reply
  if (!message.reference) return;

  // Fetch the replied message
  const repliedMessage = await message.channel.messages.fetch(
    message.reference.messageId
  );

  if (!repliedMessage) return;

  // Probability roll (0–99)
  const roll = Math.random() * 100;
  let result;

  if (roll < 49) result = "🪙 Heads";
  else if (roll < 98) result = "🪙 Tails";
  else if (roll < 99) result = "🟡 It lands on its side";
  else result = "❓ That is not a coin";

  const output = `${repliedMessage.author.username}: "${repliedMessage.content}"\nCoin:\n ${result}`;

  await message.reply(output);
});

client.login(TOKEN);
