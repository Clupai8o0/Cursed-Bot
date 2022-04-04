import { Message } from "discord.js";

import updatePlayer from "../../db/player/update.player";
import { findPlayer } from "../../db/player/find.player";

import config from "../../config/config.json";

import Player from "../../types/player";

//* Refactor imports
import { handleError } from "../../lib/errorHandler";

export = {
	name: "gender",
	category: "Player",
	description: "Choose the gender of you're player to move on",

	slash: false,
	testOnly: true,

	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<gender(male or female)>",
	cooldown: "2m",

	callback: async ({ args, message }: { args: [string]; message: Message }) => {
		const gender = args[0];
		const id = message.author.id;

		//? Checking if player exists
		const ifPlayerExists = await findPlayer(id);
		if (!ifPlayerExists?.success)
			return `Mfer you haven't even created a character yet... I ain't gonna hold you're hand the entire way. \n Type **${config.prefix}create** *<name>* to get started.`;
		const player: Player = ifPlayerExists.data;

		//? Checking if player has already chosen gender
		if (player.user.gender !== null)
			return `Mate you've already chosen the gender of you're character... what you looking to be bis@xual?...`;

		//? if gender is neither male or female, send error
		if (
			!(gender.toLowerCase() === "male") &&
			!(gender.toLowerCase() === "female")
		) {
			return `Mate I need you to type either "male" or "female". "${args[0]}" ain't it...`;
		}

		//? updating the gender
		const resp = await updatePlayer(id, {
			$set: {
				user: {
					...player.user,
					gender: gender.toLowerCase() === "male" ? true : false,
				},
			},
		});
		if (resp.success)
			return "Go ahead and choose what you wanna do you little runt...";

		return handleError(
			"Error choosing player's gender",
			resp.message,
			resp.data
		);
	},
};
