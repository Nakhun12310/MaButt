import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

export default async function handler(req, res) {
  try {
    if (!client.isReady()) await client.login(DISCORD_TOKEN);
    const channel = await client.channels.fetch(CHANNEL_ID);
    const time = new Date().toLocaleTimeString();
    await channel.setName(`Time: ${time}`);
    res.status(200).send(`Updated to ${time}`);
  } catch (e) {
    console.error(e);
    res.status(500).send('Failed');
  }
}
