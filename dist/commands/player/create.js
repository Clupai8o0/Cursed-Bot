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
    callback: ({ args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
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
        return `Your character name was ${args[0]}`;
    }),
};
