interface Item {}
// TODO: Experience with an item
// TODO: Weight with an item
interface Equipment {
	type: string;
}

export default interface Inventory {
	//* The items in the player's inventory
	items: [Item] | never[] | null;

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
}
