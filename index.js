const { Client, Intents } = require('discord.js');
const fs = require('fs');
const path = require('path');


const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', async () => {
    console.log(`Connecté en tant que ${client.user.tag}`);


    client.user.setActivity('en train de vous aider !', { type: 'STREAMING', url: 'https://www.twitch.tv/your_channel' });


    const guild = client.guilds.cache.first(); // On suppose que le bot est dans au moins un serveur
    if (!guild) return console.error('Le bot n\'est dans aucun serveur !');

    const channels = [];
    for (let i = 0; i < 5; i++) { // Crée 5 salons, tu peux modifier ce nombre
        const channel = await guild.channels.create(`salon-${i+1}`, { type: 'GUILD_TEXT' });
        channels.push(channel);
    }


    for (const channel of channels) {
        for (let i = 0; i < 10; i++) { // Envoie 10 messages dans chaque salon, modifiable
            await channel.send(config.messages[Math.floor(Math.random() * config.messages.length)]);
        }
    }
});

client.login(config.token);
