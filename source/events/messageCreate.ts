import { Client, Message } from "discord.js";
import { aliases, commands, logger,  } from "..";
import { db } from "../database";
db

export const event = {
    event:"messageCreate",
    once: false ,
    disabled: false,
    run: async (client:Client, messsage:Message ) => {
        const deafultprefix = "-";
        //dbfunctions


        const getprefix = (
            await db.query(`
            SELECT * guild_data
            WHERE guild_id = ${messsage.guild?.id};
            `)
        ).rows[0].prefix

        
        //dbfunctions
        const prefix = getprefix || deafultprefix

        if(messsage?.author.bot)return;
        
        const args = messsage.content.slice(prefix.length).trim().split(/ +/g);
        //console.log("Args:- "+ args);
        const command = args.shift()?.toUpperCase();
        //messsage.channel.send(`${command}`);
        //console.log("Command:- "+ command);

        const cmd = await commands.get(command) || await aliases.get(command) as any;
        if(!cmd)return;
        //console.log("Cmd:- " + cmd);
        //console.log(cmd)
        const ActualCommand = require(`../commands/${cmd.filename}`)
        try {
            await ActualCommand.run(messsage,client,args,prefix)
        } catch (error) {
            logger.log('error',error);
        }
        
    }
}