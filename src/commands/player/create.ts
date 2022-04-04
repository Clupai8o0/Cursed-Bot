//* Packages import
import { Client, Message } from "discord.js";

//* Types imports
import Player from "../../types/player";

//* Json objects imports
import playerObj from "../../config/player.json";

//* Database functions
import { findPlayer, findPlayerByName } from "../../db/player/find.player";
import createPlayer from "../../db/player/create.player";

//* Profanity filter
import Filter from "bad-words";
const filter = new Filter();

//* Refactor imports
import { handleError } from "../../lib/errorHandler";
import { playerCreatedEmbed } from "../../lib/embed/player.embed";
import distributeStats from "../../lib/player/distributeStats";

export = {
	name: "create",
	aliases: ["c"],
	category: "Player",
	description: "Create your player and venture into the Cursed world...",

	slash: false,
	expectedArgs: "<name>",
	minArgs: 1,
	maxArgs: 1,
	cooldown: "2m",

	callback: async ({
		args,
		client,
		message,
	}: {
		client: Client;
		args: [string];
		message: Message;
	}) => {
		const name: string = args[0];

		//? Checks
		//* Profanity check
		if (filter.isProfane(name))
			return "Mate I don't want you using any bad words in your name";
		//* Checking if player already exists
		const ifPlayerExists = await findPlayer(message?.author?.id);
		if (ifPlayerExists?.data) return "You already have a player";
		//* Checking if name already in use
		if ((await findPlayerByName(name))?.data)
			return "That name is already in use";

		//? Creating player
		//* Instantiating player
		const player: Player = { ...playerObj };
		// Setting player name and id
		player.user.name = name;
		player.id = message?.author?.id || 0;
		// Distributing stats`
		player.status.stats = distributeStats();

		//? Creating the player
		const resp = await createPlayer(player);

		//* if its successful then sending the embed
		if (resp.success) {
			message.reply({ embeds: [playerCreatedEmbed(message?.author?.id)] });
			return;
		}

		return handleError("Error creating player", resp.message, resp.data);
	},
};
