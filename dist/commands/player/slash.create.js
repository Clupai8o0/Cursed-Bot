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
    name: "create_player",
    category: "Player",
    description: "Create your player and venture into the Cursed world...",
    slash: true,
    testOnly: true,
    expectedArgs: "<name> <gender>",
    minArgs: 2,
    maxArgs: 2,
    cooldown: '2m',
    options: [
        {
            name: "name",
            description: "Name of your character",
            required: true,
            type: 3,
        },
        {
            name: "gender",
            description: "Gender of your character",
            required: true,
            type: 3,
            choices: [
                {
                    name: "Male",
                    value: "male",
                },
                {
                    name: "Female",
                    value: "female",
                },
            ],
        },
    ],
    callback: ({ interaction, args, }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const name = args[0];
        const gender = args[1];
        //? Checks
        //* Profanity check
        if (filter.isProfane(name))
            return "Mate I don't want you using any bad words in your name";
        //* Checking if player already exists
        const ifPlayerExists = yield (0, find_player_1.findPlayer)((_a = interaction === null || interaction === void 0 ? void 0 : interaction.user) === null || _a === void 0 ? void 0 : _a.id);
        if (ifPlayerExists === null || ifPlayerExists === void 0 ? void 0 : ifPlayerExists.data)
            return "You already have a player";
        //* Checking if name already in use
        if ((_b = (yield (0, find_player_1.findPlayerByName)(name))) === null || _b === void 0 ? void 0 : _b.data)
            return "That name is already in use";
        //* if gender is neither male or female, send error
        if (!(gender.toLowerCase() === "male") &&
            !(gender.toLowerCase() === "female")) {
            return `Mate I need you to type either "male" or "female". "${args[0]}" ain't it...`;
        }
        //? Creating the player
        //* Instantiating the player
        const player = Object.assign({}, player_json_1.default);
        // Setting player name and id
        player.user.name = name;
        player.id = ((_c = interaction === null || interaction === void 0 ? void 0 : interaction.user) === null || _c === void 0 ? void 0 : _c.id) || 0;
        // Setting player gender
        player.user.gender = gender.toLowerCase() === "male" ? true : false;
        // Distributing stats`
        player.status.stats = (0, distributeStats_1.default)();
        //? Creating the player
        const resp = yield (0, create_player_1.default)(player);
        //* if its successful then sending the embed
        if (resp.success) {
            (_d = interaction.channel) === null || _d === void 0 ? void 0 : _d.send({
                embeds: [(0, player_embed_1.playerCreatedEmbed)((_e = interaction === null || interaction === void 0 ? void 0 : interaction.user) === null || _e === void 0 ? void 0 : _e.id)],
            });
            return "Character successfully created";
        }
        return (0, errorHandler_1.handleError)("Error creating player", resp.message, resp.data);
    }),
};
