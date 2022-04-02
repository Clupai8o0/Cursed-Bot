import { findPlayer, findPlayerByName } from "../../db/player/find.player";
import { Client, Message, Interaction } from "discord.js";

//* Response object type
import Response from "../../types/utils/response";

//* Profanity
import Filter from "bad-words";
const filter = new Filter();

export = {
	name: "create",
	aliases: ["c"],
	category: "Player",
	description: "Create your player",

	slash: false,
	testOnly: true, // TODO: change to false

	expectedArgs: "<name>",
	minArgs: 1,
	maxArgs: 1,
	// cooldown: '2m',

	callback: async ({ args, client }: { client: Client; args: [string] }) => {
		const name: string = args[0];
		if (filter.isProfane(name))
			return "Mate I don't want you using any bad words in your name";

		//* Checking if player already exists
		const ifPlayerExists = await findPlayer(client?.user?.id);
		if (ifPlayerExists?.data) return "You already have a player";

		//* Checking if name already in use
		const ifNameExists = await findPlayerByName(name);
		if (ifNameExists?.data) return "That name is already in use";

		return `Your character name was ${args[0]}`;
	},
};
