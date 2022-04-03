"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const find_player_1 = require("../../db/player/find.player");
const create_player_1 = __importDefault(require("../../db/player/create.player"));
const player_json_1 = __importDefault(require("../../config/player.json"));
const config_json_1 = __importDefault(require("../../config/config.json"));
const discord_js_1 = require("discord.js");
//* Profanity
const bad_words_1 = __importDefault(require("bad-words"));
const filter = new bad_words_1.default();
module.exports = {
    name: "create",
    aliases: ["c"],
    category: "Player",
    description: "Create your player",
    slash: false,
    testOnly: true,
    expectedArgs: "<name>",
    minArgs: 1,
    maxArgs: 1,
    // cooldown: '2m',
    callback: ({ args, client, message, }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const name = args[0];
        if (filter.isProfane(name))
            return "Mate I don't want you using any bad words in your name";
        //* Checking if player already exists
        const ifPlayerExists = yield (0, find_player_1.findPlayer)((_a = client === null || client === void 0 ? void 0 : client.user) === null || _a === void 0 ? void 0 : _a.id);
        if (ifPlayerExists === null || ifPlayerExists === void 0 ? void 0 : ifPlayerExists.data)
            return "You already have a player";
        //* Checking if name already in use
        const ifNameExists = yield (0, find_player_1.findPlayerByName)(name);
        if (ifNameExists === null || ifNameExists === void 0 ? void 0 : ifNameExists.data)
            return "That name is already in use";
        //* Creating player
        // @ts-ignore
        const player = Object.assign({}, player_json_1.default);
        player.user.name = name;
        player.id = ((_b = client === null || client === void 0 ? void 0 : client.user) === null || _b === void 0 ? void 0 : _b.id) || 0;
        //? Distributing stats`
        //* Getting the amount of values for stats
        let statsAmount = Math.floor(Math.random() * (30 - 50) + 50);
        const hiddenStatsValue = 50 - statsAmount;
        //* Setting the stats
        Object.keys(player.status.stats).forEach((key) => {
            if (key === "hiddenStats")
                return;
            // @ts-ignore
            if (statsAmount < 5)
                return (player.status.stats[key] = 5);
            const statValue = Math.floor(Math.random() * (4 - 15) + 16);
            statsAmount = statsAmount - statValue;
            // @ts-ignore
            player.status.stats[key] = statValue;
        });
        //* Setting hidden stats
        Object.keys(player.status.stats.hiddenStats).forEach((key) => 
        // @ts-ignore
        (player.status.stats.hiddenStats[key] = hiddenStatsValue));
        //* Creating player
        const resp = yield (0, create_player_1.default)(player);
        const embed = new discord_js_1.MessageEmbed()
            .setColor("GOLD")
            .setTitle("Welcome Player...")
            .setDescription(`Welcome to the **Cursed** World <@${message === null || message === void 0 ? void 0 : message.author.id}>! \n Type ${config_json_1.default.prefix}gender <gender> to get started, or just use a *slash* command`)
            .setImage("https://i.pinimg.com/564x/0d/3a/2d/0d3a2d758ed44155f596bad149916dbe.jpg")
            .setTimestamp()
            .setFooter("Hope your enjoy you're stay...");
        if (resp.success) {
            message.reply({ embeds: [embed] });
            return;
        }
        console.error({
            msg: resp.message,
            error: resp.data,
        });
        return "There was an error, please try again later...";
    }),
};
