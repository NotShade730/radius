import { Client, Message } from "discord.js";
import { clienttypes } from "..";

export const run = async(  message:Message ,_client:Client,args:string[] ) => {
   
    let id = args[0];
    if(!id)return message.channel.send("Please Enter Id Of The Person You Want to unban");
    
    function isNumeric(num: any){
        return !isNaN(num)
      }

      if(isNumeric(id) == false)return message.channel.send("Please Input Id, As Mention Won't Work");
      
      try {
          message.guild?.members.unban(id);
          message.channel.send("Succesfully UnBanned The Users")
      } catch (error) {
          message.channel.send("Could not Ban The Users")
      }
    
}

export const structure = {
    name: "unban",
    desc: "unbans a user",
    syntax: "<prefix>unban <id>",
    alias: ["uban"],
    permissions: ['MANAGE_GUILD'],
    example: "-unban @wumpus",
    dev: false,
    struct: clienttypes.MODERATION
}