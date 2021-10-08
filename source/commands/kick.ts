import { Client, Message, MessageEmbed, Permissions } from "discord.js";
import { clienttypes } from "..";

export const run = async(  message:Message ,client:Client,args:string[] ) => {
    function strip(id: string){
                
        return client.users.cache.get(id);
    }  
    if(!message.member?.guild.me?.permissions.has(Permissions.FLAGS.KICK_MEMBERS))return message.channel.send(`Uh Oh Looks Like I Don't Have The Permission To Kick a User, Please Enable It In Server Settings`);
    const member = strip(args[0]) ||message.mentions.users.first() ;
    if(!member ) return message.channel.send("Mention A User To Kick");
    const memberTarget = message.guild?.members.cache.get(member.id);
    if (!memberTarget)return message.channel.send("Could'nt Find The User");
    let reason;
    reason = args.slice(1).join(" ");
    if(!reason ){
        //console.log("eh")
        reason = "No Reason Provided"
    }

    if(memberTarget.roles.highest.position >= message.member.roles.highest.position)return message.channel.send("Could'nt Kick The User As The User Has Higher Position Than You.");
    const kickdm = new MessageEmbed();
    kickdm.setTitle(`Server: ${message.guild?.name}`)
    kickdm.setDescription(`Reason: ${reason} \nKicked By: ${message.author.username +"#"+ message.author.discriminator}\nDate: ${new Date()}`);
    
    try {
        await memberTarget.send("You Have Been Kicked-")
        await memberTarget.send({ embeds:[kickdm]});
    } catch (error) {message.channel.send("Could'nt Dm the user")
        console.log(error);
        
    }
    
    message.channel.send(`Successfully Kicked ${memberTarget} `)
    memberTarget.kick(reason);
  //kick

}

export const structure = {
    name: "kick",
    desc: "kicks a user",
    syntax: "<prefix>kick <user> (reason)",
    alias: [],
    permissions: ['MANAGE_GUILD'],
    example: "-kick @wumpus you stole my lasanga",
    dev: false,
    struct: clienttypes.MODERATION
}