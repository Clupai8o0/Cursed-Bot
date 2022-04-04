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
const update_player_1 = __importDefault(require("../../db/player/update.player"));
const find_player_1 = require("../../db/player/find.player");
const config_json_1 = __importDefault(require("../../config/config.json"));
//* Refactor imports
const errorHandler_1 = require("../../lib/errorHandler");
module.exports = {
    name: "gender",
    category: "Player",
    description: "Choose the gender of you're player to move on",
    slash: false,
    testOnly: true,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<gender(male or female)>",
    cooldown: "2m",
    callback: ({ args, message }) => __awaiter(void 0, void 0, void 0, function* () {
        const gender = args[0];
        const id = message.author.id;
        //? Checking if player exists
        const ifPlayerExists = yield (0, find_player_1.findPlayer)(id);
        if (!(ifPlayerExists === null || ifPlayerExists === void 0 ? void 0 : ifPlayerExists.success))
            return `Mfer you haven't even created a character yet... I ain't gonna hold you're hand the entire way. \n Type **${config_json_1.default.prefix}create** *<name>* to get started.`;
        const player = ifPlayerExists.data;
        //? Checking if player has already chosen gender
        if (player.user.gender !== null)
            return `Mate you've already chosen the gender of you're character... what you looking to be bis@xual?...`;
        //? if gender is neither male or female, send error
        if (!(gender.toLowerCase() === "male") &&
            !(gender.toLowerCase() === "female")) {
            return `Mate I need you to type either "male" or "female". "${args[0]}" ain't it...`;
        }
        //? updating the gender
        const resp = yield (0, update_player_1.default)(id, {
            $set: {
                user: Object.assign(Object.assign({}, player.user), { gender: gender.toLowerCase() === "male" ? true : false }),
            },
        });
        if (resp.success)
            return "Go ahead and choose what you wanna do you little runt...";
        return (0, errorHandler_1.handleError)("Error choosing player's gender", resp.message, resp.data);
    }),
};
