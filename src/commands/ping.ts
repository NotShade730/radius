import { Client, Message } from "discord.js";

export const run = (message:Message, client:Client)=> {
    message.channel.send(`Average Ping: ${client.ws.ping}`);

}

export const help = {
    aliases: ['ping'],
    name: 'ping',
    description: 'Returns The Bot Ping',
    usage: 'ping',
    example: '-ping',
    permissions: ["ADMINISTRATOR"]
};