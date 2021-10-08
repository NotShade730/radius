import { bold, hyperlink, inlineCode } from "@discordjs/builders";
import { Client, Message, MessageEmbed } from "discord.js";
import { aliases, clienttypes, commands } from "..";
import { db } from "../database";
import { capitalize } from "../utils/functions";

export const run = async(  message:Message ,client:Client,args:string[] = [] ) => {
    const getprefix = (
        await db.query(`
        SELECT * FROM guild_data 
        WHERE guild_id = ${message.guild?.id};
        `)
    ).rows[0].prefix
    const hearts = ["♥",'💙','💚','🧡','💛','💜','❤️'];
    var heartemoji = hearts[Math.floor(Math.random() * hearts.length)];
    
    const categorys = [clienttypes.INFO,clienttypes.MODERATION];
    const em = new MessageEmbed();
    em.setFooter(`${client.user?.username} Built With ${heartemoji} By NotShade#1300`)
    em.setColor("WHITE")
    em.setTitle("Help Menu!!");
    em.setDescription(`${bold(`Server Prefix: ${inlineCode(getprefix)}`)}\n ${bold(hyperlink("Invite Me",'https://www.youtube.com/watch?v=dQw4w9WgXcQ'))} • ${bold(hyperlink("Radius Support","https://www.discord.gg/xGr2raC"))} `)
    em.setThumbnail(`${client.user?.displayAvatarURL()}`)
        const commandss = commands.filter((commandinf:any )=> commandinf.structure.dev !== true)
    //help
    if(!args[0]){
    categorys.forEach((cat)=> {
        const help = commandss.filter((u:any) => u.structure.struct === cat)
        const k = Array.from(help.keys());
        k.sort();
        const helpstring = k.join(" | ")
        em.addField(`${cat}`, inlineCode(`> `+helpstring.toLowerCase()) , false)
        
    })
    message.channel.send({embeds: [em]})}
    //help categoryconsole
    if(args[0]){
       
        const normalcmd:string = args[0].toUpperCase();
            const cmdtofind = commandss.get(normalcmd) || aliases.get(normalcmd);
            if(!cmdtofind)return;
        const cmd:string = capitalize(args[0])
 
        if(categorys.includes(cmd)){
            const help = commandss.filter((u:any) => u.structure.struct === cmd);
            const stuff = Array.from(help.keys());
            stuff.sort();
            const helpstring = stuff.join(" | ")
            em.addField(`${cmd}`, inlineCode(`> `+ helpstring.toLowerCase()) , false) 
            
        }else{
            //const help = commandss.filter((u:any) => u.structure.name === normalcmd);
            const command:any = cmdtofind;
            em.addField(`Name: `,`${inlineCode(command.structure.name)}`);
            em.addField(`Description: `,`${inlineCode(command.structure.desc)}`);
            em.addField(`Syntax: `,`${inlineCode(command.structure.syntax)}`);
            em.setColor('BLURPLE')
            if(command.structure.alias.length > 0){
                const ali = command.structure.alias.join("/");
                em.addField(`Alias: `,`${inlineCode(ali)}`);
            }
            em.addField(`Permissions: `,`${inlineCode(command.structure.permissions.join(',\n'))}`,true);
            em.addField(`Example: `,`${inlineCode(command.structure.example)}`);
            em.addField(`Category: `,`${inlineCode(command.structure.struct)}`);
            
        }
        message.channel.send({embeds: [em]})
    }
    
    
    
    
    
    


}
export const structure = {
    name: "help",
    desc: "Shows Help Regarding The Commands",
    syntax: "<prefix>help (command/category)",
    alias: ['h'],
    permissions: ['SEND_MESSAGES'],
    example: "-help ping",
    dev: false,
    struct: clienttypes.INFO
}