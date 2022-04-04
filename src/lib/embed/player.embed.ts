import { MessageEmbed } from "discord.js";

const playerCreatedEmbed = (id: string) =>
	new MessageEmbed()
		.setColor("GOLD")
		.setTitle("Welcome Player...")
		.setDescription(`Welcome to the **Cursed** World <@${id}>!`)
		.setImage(
			"https://i.pinimg.com/564x/0d/3a/2d/0d3a2d758ed44155f596bad149916dbe.jpg"
		)
		.setTimestamp()
		.setFooter("Hope your enjoy you're stay...");

export { playerCreatedEmbed };
