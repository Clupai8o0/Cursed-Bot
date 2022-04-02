"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const colors_1 = __importDefault(require("colors"));
const wokcommands_1 = __importDefault(require("wokcommands"));
const path_1 = __importDefault(require("path"));
const { prefix } = require("../../config/config.json");
module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        //* Initializing Wok
        new wokcommands_1.default(client, {
            commandsDir: path_1.default.join(__dirname, "../commands"),
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
        console.log(colors_1.default.blue("✅ Cursed Bot is ready!"));
    },
};
