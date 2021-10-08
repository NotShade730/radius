import { Client, Message } from "discord.js";
import {inlineCode} from '@discordjs/builders'
import { clienttypes } from "..";

export const run = async(  message:Message ,client:Client ) => {
    const p = `Api Latency: ${client.ws.ping}`
    message.channel.send(inlineCode(p));

}
export const structure = {
    name: "ping",
    desc: "Returns The Bots Ping And Latency",
    syntax: "<prefix>ping",
    alias: [],
    permissions: ["SEND_MESSAGES"],
    example: "-ping",
    dev: false,
    struct: clienttypes.INFO
}