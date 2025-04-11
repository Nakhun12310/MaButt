const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Tiny web server so Render doesn't kill the app
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(port, () => console.log(`Web server listening on port ${port}`));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  setInterval(async () => {
    try {
      const channel = await client.channels.fetch(process.env.CHANNEL_ID);
      const time = new Date().toLocaleTimeString();
      await channel.setName(`Time: ${time}`);
      console.log(`Channel name updated: Time: ${time}`);
    } catch (err) {
      console.error('Failed to update channel name:', err);
    }
  }, 60000); // every minute
});

client.login(process.env.DISCORD_TOKEN);
