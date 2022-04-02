//* User relationships
interface Guild {}
interface Friend {}
interface Party {}
interface Relationship {}

export default interface Relation {
	//* Which guild the player has joined
	guild: Guild | null;
	//* Which player's he has friended
	friends: [Friend] | null;
	//* Which party the player belongs to
	party: [Party] | null;
	//* If the player is in any sort of relationship with someone
	relationship: [Relationship] | null;
}
