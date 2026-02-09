const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;

// ✅ RAW GITHUB IMAGE LINKS (THIS IS IMPORTANT)
const images = {
  heads: "https://raw.githubusercontent.com/JoxicCodes/coinbot-for-discord/main/heads.png",
  tails: "https://raw.githubusercontent.com/JoxicCodes/coinbot-for-discord/main/tails.png",
  side: "https://raw.githubusercontent.com/JoxicCodes/coinbot-for-discord/main/coinside.png",
  notcoin: "https://raw.githubusercontent.com/JoxicCodes/coinbot-for-discord/main/notacoin.png"
};

client.once("ready", () => {
  console.log(`🪙 Coin is online as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.mentions.has(client.user)) return;
  if (!message.reference) return;

  const repliedMessage = await message.channel.messages.fetch(
    message.reference.messageId
  );

  if (!repliedMessage) return;

  const roll = Math.random() * 100;

  let resultText;
  let imageUrl;

  if (roll < 49) {
    resultText = "Heads";
    imageUrl = images.heads;
  } else if (roll < 98) {
    resultText = "Tails";
    imageUrl = images.tails;
  } else if (roll < 99) {
    resultText = "It lands on its side";
    imageUrl = images.side;
  } else {
    resultText = "That is not a coin";
    imageUrl = images.notcoin;
  }

  const output =
    `${repliedMessage.author.username}:  "${repliedMessage.content}"\n` +
    `Coin:`;

  await message.reply({
    content: output,
    files: [imageUrl] // 👈 NORMAL MESSAGE + IMAGE
  });
});

client.login(TOKEN);

