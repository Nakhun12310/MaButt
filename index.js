const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Set up Express to make the bot a web service
const app = express();
const PORT = process.env.PORT || 3000;

// Respond to HTTP requests with a simple message to keep Render happy
app.get('/', (req, res) => {
  res.send('Discord bot is running and deployed on Render!');
});

// Set up the Discord bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Hardcoded Channel ID (replace this with your actual Channel ID)
  const channelId = '1360078467684634715';

  // Update channel name every 60 seconds
  setInterval(async () => {
    try {
      const channel = await client.channels.fetch(channelId);
      if (!channel) {
        throw new Error('Channel not found');
      }

      const time = new Date().toLocaleTimeString();
      await channel.setName(`Time: ${time}`);
      console.log(`Channel name updated to: Time: ${time}`);
    } catch (err) {
      console.error('Error updating channel name:', err);
    }
  }, 60000); // every minute
});

client.login(process.env.DISCORD_TOKEN);

// Start the Express web server
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
