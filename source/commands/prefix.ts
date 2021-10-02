import { Client, Message } from "discord.js";
import { logger } from "..";
import { db } from "../database";
import { inlineCode } from '@discordjs/builders'

export const run = async(  message:Message ,_client:Client,args:string[] ) => {
    ////////////////////////////////////////////////////////////////
            
        
        const getprefix = (
            await db.query(`
            SELECT * FROM guild_data 
            WHERE guild_id = ${message.guild?.id};
            `)
        ).rows[0].prefix
 ///////////////////////////////////////////////////////////////////
        logger.log('info',getprefix)
    //0 - set,
    //1 - <prefix>
    if(args[0] && args[1]){
        if(args[1].length > 5 ){message.channel.send("Prefix Must Be Of Maximuim Of % Charecters") }
        const updatedprefix = (
            await db.query(`
            UPDATE guild_data
            SET prefix = '${args[1]}'
            WHERE guild_id = ${message.guild?.id};
            `)
        );
        updatedprefix;
        await message.channel.send(`Sucessfully set prefix to ${inlineCode(args[1])}`)
        return;
    }
    await message.channel.send(`Server Prefix - ${getprefix}`);
}
export const structure = {
    name: "prefix",
    desc: "shows prefix",
    syntax: "<prefix>, <prefix> set ",
    alias: ["pr"],
    permissions: [],
    example: "sets prefix",
    dev: false
}