/** What action the user is up to */
enum Action {
	idle = "idle",
}
/** Details about the action */
// TODO: There should be a seperate object of this, one for adventure, one for traveling and what no
interface Info {
	name: Action;
}
/** 
 * Where the player is located in terms of the entire map
 * @name {string} - The name of the location
 * @x {number} - The x coordinate of the location
 * @y {number} - The y coordinate of the location
 * ### **Note:** There cannot be negative values for x and y
 */
interface PlayerLocation {
	name: string;
	x: number;
	y: number;
}

/** Any special abilities owned by the player */
interface Special {}
/** Title that a player may own */
interface Title {}

/**
 * What the user is up to
 *
 * @action {Action} - The action the user is up to
 * @info {Info} - Info about what the user is up to
 * @location {PlayerLocation} - Where in the map is the user
 */
interface State {
	action: Action | string;
	info: Info | null;
	location: PlayerLocation;
}

/**
 * The user's information that shows up in their profile
 *
 * ## Basic fields for importance
 * @name {string} - The player's name ingame
 * @gender {boolean} - The player's gender ingame. A boolean, (true -> male) (false -> female)
 * @description {string} - The player's description in their profile
 * @title {Title} - Player's title that shows up in their profile
 *
 * ## Miscellaneous Fields
 * @state {State} - What the user is up to
 * @special {Special} - If the user has any special abilities, purchased specifically or earned/rewarded
 * @title {Title[]} - Collection of titles that the user has
 */
export default interface User {
	name: string;
	gender: boolean | null;
	description: string;
	title: Title | [Title] | null;

	state: State;
	special: Special | null;
	titles: [Title] | null;
}
