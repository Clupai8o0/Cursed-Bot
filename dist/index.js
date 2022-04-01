"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const colors_1 = __importDefault(require("colors"));
const discord_js_1 = require("discord.js");
const mongodb_1 = require("./db/mongodb");
//* Connecting
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});
//? events
// --------------------------------------------------
//* Getting all event exec files
const eventFiles = fs_1.default
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
(0, mongodb_1.connectToServer)(function (err) {
    if (err) {
        console.error(colors_1.default.red(err));
        process.exit();
    }
});
//* Connecting to the Discord API
client.login(process.env.DISCORD_TOKEN);
