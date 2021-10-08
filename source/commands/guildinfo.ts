import { Client, Message, MessageEmbed } from "discord.js";
import { clienttypes } from "..";

export const run = async(message:Message ,_client:Client,_args:string[] ) => {
    const embed = new MessageEmbed();
   embed.setAuthor(`${message.guild?.name}`,`${message.guild?.iconURL()}`)
   embed.setColor("RANDOM");
   embed.addField("**__Name:__**",`${message.guild?.name}`);
   embed.addField("**__Description:__**",`${message.guild?.description}`);
   embed.addField("**__Created On:__**",`${message.guild?.createdAt}`);
   embed.addField("**__Owner:__**",`${ await message.guild?.fetchOwner()}`);
   embed.addField("**__GuildID:__**",`${message.guild?.id}`);
   embed.addField("**__Region:__**",`${message.guild?.preferredLocale}`);
   embed.addField("**__Members:__**",`${message.guild?.memberCount}`);
   embed.addField("**__No. of Roles:__**",`${message.guild?.roles.cache.size}`);
   embed.addField("**__Verified__**:",`${message.guild?.verified}`);

   message.channel.send({embeds :[embed]})
}
export const structure = {
    name: "guildinfo",
    desc: "shows info related to guild",
    syntax: "<prefix>guildinfo",
    alias: ["gi","serverinfo",'si'],
    permissions: ["SEND_MESSAGES"],
    example: "-guildinfo",
    dev: false,
    struct: clienttypes.INFO
}