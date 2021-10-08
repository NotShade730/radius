import { inlineCode } from "@discordjs/builders";
import { Client, Message } from "discord.js";
import { aliases, commands, logger,  } from "..";
import { db } from "../database";
import { ValidPermissions } from "../utils/perms";
console.log()
export type comms = {
    INFO:"info",
    MODERATION:'moderation'
}


export const event = {
    event:"messageCreate",
    once: false ,
    disabled: false,
    run: async (client:Client, message:Message ) => {
        
        //dbfunctions


        const getprefix = (
            await db.query(`
            SELECT * FROM guild_data 
            WHERE guild_id = ${message.guild?.id};
            `)
        ).rows[0].prefix

        
        //dbfunctions
            const prefixes = [getprefix,"-",`<@${client.user?.id}>`,`<@!${client.user?.id}>`]
        let prefix = ''
            function haspref(str:string){
                for(let pre of prefixes){
                    if(str.startsWith(pre)){
                        prefix = pre;
                        return true;
                    }
                }
                return false;
            }
        

        if (!haspref(message.content) == true || message.author.bot) return;
        
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        //console.log("Args:- "+ args);
        const command = args.shift()?.toUpperCase();
        //message.channel.send(`${command}`);
        //console.log("Command:- "+ command);

        const cmd =  aliases.get(command) || await commands.get(command)as any;
        //console.log(aliases)

        if(!cmd)return;
        //console.log("Cmd:- " + cmd);
        
        const ActualCommand = require(`../commands/${cmd.filename}`)
            //perm handler
           
            for(const p of cmd.structure.permissions){
           //console
                if(!ValidPermissions.includes(p)){
                    throw new Error("Unknown permission" + `${p}`);
                }
                if (!message.member?.permissions.has(p)) return message.channel.send(`You Dont have The Permission ${inlineCode(p)} To Run The Command `)
            }
            //syntax
        //execute
        try {
            await ActualCommand.run(message,client,args,prefix)
        } catch (error) {
            logger.log('error',error);
        }
        
    }
}