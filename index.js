const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const CHANNEL_ID = process.env.CHANNEL_ID;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(CHANNEL_ID);
            const time = new Date().toLocaleTimeString();
            await channel.setName(`Time: ${time}`);
            console.log(`Updated channel name to: Time: ${time}`);
        } catch (err) {
            console.error('Failed to update channel name:', err);
        }
    }, 60000); // every 60 seconds
});

client.login(process.env.DISCORD_TOKEN);
