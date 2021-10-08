//imports
import { Client, Collection, DiscordAPIError, Intents, ClientEvents} from "discord.js";
import fs from 'fs';
import chalk from 'chalk'
import winston from 'winston';
import config from '.././config.json'
//logger
export const logger = winston.createLogger({
	transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
      ],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});
//Exports
export const commands = new Collection();
export const aliases = new Collection();
export const info:string[] = [];
export const mod:string[] = [];
export const clienttypes = {
    INFO:'Info',
    MODERATION:'Moderation'
}
export const errorc = chalk.bold.red;
export const warningc = chalk.keyword('orange');
//export const startc = chalk.keyword("lightblue");

//client
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({intents: myIntents});
//commands
fs.readdir('./source/commands',(err, file)=> {
    if(err)throw errorc(err);
    file.forEach((cmd)=> {
        const command = require(`./commands/${cmd}`);
        command.filename = cmd;
        

    commands.set(command.structure.name.toUpperCase(), command);

    if(command.structure.alias){
        command.structure.alias.forEach((al:string) => {
            aliases.set(al.toUpperCase() , command);
        });
    }
    //console.log(aliases)
    })
    
    logger.log(`info`,`LOADED ${file.length} COMMANDS`)
});
//events
 fs.readdir('./source/events/', (error, files) => {
    if (error) throw logger.error(error);
    files.forEach( (file) => {
        const { event } = require(`./events/${file}`);
        event.run.bind(null, client);
        const eventName = file.split('.')[0];
        client.on(eventName as keyof ClientEvents, (...args) => event.run(client, ...args));
    });
    logger.log(`info`,`LOADED ${files.length} EVENTS`);
});

process.on('unhandledRejection', (error) => {
    if (error instanceof DiscordAPIError && error.name === 'DiscordAPIError') return;
    logger.log("error", error);
});
client.on('debug', m => {logger.log('debug', m)});
client.on('warn', m => {logger.log('warn', m)})
client.on('error', m => {logger.log('error', m)})


client.login(config.token);