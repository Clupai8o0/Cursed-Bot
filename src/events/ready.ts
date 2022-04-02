import colors from "colors";
import { Client } from "discord.js";
import WOKCommands from "wokcommands";
import path from "path";

const { prefix } = require("../../config/config.json");

export = {
	name: "ready",
	once: true,
	execute(client: Client<boolean>) {
		//* Initializing Wok
		new WOKCommands(client, {
			commandsDir: path.join(__dirname, "../commands"),
			// featuresDir: path.join(__dirname, "../features"),
			showWarns: true,
			botOwners: "774310307043737674",
			mongoUri: process.env.MONGODB_URL,
			testServers: ["905716092314484756"],
		})
			.setDefaultPrefix(prefix)
			.setColor(0x060606)
			.setCategorySettings([
				{
					name: "Help",
					emoji: "😅",
				},
				{
					name: "Player",
					emoji: "👤",
				},
				{
					name: 'Testing',
					emoji: "🧪"
				}
			]);

		console.log(colors.blue("✅ Cursed Bot is ready!"));
	},
};
