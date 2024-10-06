// Import the readline module
const readline = require('readline');

// Create an interface to capture user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Story nodes - each node contains a description and options for the user
const story = {
    description: "You find yourself at the entrance of a dark cave. Do you want to go inside or stay outside?",
    options: [
        { choice: "Go inside", nextNode: "caveEntrance" },
        { choice: "Stay outside", nextNode: "forestPath" }
    ]
};

const storyNodes = {
    caveEntrance: {
        description: "You step inside the cave. It's damp and cold. You hear a noise deeper within. Do you want to explore further, light a torch, or leave?",
        options: [
            { choice: "Explore further", nextNode: "deepCave" },
            { choice: "Light a torch", nextNode: "torchCave" },
            { choice: "Leave the cave", nextNode: "forestPath" }
        ]
    },
    torchCave: {
        description: "You light a torch, illuminating strange symbols on the walls. The cave feels mystical. Do you want to examine the symbols or continue deeper?",
        options: [
            { choice: "Examine the symbols", nextNode: "ancientSymbols" },
            { choice: "Continue deeper", nextNode: "deepCave" }
        ]
    },
    ancientSymbols: {
        description: "The symbols tell a story of a lost civilization and mention a hidden artifact deep in the cave. Do you want to search for the artifact or leave the cave?",
        options: [
            { choice: "Search for the artifact", nextNode: "artifactChamber" },
            { choice: "Leave the cave", nextNode: "forestPath" }
        ]
    },
    artifactChamber: {
        description: "You discover a secret chamber with a glowing artifact on a pedestal. Do you take the artifact or leave it untouched?",
        options: [
            { choice: "Take the artifact", nextNode: "takeArtifact" },
            { choice: "Leave it untouched", nextNode: "leaveArtifact" }
        ]
    },
    takeArtifact: {
        description: "As soon as you take the artifact, the cave begins to collapse! You manage to escape just in time. The artifact gives you mysterious powers. Do you want to restart the adventure or quit?",
        options: [
            { choice: "Restart", nextNode: "start" },
            { choice: "Quit", nextNode: null }
        ]
    },
    leaveArtifact: {
        description: "You decide to leave the artifact untouched, respecting the ancient warnings. You safely exit the cave. Do you want to restart the adventure or quit?",
        options: [
            { choice: "Restart", nextNode: "start" },
            { choice: "Quit", nextNode: null }
        ]
    },
    deepCave: {
        description: "You venture deeper into the cave and discover a hidden treasure. However, a dragon stands guard! Do you want to fight the dragon, run away, or try to talk to it?",
        options: [
            { choice: "Fight the dragon", nextNode: "fightDragon" },
            { choice: "Run away", nextNode: "forestPath" },
            { choice: "Talk to the dragon", nextNode: "talkDragon" }
        ]
    },
    fightDragon: {
        description: "You bravely face the dragon, but it's too powerful. Unfortunately, you are defeated. Do you want to restart or quit?",
        options: [
            { choice: "Restart", nextNode: "start" },
            { choice: "Quit", nextNode: null }
        ]
    },
    talkDragon: {
        description: "You decide to talk to the dragon. It turns out the dragon is lonely and just wants a friend. You befriend the dragon, and it shares the treasure with you. Do you want to restart or quit?",
        options: [
            { choice: "Restart", nextNode: "start" },
            { choice: "Quit", nextNode: null }
        ]
    },
    forestPath: {
        description: "You stay outside and take the forest path. After a while, you come across a small hut. Do you knock on the door, explore the forest further, or walk away?",
        options: [
            { choice: "Knock on the door", nextNode: "hutInside" },
            { choice: "Explore the forest", nextNode: "deepForest" },
            { choice: "Walk away", nextNode: "lostInForest" }
        ]
    },
    deepForest: {
        description: "You explore the forest and find a hidden grove with an enchanted pond. Do you drink from the pond or leave?",
        options: [
            { choice: "Drink from the pond", nextNode: "magicPond" },
            { choice: "Leave", nextNode: "forestPath" }
        ]
    },
    magicPond: {
        description: "You drink from the pond and feel rejuvenated with magical energy. You now possess incredible strength. Do you want to restart the adventure or quit?",
        options: [
            { choice: "Restart", nextNode: "start" },
            { choice: "Quit", nextNode: null }
        ]
    },
    hutInside: {
        description: "You enter the hut and meet a friendly wizard. He grants you a wish. Do you wish for wealth, power, or wisdom?",
        options: [
            { choice: "Wish for wealth", nextNode: "wealth" },
            { choice: "Wish for power", nextNode: "power" },
            { choice: "Wish for wisdom", nextNode: "wisdom" }
        ]
    },
    wealth: {
        description: "You wish for wealth, and the wizard fills your pockets with gold. You live a life of luxury. Do you want to restart or quit?",
        options: [
            { choice: "Restart", nextNode: "start" },
            { choice: "Quit", nextNode: null }
        ]
    },
    power: {
        description: "You wish for power, and the wizard grants you control over the elements. You become a force of nature. Do you want to restart or quit?",
        options: [
            { choice: "Restart", nextNode: "start" },
            { choice: "Quit", nextNode: null }
        ]
    },
    wisdom: {
        description: "You wish for wisdom, and the wizard shares all his knowledge. You become the wisest person in the land. Do you want to restart or quit?",
        options: [
            { choice: "Restart", nextNode: "start" },
            { choice: "Quit", nextNode: null }
        ]
    },
    lostInForest: {
        description: "You wander aimlessly through the forest and get lost. Unfortunately, the adventure ends here. Do you want to restart or quit?",
        options: [
            { choice: "Restart", nextNode: "start" },
            { choice: "Quit", nextNode: null }
        ]
    }
};

// Function to display the current story node and its options
function displayNode(node) {
    console.log(`\n${node.description}\n`);
    node.options.forEach((option, index) => {
        console.log(`${index + 1}. ${option.choice}`);
    });
}

// Recursive function to navigate the story
function handleChoice(nodeKey) {
    const currentNode = storyNodes[nodeKey];

    // Display the current story node
    displayNode(currentNode);

    // Ask the user for their choice
    rl.question('\nWhat do you want to do? (Enter the number): ', (input) => {
        const choiceIndex = parseInt(input) - 1;

        if (currentNode.options[choiceIndex]) {
            const nextNode = currentNode.options[choiceIndex].nextNode;

            if (nextNode === null) {
                console.log('Thanks for playing!');
                rl.close();
            } else {
                handleChoice(nextNode);
            }
        } else {
            console.log('Invalid choice. Please try again.');
            handleChoice(nodeKey); // Ask again if invalid choice
        }
    });
}

// Start the story
function startStory() {
    console.log("Welcome to your adventure!");
    handleChoice("start");
}

// Initial node
storyNodes.start = story;

// Start the adventure
startStory();
