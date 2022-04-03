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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("../mongodb");
const response_1 = __importDefault(require("../../utils/response"));
const createPlayer = (player) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, mongodb_1.getDb)();
    try {
        const resp = yield db.collection("players").insertOne(player);
        return (0, response_1.default)(true, "Player created successfully", resp);
    }
    catch (err) {
        console.error(err);
        return (0, response_1.default)(false, "Error creating player", err.message);
    }
});
exports.default = createPlayer;
