import { Client, Message } from "discord.js";
import { db } from "../database";
import { inlineCode } from '@discordjs/builders'
import { clienttypes } from "..";
export const run = async(  message:Message ,_client:Client,args:string[] ) => {
    ////////////////////////////////////////////////////////////////

       
 ///////////////////////////////////////////////////////////////////
    //0 - set,length
    //1 - <prefix>
        if(!args[0])return;
        if(args[0].length > 5 ){message.channel.send("Prefix Must Be Of Maximuim Of 5 Charecters") }
        const updatedprefix = (
            await db.query(`
            UPDATE guild_data
            SET prefix = '${args[0]}'
            WHERE guild_id = ${message.guild?.id};
            `)
        );
        updatedprefix;
        await message.channel.send(`Sucessfully set prefix to ${inlineCode(args[0])}`)
        return;
}
export const structure = {
    name: "setprefix",
    desc: "sets prefix",
    syntax: "<prefix> set <prefixtobeset>",
    alias: ["sp"],
    permissions: ["MANAGE_GUILD"],
    example: "sets prefix",
    dev: false,
    struct: clienttypes.INFO
}