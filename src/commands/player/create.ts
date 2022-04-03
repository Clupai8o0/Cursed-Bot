import { findPlayer, findPlayerByName } from "../../db/player/find.player";
import createPlayer from "../../db/player/create.player";

import playerObj from "../../config/player.json";
import config from "../../config/config.json";
import Player from "../../types/player";

import { Client, Message } from "discord.js";
import { MessageEmbed } from "discord.js";
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
		if (filter.isProfane(name))
			return "Mate I don't want you using any bad words in your name";

		//* Checking if player already exists
		const ifPlayerExists = await findPlayer(client?.user?.id);
		if (ifPlayerExists?.data) return "You already have a player";

		//* Checking if name already in use
		const ifNameExists = await findPlayerByName(name);
		if (ifNameExists?.data) return "That name is already in use";

		//* Creating player
		// @ts-ignore
		const player: Player = { ...playerObj };
		player.user.name = name;
		player.id = client?.user?.id || 0;

		//? Distributing stats`
		//* Getting the amount of values for stats
		let statsAmount = Math.floor(Math.random() * (30 - 50) + 50);
		const hiddenStatsValue = 50 - statsAmount;

		//* Setting the stats
		Object.keys(player.status.stats).forEach((key) => {
			if (key === "hiddenStats") return;

			// @ts-ignore
			if (statsAmount < 5) return (player.status.stats[key] = 5);

			const statValue = Math.floor(Math.random() * (4 - 15) + 16);
			statsAmount = statsAmount - statValue;

			// @ts-ignore
			player.status.stats[key] = statValue;
		});
		//* Setting hidden stats
		Object.keys(player.status.stats.hiddenStats).forEach(
			(key) =>
				// @ts-ignore
				(player.status.stats.hiddenStats[key] = hiddenStatsValue)
		);

		//* Creating player
		const resp = await createPlayer(player);
		const embed = new MessageEmbed()
			.setColor("GOLD")
			.setTitle("Welcome Player...")
			.setDescription(
				`Welcome to the **Cursed** World <@${message?.author.id}>! \n Type ${config.prefix}gender <gender> to get started, or just use a *slash* command`
			)
			.setImage(
				"https://i.pinimg.com/564x/0d/3a/2d/0d3a2d758ed44155f596bad149916dbe.jpg"
			)
			.setTimestamp()
			.setFooter("Hope your enjoy you're stay...");
		if (resp.success) {
			message.reply({ embeds: [embed] });
			return;
		}

		console.error({
			msg: resp.message,
			error: resp.data,
		});
		return "There was an error, please try again later...";
	},
};
