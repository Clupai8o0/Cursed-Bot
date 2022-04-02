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

/**
 * Status of the player
 * 
 * ## Numberable Attributes
 * @xp {number} - The player's current experience, converted into their level
 * @money {money} - Money at hand
 * 
 * ## Non-Numberable Attributes
 * @class {PlayerClass} - The player's class
 * @subClasses {PlayerSubClass[]} - The player's subclasses
 * @element {PlayerElement} - The player's element
 * @spirit {Spirit} - The player's spirit
 * @skills {Skill[]} - The player's skills
 * 
 * ## Basic Stats
 * @stats {Stats} - The player's stats
 */
export default interface Status {
	xp: number;
	money: number;

	class: PlayerClass | null;
	subClasses: [PlayerSubClass] | null;
	element: PlayerElement | null;
	spirit: Spirit | null;
	skills: [Skill] | null;

	stats: Stats;
}
