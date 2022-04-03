/**
 * Stats algorithm
 *
 * Should find a random value between 50-30, out of which will be divided
 * between 6 stat types.
 * The rest of the leftover would go for rawPower and luck...
 */

const distribute = () => {
	let statsAmount = Math.floor(Math.random() * (30 - 50) + 50);
	const hiddenStatsAmount = 50 - statsAmount;

	const stats = [0, 0, 0, 0, 0, 0].map(() => {
		if (statsAmount < 5) return 5;

		const newValue = Math.floor(Math.random() * (4 - 15) + 16);
		statsAmount = statsAmount - newValue;
		return newValue;
	});
	const hiddenStats = [
		Math.floor(hiddenStatsAmount / 2),
		Math.floor(hiddenStatsAmount / 2),
	];

	return stats;
};
