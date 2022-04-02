import User from './user.player';
import Relation from './relation.player'
import Status from './status.player';
import Inventory from './inventory.player';

/**
 * A player object containing all needed information requiring a user
 *
 * @id {number} - The user's discord_id
 * @user {User} - Details about the user
 * @relation {Relation} - Relations of the user with the cursed world
 * @status {Status} - The player's status
 * @inventory {Inventory} - The player's inventory
 */
interface Player {
	id: number;
	user: User;
	relation: Relation;
	status: Status
	inventory: Inventory;
}
