import * as THREE from "three";
import { log } from "three/tsl";

const btnSelected = document.querySelector(".btn-select");
const listContainer = document.querySelector("#list-container");

console.log(btnSelected);

// loading textures and creating the list container at once
const textureList = {
	rainbow: "/textures/rainbow.png",
	black: "/textures/black.png",
	gray: "/textures/gray.png",
	gray2: "/textures/gray-2.png",
	brown: "/textures/brown.png",
	yellow: "/textures/yellow.png",
	green: "/textures/green.png",
	green2: "/textures/green-2.png",
	blue: "/textures/blue.png",
	blue2: "/textures/blue-2.png",
	darkBlue: "/textures/dark-blue.png",
	purple: "/textures/purple.png",
	purple2: "/textures/purple-2.png",
	purple3: "/textures/purple-3.png",
	pink: "/textures/pink.png",
	pink2: "/textures/pink-2.png",
	red: "/textures/red.png",
	red2: "/textures/red-2.png",
	orange: "/textures/orange.png",
	orange2: "/textures/orange-2.png",
};

const textureLoader = new THREE.TextureLoader();

export const ringTextures = {};
for (const key in textureList) {
	// load textures
	ringTextures[key] = textureLoader.load(textureList[key]);
	ringTextures[key].colorSpace = THREE.SRGBColorSpace;

	// add select component elements
	/*
		this is the structure 
		<li class="select-items">
			<img class="select-img" src="./textures/pink.png" />
			<span class="color-name">pink</span>
		</li>
	*/
	// 1- create the list item
	const li = document.createElement("li");
	li.setAttribute("class", "select-items");

	// 2- create an image
	const img = document.createElement("img");
	img.setAttribute("class", "select-img");
	img.setAttribute("src", textureList[key]);
	li.appendChild(img);

	// 3- create span
	const span = document.createElement("span");
	span.setAttribute("class", "color-name");
	span.innerText = key;
	li.appendChild(span);

	listContainer.appendChild(li);
}

export const feelings = {
	black:
		"then you might be feeling a bit <span class='feeling'>stressed</span>, <span class='feeling'>tense</span> or <span class='feeling'>nervous</span>",
	gray: "then you might be feeling a bit <span class='feeling'>anxious</span>, <span class='feeling'>unsettled</span>, or <span class='feeling'>tired</span>",
	gray2:
		"then you might be feeling a bit <span class='feeling'>anxious</span>, <span class='feeling'>unsettled</span>, or <span class='feeling'>tired</span>",
	brown:
		"then you might be feeling a bit <span class='feeling'>restless</span>, <span class='feeling'>uncertain</span> or <span class='feeling'>worried</span>",
	yellow:
		"then you might be feeling a bit <span class='feeling'>curious</span>, <span class='feeling'>creative</span> or <span class='feeling'>inspired</span>",
	green:
		"then you might be feeling a bit <span class='feeling'>calm</span>, <span class='feeling'>relaxed</span> or <span class='feeling'>peaceful</span>",
	green2:
		"then you might be feeling a bit <span class='feeling'>calm</span>, <span class='feeling'>relaxed</span> or <span class='feeling'>peaceful</span>",
	blue: "then you might be feeling a bit <span class='feeling'>happy</span>, <span class='feeling'>content</span> or <span class='feeling'>tranquil</span>",
	blue2:
		"then you might be feeling a bit <span class='feeling'>happy</span>, <span class='feeling'>content</span> or <span class='feeling'>tranquil</span>",
	darkBlue:
		"then you might be feeling a bit <span class='feeling'>passionate</span>, <span class='feeling'>love</span> or <span class='feeling'>romantic</span>",
	purple:
		"then you might be feeling a bit <span class='feeling'>energetic</span>, <span class='feeling'>excited</span> or <span class='feeling'>happy</span>",
	purple2:
		"then you might be feeling a bit <span class='feeling'>energetic</span>, <span class='feeling'>excited</span> or <span class='feeling'>happy</span>",
	purple3:
		"then you might be feeling a bit <span class='feeling'>energetic</span>, <span class='feeling'>excited</span> or <span class='feeling'>happy</span>",
	pink: "then you might be feeling a bit <span class='feeling'>affectionate</span>, <span class='feeling'>loving</span> or <span class='feeling'>warm</span>",
	pink2:
		"then you might be feeling a bit <span class='feeling'>affectionate</span>, <span class='feeling'>loving</span> or <span class='feeling'>warm</span>",
	red: "then you might be feeling a bit <span class='feeling'>energized</span>, <span class='feeling'>excited</span> or <span class='feeling'>adventurous</span>",
	red2: "then you might be feeling a bit <span class='feeling'>energized</span>, <span class='feeling'>excited</span> or <span class='feeling'>adventurous</span>",
	orange:
		"then you might be feeling a bit <span class='feeling'>nervous</span>, <span class='feeling'>stressed</span> or <span class='feeling'>challenged</span>",
	orange2:
		"then you might be feeling a bit <span class='feeling'>nervous</span>, <span class='feeling'>stressed</span> or <span class='feeling'>challenged</span>",
};

listContainer.addEventListener("click", (e) => {
	const currentElement = e.target.closest("li").querySelector(".color-name");

	if (currentElement.innerText) {
		// console.log(currentElement.innerText);
		const selected = currentElement.innerText;
		btnSelected.setAttribute("value", selected);
		btnSelected.innerHTML = currentElement;
	}
});
