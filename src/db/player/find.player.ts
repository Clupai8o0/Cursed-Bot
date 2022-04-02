import { getDb } from "../mongodb";
import resp from "../../utils/response";

import { Player } from "../../types/player";

/**
 * Using the id provided, find the player in the database.
 * @param id {number | string} Discord user id
 * @returns null if not found, otherwise the player object
 */
export const findPlayer = async (id?: number | string) => {
	if (!id) return;
	return findOne({ id });
};

/**
 * Using the name provided, find the player in the database.
 * @param name {string} player name ingame
 * @returns null if not found, otherwise the player object
 */
export const findPlayerByName = async (name: string) => {
	if (!name) return;
	return await findOne({ name: name.toLowerCase() });
};

/**
 * Refactored code
 * @param query {object} MongoDB query object
 * @returns Promise<Response>
 */
const findOne = async (query: any) => {
	const db = getDb();
	try {
		const data: Player | null = await db.collection("players").findOne(query);
		return data
			? resp(true, "Player found", data)
			: resp(true, "Player not found", data);
	} catch (err: Error | any) {
		console.error(err);
		return resp(false, "Error finding player", err.message);
	}
};
