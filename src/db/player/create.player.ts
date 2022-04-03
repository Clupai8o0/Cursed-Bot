import { getDb } from "../mongodb";
import response from "../../utils/response";

import Player from "../../types/player";

const createPlayer = async (player: Player) => {
	const db = getDb();

	try {
		const resp = await db.collection("players").insertOne(player);
		return response(true, "Player created successfully", resp);
	} catch (err: Error | any) {
		console.error(err);
		return response(false, "Error creating player", err.message);
	}
};

export default createPlayer;
