import { Client, Guild} from "discord.js";
import { db } from "../database";
export const event = {
    event:"ready",
    once: false ,
    disabled: false,
    run: async (_client:Client, guild:Guild) => {
        const setprefix = (
        db.query(`
            INSERT INTO 
            guild_data (guild_id, prefix)
            VALUES (${guild.id}, '-');`
            )
        );
        setprefix;

    }}