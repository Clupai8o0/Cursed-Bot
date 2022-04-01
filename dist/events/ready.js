"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const colors_1 = __importDefault(require("colors"));
module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(colors_1.default.blue("✅ Cursed Bot is ready!"));
    },
};
