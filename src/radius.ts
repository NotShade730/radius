import { Client, Intents, Collection, ClientEvents } from 'discord.js';
import fs from 'fs'
import 'dotenv/config'; 

const client = new Client({intents: Intents.FLAGS.GUILD_MESSAGES});

export const commands = new Collection();
export const aliases = new Collection();

fs.readdir('./commands',(err,files) => {
    if (err) console.error(err);

    files.forEach((f)=> {
        const props = require(`./commands/${f}`);
        props.fileName = f;
        commands.set(props.help.name.ToUpperCase(), props);
        if(props.aliases){
            props.help.aliases.forEach((alias: string) => {
                aliases.set(alias.toUpperCase(), props.help.name.toUpperCase());
            });
        }

    },
    console.log(`[COMMAND] - A TOTAL OF ${files.length} COMMANDS HAS BEEN LOADED.`)
    )

})

fs.readdir('./events',(err, efiles) => {
    if(err) console.error(err);

    efiles.forEach((e)=> {
        const props = require(`./events/${e}`);
        props.run.bind(null , client);
        const event = e.split('.')[0];
        client.on(event as keyof ClientEvents, (...args) => props.run(client , ...args));

    },
    console.log(`[COMMAND] - A TOTAL OF ${efiles.length} EVENTS HAS BEEN LOADED.`)
    )
});

client.login(process.env.TOKEN);