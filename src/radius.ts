import {Client,Intents,Collection,ClientEvents,DiscordAPIError} from 'discord.js';
import { readdir } from 'fs'
import 'dotenv/config';
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({intents: myIntents});

export const commands = new Collection();
export const aliases = new Collection();

readdir('./src/commands/', (err, files) => {
    if (err) console.error(err);

    files.forEach((f) => {
            const props = require(`./commands/${f}`);
            props.fileName = f;
            commands.set(props.help.name.toUpperCase(), props);
            if (props.aliases) {
                props.help.aliases.forEach((alias: string) => {
                    aliases.set(alias.toUpperCase(), props.help.name.toUpperCase());
                });
            }

        },
        console.log(`[COMMAND] - A TOTAL OF ${files.length} COMMANDS HAS BEEN LOADED.`)
    )

})

readdir('./src/events/', (error, files) => {
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