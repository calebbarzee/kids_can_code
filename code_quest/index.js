let currentFunction;
let spiderSwarm = false;

// Function to update the game story
function updateStory(message) {
  document.getElementById('story').innerHTML += "<p>" + message + "</p><br>";
}

// Function to get user input
function getUserInput(callback) {
  currentFunction = callback;
  document.getElementById('inputForm').addEventListener('submit', handleFormSubmit);
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const userInput = document.getElementById('userInput').value;
  document.getElementById('userInput').value = '';
  document.getElementById('inputForm').removeEventListener('submit', handleFormSubmit);
  currentFunction(userInput);
}

// Function to start the quest
function startQuest() {
  let story = "Welcome to Eldoria, traveler. Aria has lost a key to a mysterious chest in her cottage. Can you help her find it?";
  updateStory(story);
  talkToAria();
}

// Function to talk to Aria
function talkToAria() {
  updateStory("Aria says: 'I've lost my key! Can you help me find it?'");
  getUserInput((decision) => {
    if (decision.toLowerCase() === "yes") {
      gatherClues();
    } else {
      updateStory("Aria looks disappointed. 'Please, it's very important.'");
      talkToAria();
    }
  });
}

// Function to gather clues at the market
function gatherClues() {
  updateStory("You head to the market to gather clues from the villagers.");
  updateStory("Do you want to speak to the blacksmith or the merchant? Type 'blacksmith' or 'merchant'.");
  getUserInput((decision) => {
    if (decision.toLowerCase() === "blacksmith") {
      blacksmithClue();
    } else if (decision.toLowerCase() === "merchant") {
      merchantClue();
    } else {
      updateStory("Please choose a valid option.");
      gatherClues();
    }
  });
}

// Function to get clue from the blacksmith
function blacksmithClue() {
  updateStory("Blacksmith says: 'I saw something shiny near my forge. A bird flew towards the forest edge with it.'");
  updateStory("Do you want to speak to the merchant or head to the forest edge? Type 'merchant' or 'forest'.");
  getUserInput((decision) => {
    if (decision.toLowerCase() === "merchant") {
      merchantClue();
    } else if (decision.toLowerCase() === "forest") {
      forestEdge();
    } else {
      updateStory("Please choose a valid option.");
      blacksmithClue();
    }
  });
}

// Function to get clue from the merchant
function merchantClue() {
  updateStory("Merchant says: 'I saw a bird picking up something from the ground. It flew towards the forest edge.'");
  updateStory("Do you want to speak to the blacksmith or head to the forest edge? Type 'blacksmith' or 'forest'.");
  getUserInput((decision) => {
    if (decision.toLowerCase() === "blacksmith") {
      blacksmithClue();
    } else if (decision.toLowerCase() === "forest") {
      forestEdge();
    } else {
      updateStory("Please choose a valid option.");
      merchantClue();
    }
  });
}

// Function for the forest edge
function forestEdge() {
	if (spiderSwarm) {
		updateStory("At the forest edge, you find a bird's nest. Do you want to search the birds nest? Type 'search nest'.");
		getUserInput((decision) => {
			if (decision.toLowerCase() === "search nest") {
				birdsNest();
			} else {
				updateStory("Please choose a valid option.");
				forestEdge();
			  }
		});
	}
	else {
		updateStory("At the forest edge, you find a bird's nest and a small bush with a wooden box poking out of it's leaves. Do you want to search the birds nest or investigate the wooden box? Type 'search nest' or 'wooden box'.");
		getUserInput((decision) => {
		if (decision.toLowerCase() === "search nest") {
			birdsNest();
		} else if (decision.toLowerCase() === "wooden box") {
			woodenBox();
			} else {
			updateStory("Please choose a valid option.");
			forestEdge();
			}
		});
	}
}

function birdsNest() {
	updateStory("You raise up standing on your toes and look into the birds nest, inside is a shiny golden key! Do you want to take the key? Type 'take key'.");
	// If you really want to discover something interesting in javascript,
	// the line below is actually a function declaration with a parameter of
	// "decision" but uses a different syntax to declare the function "() => {}"
	getUserInput((decision) => {
		if (decision.toLowerCase() === "take key") {
			updateStory("You take the key from the bird's nest and rush back to Aria!");
			returnToAria();
		} else {
			updateStory("You leave the key inside the bird's nest and head back to the forest edge.");
			forestEdge();
		}
	});
}

function woodenBox() {
	updateStory("You approach the bush and see that the wooden box resting among its brambles is quite plain. Do you want to open the box? Type 'open box'.");
	getUserInput((decision) => {
		if (decision.toLowerCase() === "open box") {
			updateStory("You open the box and suddenly a swarm of spiders rushes out and all over your hands. Eeeeekkk!! You throw the box as far from you as you can, shake the remaining spiders off your arms, and sprint back to the forest's edge.");
			spiderSwarm = true;
			forestEdge();
		}
		else {
			updateStory("You gently place the box back in the bush thinking it would be better if it was left undisturbed. You walk back to the forest edge.");
			forestEdge();
		}
	})
}

// Function to return to Aria
function returnToAria() {
	updateStory("You return to Aria with her key in hand. Do you want to return the key to its owner? Type 'return key'.")
  getUserInput((reward) => {
    if (reward.toLowerCase() === "return key") {
      updateStory("Aria says: 'Thank you for finding my key! She rushes inside and retrieves a large ornate golden box. She inserts the key, turns it till a loud mechanical click resonates from within the box. She opens the lid of the box to reveal a plain looking piece of parchment. On the parchement is inscribed, 'Acquiring knowledge requires the revelation of ignorance.' You walk away from the quest feeling satisfied in the new wisdom you've gained.");
    } else {
      updateStory("Aria stands looking at the key in your hand with much anticipation.");
      returnToAria();
    }
  });
}

// Start the quest
startQuest();
