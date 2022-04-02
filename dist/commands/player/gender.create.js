"use strict";
module.exports = {
    name: "gender",
    category: "Testing",
    description: "Test the cursed bot",
    slash: "both",
    testOnly: true,
    callback: ({ message, interaction }) => {
        return "Pong!";
    },
};
