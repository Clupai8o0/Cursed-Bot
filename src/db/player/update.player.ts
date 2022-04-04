import { getDb } from "../mongodb";
import response from "../../lib/response";

const updatePlayer = async (id: string, query: any) => {
	const db = getDb();

	try {
		const resp = await db.collection("players").findOneAndUpdate(
			{ id },
			{
				...query,
			}
		);
		return response(true, "Player updated successfully", resp);
	} catch (err: Error | any) {
		console.error(err);
		return response(false, "Error updating player", err.message);
	}
};

export default updatePlayer;
