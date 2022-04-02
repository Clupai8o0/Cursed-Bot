

//* User relationships
interface Guild {}
interface Friend {}
interface Party {}
interface Relationship {}

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

interface Item {}
// TODO: Experience with an item
// TODO: Weight with an item
interface Equipment {
	type: string;
}

/** 
 * A player object containing all needed information requiring a user
 * 
 * @id {number} - The user's discord_id
 * @user {User} - Details about the user
 * @state {State} - What the player is up to at the moment
 * @relation {Relation} - Relations of the user with the cursed world
 * @status {Status} - The player's status
 * @inventory {Inventory} - The player's inventory
 */
interface Player {
	id: number;

	user: {
		//* The player's name ingame
		name: string;
		//* The player's gender ingame. A boolean...
		//* (true -> male) (false -> female)
		gender: boolean;
		//* The player's description in their profile
		description: string;
		//* The player's profile title
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
	};

	relation: {
		//* Which guild the player has joined
		guild: Guild | null;
		//* Which player's he has friended
		friends: [Friend] | null;
		//* Which party the player belongs to
		party: [Party] | null;
		//* If the player is in any sort of relationship with someone
		relationship: [Relationship] | null;
	};

	status: {
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
	};

	inventory: {
		//* The items in the player's inventory
		items: [Item];

		//* Player's equipments
		equipment: {
			head: Equipment | null;
			body: Equipment | null;
			legs: Equipment | null;

			feet: {
				leftFoot: Equipment | null;
				rightFoot: Equipment | null;
			};

			hands: {
				leftHand: Equipment | null;
				rightHand: Equipment | null;
			};
		};
	};
}
