import { Client, Message } from "discord.js";
import { commands , aliases  } from "../radius";
import { ValidPermissions } from "../utils/permissions";

export const run = async( client:Client, message: Message) => {
   
    if(message.author.bot)return console.log(" ");
    if( !message.member)return console.log("  ");

    if (!message.guild!.me!.permissions.has('SEND_MESSAGES')) return;


    const prefix = "-";
   

        //make args
        const args = message.content.slice(prefix.length).trim().split(/[ ]+/); 
        const command = args.shift()?.toUpperCase();
        if(!command) return message.channel.send("Invalid Command.");
        const commandObj  = commands.get(command) || aliases.get(command) as any;

        const commandFile = require(`../commands/${commandObj.fileName}`);

        //check perms
        for(const p of commandObj.help.permissions){
           
           if(!ValidPermissions.includes(p)){
               throw new Error("Unknown permission" + `${p}`);
           }
           if (!message.member.permissions.has(p)) return message.channel.send(`You Dont have The Permission${p} To Run The Command `)

       }

        //run
        
         commandFile.run(message, client, args, prefix);;
}