import { Client } from "discord.js";
import colors from "colors";

export = {
	name: "ready",
	once: true,
	execute(client: Client<boolean>) {
		console.log(colors.blue("✅ Cursed Bot is ready!"));
	},
};
