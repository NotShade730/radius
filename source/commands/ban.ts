import { Client, Message, MessageEmbed, Permissions } from "discord.js";
import { clienttypes } from "..";

export const run = async(  message:Message ,client:Client,args:string[] ) => {
    function strip(id: string){
                
        return client.users.cache.get(id);
    }  
    if(!message.member?.guild.me?.permissions.has(Permissions.FLAGS.BAN_MEMBERS))return message.channel.send(`Uh Oh Looks Like I Don't Have The Permission To Ban a User, Please Enable It In Server Settings`);
    const member = strip(args[0]) ||message.mentions.users.first() ;
    if(!member ) return message.channel.send("Mention A User To Ban");
    const memberTarget = message.guild?.members.cache.get(member.id);
    if (!memberTarget)return message.channel.send("Could'nt Find The User");
    let reason;
    reason = args.slice(1).join(" ");
    if(!reason ){
        reason = "No Reason Provided"
    }
    
    if(memberTarget.roles.highest.position >= message.member.roles.highest.position)return message.channel.send("Could'nt Kick The User As The User Has Higher Position Than You.");
    const bndm = new MessageEmbed();
    bndm.setTitle(`Server: ${message.guild?.name}`)
    bndm.setDescription(`Reason: ${reason} \nBanned By: ${message.author.username +"#"+ message.author.discriminator}\nDate: ${new Date()}`);
    
    try {
        await memberTarget.send("You Have Been Banned-")
        await memberTarget.send({ embeds:[bndm]});
    } catch (error) {message.channel.send("Could'nt Dm the user")
        console.log(error);
        
    }
    
    message.channel.send(`Successfully Banned ${memberTarget} `)
    memberTarget.ban({reason});
    //kick
    
    }

export const structure = {
    name: "ban",
    desc: "bans a user",
    syntax: "<prefix><ban><person><reason>",
    alias: [],
    permissions: ['MANAGE_GUILD'],
    example: "-ban @wumpus",
    dev: false,
    struct: clienttypes.MODERATION
}



