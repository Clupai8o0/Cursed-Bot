export = {
  name: "gender",
	category: "Testing",
	description: "Test the cursed bot",
	slash: "both",
	testOnly: true,

	callback: ({ message, interaction }: any) => {
		return "Pong!";
	},
};
