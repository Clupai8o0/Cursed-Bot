"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const colors_1 = __importDefault(require("colors"));
const console_1 = require("console");
/**
 * Command error handler
 * @param {string} logMsg - Message to log on the console
 */
function handleError(logMsg, msg, error) {
    console.log(colors_1.default.red(`❌ ${logMsg} - ${(0, console_1.timeStamp)("MM:DD:YYYY HH:mm:ss")}`));
    console.error({
        msg,
        error,
    });
    return "There was an error, please try again later...";
}
exports.handleError = handleError;
