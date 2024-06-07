import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const storyContainer = document.getElementById("story-container");

document.addEventListener("DOMContentLoaded", () => {
	restart();
});


MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // This code executes when a mutation occurs in the DOM
    console.log(mutations, observer);
	// Add event listeners to the links
	addLinks(storyContainer);

	// Check if we reached an ending in the story and offer to start over
	if (storyContainer.innerText.includes("The End")) {
		document.getElementById("reset-button").setAttribute("class", "display")
	}
	else {
		document.getElementById("reset-button").setAttribute("class", "hidden")
	}
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };
// pass in the target node, as well as the observer options
observer.observe(document.getElementById("story-container"), config);


function restart() {
	// Load the first chapter
	loadChapter('stories/story1/chapter1.md').then(html => {
		storyContainer.innerHTML = html;
	});
}

async function loadChapter(chapterPath) {
	const response = await fetch(chapterPath).catch(error => console.error('Error fetching chapter: ', error));
	const markdownText = await response.text();
	return marked.parse(markdownText);
}

function addLinks(target) {
	// Add event listeners to the links
	const links = target.querySelectorAll('a');
	links.forEach(link => {
		link.addEventListener('click', event => {
			event.preventDefault();
			const href = event.target.getAttribute('href');
			loadChapter(href).then(html => {
				target.innerHTML = html; })
			});
		});
}