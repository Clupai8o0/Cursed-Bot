import { Stats } from "../../types/player/status.player";

const distributeStats = (): Stats => {
	const stats = {
		strength: 0,
		dexterity: 0,
		constitution: 0,
		intelligence: 0,
		wisdom: 0,
		charisma: 0,

		hiddenStats: {
			luck: 0,
			rawPower: 0,
			endurance: 0,
		},
	};

	//* Getting the amount of values for stats
	let statsAmount = Math.floor(Math.random() * (30 - 50) + 50);
	const hiddenStatsValue = 50 - statsAmount;

	//? Setting the stats
	Object.keys(stats).forEach((key) => {
		//* if it's hidden stats then ignore it
		if (key === "hiddenStats") return;

		//* if stats amount is exceeded, set the value as 5
		// @ts-ignore
		if (statsAmount < 5) return (stats[key] = 5);

		//* getting a random stats value between 5 and 15
		const statValue = Math.floor(Math.random() * (4 - 15) + 16);
		statsAmount = statsAmount - statValue;

		//* setting the stats value
		// @ts-ignore
		stats[key] = statValue;
	});

	//? Setting hidden stats
	Object.keys(stats.hiddenStats).forEach(
		(key) =>
			// @ts-ignore
			(stats.hiddenStats[key] = hiddenStatsValue)
	);

  return stats;
};

export default distributeStats;
