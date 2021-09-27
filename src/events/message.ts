import { Client, Message } from "discord.js";

export const run = async(_client: Client,message:Message)=> {
    
    if(message.author.bot)return;
    if( !message.member)return;

    if (!message.guild!.me!.permissions.has('SEND_MESSAGES')) return;

}