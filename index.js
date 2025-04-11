const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Setup a minimal Express server to keep Render happy
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Discord bot is running!');
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

// Setup Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Schedule channel name update every 60 seconds
  setInterval(async () => {
    try {
      const channel = await client.channels.fetch(process.env.CHANNEL_ID);
      const time = new Date().toLocaleTimeString();
      await channel.setName(`Time: ${time}`);
      console.log(`Channel name updated to: Time: ${time}`);
    } catch (err) {
      console.error('Error updating channel name:', err);
    }
  }, 60000); // every minute
});

// Login the bot
client.login(process.env.DISCORD_TOKEN);
