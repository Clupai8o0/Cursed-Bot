//* User state
enum Action {}
interface Info {}
interface PlayerLocation {}

//* User specific
interface Special {}
interface Title {}

/**
 * The user's information that shows up in their profile
 *
 * @name {string} - The player's name ingame
 * @gender {boolean} - The player's gender ingame. A boolean, (true -> male) (false -> female)
 * @description {string} - The player's description in their profile
 * @title {Title} - Player's title that shows up in their profile
 */
export default interface User {
	name: string;
	gender: boolean;
	description: string;
	title: Title | [Title] | null;

	state: {
		//* The user status if they are free or upto something
		action: Action;
		//* Info about what the user is up to
		info: Info | null;
		//* Where in the map is the user
		location: PlayerLocation;
	};

	//* If the user has any special abilities
	//* Specifically purchased from patreon or rewarded
	special: Special | null;
	//* The titles earned by a user
	titles: [Title] | null;
}
