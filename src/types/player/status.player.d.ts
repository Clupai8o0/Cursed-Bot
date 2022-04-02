enum PlayerElement {}
interface PlayerClass {}
interface PlayerSubClass {}
interface Spirit {} // FIXME: I believe there should be a playerSpirit and a spirit type seperate
interface Skill {}

interface Stats {
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;

	hiddenStats: {
		luck: number;
		rawPower: number;
		// TODO: Awaiting extension
	};
}

export default interface Status {
	//* Their level
	xp: number;
	//* The money in hand
	money: number;

	//* Player specific attributes
	class: PlayerClass | null;
	subClasses: [PlayerSubClass] | null;
	element: PlayerElement | null;
	spirit: Spirit | null;
	skills: [Skill] | null;

	//* Player's stats
	stats: Stats;
}
