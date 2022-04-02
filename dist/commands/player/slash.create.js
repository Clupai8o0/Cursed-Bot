"use strict";
module.exports = {
    name: "create_player",
    category: "Testing",
    description: "Test the cursed bot",
    slash: true,
    testOnly: true,
    callback: ({ message, interaction }) => {
        return "Pong!";
    },
};
