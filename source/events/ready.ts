import chalk from "chalk";
import { Client,  } from "discord.js";
import { logger } from "..";


export const event = {
    event:"ready",
    once: false ,
    disabled: false,
    run: async (client:Client, ) => {
        const Ready = [
            `--------------------------------------------------------`,
                `${chalk.cyanBright("Ready since")} :  ${new Date().toUTCString()}`,
                `${chalk.cyanBright("Bot")}         :  ${client.user!.username}`,
                `${chalk.cyanBright("Members")}     :  ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                `${chalk.cyanBright("Servers")}     :  ${client.guilds.cache.size}`,
                `${chalk.yellowBright(`HAVE A GREAT DAY!!`)}`,
            `--------------------------------------------------------`,
        ].join('\n');
    
        logger.log(`info`,`${Ready}`);
        client.user?.setStatus('dnd');
        const changeStatus = () => {
            const status = [`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users`, ` ${client.guilds.cache.size.toLocaleString()} servers`, "Trignometry"];
            const random = status[Math.floor(Math.random() * status.length)];
            client.user!.setActivity(random, { type: 'WATCHING' });
        };
    
        setInterval(changeStatus,20000);
}}