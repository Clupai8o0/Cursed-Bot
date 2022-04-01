//* Imports
import colors from "colors";
import { MongoClient } from "mongodb";

//* Constants
const connectionUrl = process.env.MONGODB_URL || "",
	databaseName = process.env.MONGODB_DATABASE_NAME;
let dbConnection: any;

//* Connecting
const client = new MongoClient(connectionUrl);

//* Exporting
export function connectToServer(callback: any) {
	client.connect(function (err, db) {
		if (err || !db) return callback(err);

		dbConnection = db.db(databaseName);
		console.log(colors.cyan("✅ Connected to MongoDB"));

		return callback();
	});
}

export const getDb = () => dbConnection;
