import {Client,Intents,Collection,ClientEvents,DiscordAPIError} from 'discord.js';
import fs from 'fs'
import 'dotenv/config';

const client = new Client({intents: Intents.FLAGS.GUILD_MESSAGES});

export const commands = new Collection();
export const aliases = new Collection();

fs.readdir('./src/commands/', (err, files) => {
    if (err) console.error(err);

    files.forEach((f) => {
            const props = require(`./src/commands/${f}`);
            props.fileName = f;
            commands.set(props.help.name.ToUpperCase(), props);
            if (props.aliases) {
                props.help.aliases.forEach((alias: string) => {
                    aliases.set(alias.toUpperCase(), props.help.name.toUpperCase());
                });
            }

        },
        console.log(`[COMMAND] - A TOTAL OF ${files.length} COMMANDS HAS BEEN LOADED.`)
    )

})

fs.readdir('./src/events/', (error, files) => {
    if (error) return console.error(error);
    files.forEach((file) => {
        const eventFunction = require(`./events/${file}`);
        eventFunction.run.bind(null, client);
        const eventName = file.split('.')[0];
        client.on(eventName as keyof ClientEvents, (...args) => eventFunction.run(client, ...args));
    });
    console.log(`[Events]\tLoaded a total amount of ${files.length} events`);
});

process.on('unhandledRejection', (error) => {
    if (error instanceof DiscordAPIError && error.name === 'DiscordAPIError') return;
    console.error('Uncaught Promise Error: ', error);
});

client.login("NzI0Mjg4MDcxNzQ2NDUzNTk1.Xu9_1A.sB_pSAYmAbWCPi9Ar-itDqIE58E");