//* Packages import
import { Interaction} from "discord.js";

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
	name: "create_player",
	category: "Player",
	description: "Create your player and venture into the Cursed world...",

	slash: true,
	testOnly: true,

	expectedArgs: "<name> <gender>",
	minArgs: 2,
	maxArgs: 2,
	cooldown: '2m',

	options: [
		{
			name: "name",
			description: "Name of your character",
			required: true,
			type: 3,
		},
		{
			name: "gender",
			description: "Gender of your character",
			required: true,
			type: 3,
			choices: [
				{
					name: "Male",
					value: "male",
				},
				{
					name: "Female",
					value: "female",
				},
			],
		},
	],

	callback: async ({
		interaction,
		args,
	}: {
		interaction: Interaction;
		args: [string, string];
	}) => {
		const name = args[0];
		const gender = args[1];

		//? Checks
		//* Profanity check
		if (filter.isProfane(name))
			return "Mate I don't want you using any bad words in your name";
		//* Checking if player already exists
		const ifPlayerExists = await findPlayer(interaction?.user?.id);
		if (ifPlayerExists?.data) return "You already have a player";
		//* Checking if name already in use
		if ((await findPlayerByName(name))?.data)
			return "That name is already in use";
		//* if gender is neither male or female, send error
		if (
			!(gender.toLowerCase() === "male") &&
			!(gender.toLowerCase() === "female")
		) {
			return `Mate I need you to type either "male" or "female". "${args[0]}" ain't it...`;
		}

		//? Creating the player
		//* Instantiating the player
		const player: Player = { ...playerObj };
		// Setting player name and id
		player.user.name = name;
		player.id = interaction?.user?.id || 0;
		// Setting player gender
		player.user.gender = gender.toLowerCase() === "male" ? true : false;
		// Distributing stats`
		player.status.stats = distributeStats();

		//? Creating the player
		const resp = await createPlayer(player);

		//* if its successful then sending the embed
		if (resp.success) {
			interaction.channel?.send({
				embeds: [playerCreatedEmbed(interaction?.user?.id)],
			});
			return "Character successfully created";
		}

		return handleError("Error creating player", resp.message, resp.data);
	},
};
