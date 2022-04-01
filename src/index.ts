import fs from "fs";
import colors from "colors";

import { Client, Intents } from "discord.js";
import { connectToServer } from "./db/mongodb";

//* Connecting
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
});

//? events
// --------------------------------------------------
//* Getting all event exec files
const eventFiles = fs
	.readdirSync("./dist/events")
	.filter((file) => file.endsWith(".js"));

//* Looping through all event files and initializing them
for (const file of eventFiles) {
	//* Importing the event file
	const event = require(`./events/${file}`);

	//* Initializing the event file if its only once
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
		break;
	}

	//* Otherwise till force stopped
	client.on(event.name, (...args) => event.execute(...args));
}
// --------------------------------------------------

//? Connecting
//* Connecting to DB
connectToServer(function (err: any) {
	if (err) {
		console.error(colors.red(err));
		process.exit();
	}
});

//* Connecting to the Discord API
client.login(process.env.DISCORD_TOKEN);
