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
//* Json objects imports
const player_json_1 = __importDefault(require("../../config/player.json"));
//* Database functions
const find_player_1 = require("../../db/player/find.player");
const create_player_1 = __importDefault(require("../../db/player/create.player"));
//* Profanity filter
const bad_words_1 = __importDefault(require("bad-words"));
const filter = new bad_words_1.default();
//* Refactor imports
const errorHandler_1 = require("../../lib/errorHandler");
const player_embed_1 = require("../../lib/embed/player.embed");
const distributeStats_1 = __importDefault(require("../../lib/player/distributeStats"));
module.exports = {
    name: "create",
    aliases: ["c"],
    category: "Player",
    description: "Create your player and venture into the Cursed world...",
    slash: false,
    expectedArgs: "<name>",
    minArgs: 1,
    maxArgs: 1,
    cooldown: "2m",
    callback: ({ args, client, message, }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const name = args[0];
        //? Checks
        //* Profanity check
        if (filter.isProfane(name))
            return "Mate I don't want you using any bad words in your name";
        //* Checking if player already exists
        const ifPlayerExists = yield (0, find_player_1.findPlayer)((_a = message === null || message === void 0 ? void 0 : message.author) === null || _a === void 0 ? void 0 : _a.id);
        if (ifPlayerExists === null || ifPlayerExists === void 0 ? void 0 : ifPlayerExists.data)
            return "You already have a player";
        //* Checking if name already in use
        if ((_b = (yield (0, find_player_1.findPlayerByName)(name))) === null || _b === void 0 ? void 0 : _b.data)
            return "That name is already in use";
        //? Creating player
        //* Instantiating player
        const player = Object.assign({}, player_json_1.default);
        // Setting player name and id
        player.user.name = name;
        player.id = ((_c = message === null || message === void 0 ? void 0 : message.author) === null || _c === void 0 ? void 0 : _c.id) || 0;
        // Distributing stats`
        player.status.stats = (0, distributeStats_1.default)();
        //? Creating the player
        const resp = yield (0, create_player_1.default)(player);
        //* if its successful then sending the embed
        if (resp.success) {
            message.reply({ embeds: [(0, player_embed_1.playerCreatedEmbed)((_d = message === null || message === void 0 ? void 0 : message.author) === null || _d === void 0 ? void 0 : _d.id)] });
            return;
        }
        return (0, errorHandler_1.handleError)("Error creating player", resp.message, resp.data);
    }),
};
