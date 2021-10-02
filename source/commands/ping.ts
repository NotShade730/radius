import { Client, Message } from "discord.js";
import {inlineCode} from '@discordjs/builders'

export const run = async(  message:Message ,client:Client ) => {
    const p = `Api Latency: ${client.ws.ping}`
    message.channel.send(inlineCode(p));

}
export const structure = {
    name: "ping",
    desc: "Returns The Bots Ping And Latency",
    syntax: "<prefix>ping",
    alias: ["p"],
    permissions: [],
    example: "-ping",
    dev: false
}