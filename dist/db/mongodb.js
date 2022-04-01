"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectToServer = void 0;
//* Imports
const colors_1 = __importDefault(require("colors"));
const mongodb_1 = require("mongodb");
//* Constants
const connectionUrl = process.env.MONGODB_URL || "", databaseName = process.env.MONGODB_DATABASE_NAME;
let dbConnection;
//* Connecting
const client = new mongodb_1.MongoClient(connectionUrl);
//* Exporting
function connectToServer(callback) {
    client.connect(function (err, db) {
        if (err || !db)
            return callback(err);
        dbConnection = db.db(databaseName);
        console.log(colors_1.default.cyan("✅ Connected to MongoDB"));
        return callback();
    });
}
exports.connectToServer = connectToServer;
const getDb = () => dbConnection;
exports.getDb = getDb;
