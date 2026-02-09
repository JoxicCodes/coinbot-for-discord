const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;

// 🔥 PUT YOUR IMAGE LINKS HERE
const images = {
  heads: "https://github.com/JoxicCodes/coinbot-for-discord/blob/main/heads.png",
  tails: "https://github.com/JoxicCodes/coinbot-for-discord/blob/main/tails.png",
  side: "https://github.com/JoxicCodes/coinbot-for-discord/blob/main/coinside.png",
  notcoin: "https://github.com/JoxicCodes/coinbot-for-discord/blob/main/notacoin.png"
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

  // 🎲 probability roll
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

  const embed = new EmbedBuilder()
    .setTitle("🪙 Coin Flip")
    .setDescription(
      `User ${repliedMessage.author.username}: "${repliedMessage.content}"\n\n→ ${resultText}`
    )
    .setImage(imageUrl);

  await message.reply({ embeds: [embed] });
});

client.login(TOKEN);
