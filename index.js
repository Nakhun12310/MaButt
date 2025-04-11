const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Discord bot is running!');
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  
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

client.login(process.env.DISCORD_TOKEN);
