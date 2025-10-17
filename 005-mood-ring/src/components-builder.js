import * as THREE from "three";
import { log } from "three/tsl";

const btnSelected = document.querySelector(".btn-select");
const listContainer = document.querySelector("#list-container");
const feelingsDescription = document.querySelector(".description");

// loading textures and creating the list container at once
export const textureList = {
	rainbow: { path: "/textures/rainbow.png", label: "", emotion: "" },
	black: {
		path: "/textures/black.png",
		label: "Obsidian Depth",
		emotion:
			"In the dark of this hue, you could be <span class='feeling'>tense</span>, holding silent <span class='feeling'>worries</span> or <span class='feeling'>restless</span> energy beneath calm skin.",
	},
	gray: {
		path: "/textures/gray.png",
		label: "Steel Mist",
		emotion:
			"When things fade to gray, your world may feel <span class='feeling'>unsettled</span>, softly <span class='feeling'>anxious</span>, or just <span class='feeling'>tired</span> of noise.",
	},
	gray2: {
		path: "/textures/gray-2.png",
		label: "Silver Veil",
		emotion:
			"Perhaps you’re drifting through a <span class='feeling'>quiet uncertainty</span>, a pause between <span class='feeling'>clarity</span> and <span class='feeling'>calm</span>.",
	},
	brown: {
		path: "/textures/brown.png",
		label: "Bronzed Earth",
		emotion:
			"Grounded tones like this often whisper of <span class='feeling'>reflection</span>, <span class='feeling'>comfort</span>, and a need for <span class='feeling'>stability</span>.",
	},
	yellow: {
		path: "/textures/yellow.png",
		label: "Golden Pulse",
		emotion:
			"This golden glow suggests your spirit is <span class='feeling'>curious</span>, <span class='feeling'>playful</span>, and reaching for <span class='feeling'>new ideas</span>.",
	},
	green: {
		path: "/textures/green.png",
		label: "Neon Sprout",
		emotion:
			"Under this calm hue, you might feel <span class='feeling'>peaceful</span> and <span class='feeling'>balanced</span>, as if exhaling into <span class='feeling'>serenity</span>.",
	},
	green2: {
		path: "/textures/green-2.png",
		label: "Olive Core",
		emotion:
			"Like sunlight through leaves, your energy feels <span class='feeling'>harmonious</span>, <span class='feeling'>centered</span>, and quietly <span class='feeling'>alive</span>.",
	},
	blue: {
		path: "/textures/blue.png",
		label: "Cobalt Echo",
		emotion:
			"In this clear shade, you rest within <span class='feeling'>tranquility</span> and <span class='feeling'>contentment</span>, letting still waters speak.",
	},
	blue2: {
		path: "/textures/blue-2.png",
		label: "Frosted Aqua",
		emotion:
			"A lighter blue hums with <span class='feeling'>serenity</span>, <span class='feeling'>ease</span>, and the gentle rhythm of <span class='feeling'>peace</span>.",
	},
	darkBlue: {
		path: "/textures/dark-blue.png",
		label: "Indigo Abyss",
		emotion:
			"Deep tones like this invite <span class='feeling'>introspection</span>, <span class='feeling'>depth</span>, and a quiet sense of <span class='feeling'>mystery</span>.",
	},
	purple: {
		path: "/textures/purple.png",
		label: "Auburn Twilight",
		emotion:
			"This royal hue carries <span class='feeling'>intuition</span>, <span class='feeling'>creativity</span>, and a pull toward <span class='feeling'>transformation</span>.",
	},
	purple2: {
		path: "/textures/purple-2.png",
		label: "Violet Vein",
		emotion:
			"Surrounded by violet light, you may feel <span class='feeling'>curious</span>, <span class='feeling'>imaginative</span>, and open to <span class='feeling'>possibility</span>.",
	},
	purple3: {
		path: "/textures/purple-3.png",
		label: "Amethyst Bloom",
		emotion:
			"A softer violet glow reveals <span class='feeling'>inspiration</span>, <span class='feeling'>inner magic</span>, and <span class='feeling'>dreamlike clarity</span>.",
	},
	pink: {
		path: "/textures/pink.png",
		label: "Rose Ember",
		emotion:
			"Warm blush tones suggest <span class='feeling'>tenderness</span>, <span class='feeling'>love</span>, and <span class='feeling'>emotional openness</span>.",
	},
	pink2: {
		path: "/textures/pink-2.png",
		label: "Pearl Blush",
		emotion:
			"In this pale hue, your mood feels <span class='feeling'>gentle</span>, <span class='feeling'>affectionate</span>, and quietly <span class='feeling'>hopeful</span>.",
	},
	red: {
		path: "/textures/red.png",
		label: "Crimson Ember",
		emotion:
			"The fire of this shade burns with <span class='feeling'>drive</span>, <span class='feeling'>passion</span>, and an urge to <span class='feeling'>move forward</span>.",
	},
	red2: {
		path: "/textures/red-2.png",
		label: "Molten Rust",
		emotion:
			"Like molten heat, your spirit glows with <span class='feeling'>courage</span>, <span class='feeling'>vitality</span>, and <span class='feeling'>bold desire</span>.",
	},
	orange: {
		path: "/textures/orange.png",
		label: "Amber Glow",
		emotion:
			"This vivid color radiates <span class='feeling'>enthusiasm</span>, <span class='feeling'>joy</span>, and a hunger for <span class='feeling'>connection</span>.",
	},
	orange2: {
		path: "/textures/orange-2.png",
		label: "Honey Brass",
		emotion:
			"A deeper amber warmth hints at <span class='feeling'>optimism</span>, <span class='feeling'>energy</span>, and the start of something <span class='feeling'>exciting</span>.",
	},
};

const textureLoader = new THREE.TextureLoader();

export const ringTextures = {};
for (const key in textureList) {
	// load textures
	ringTextures[key] = textureLoader.load(textureList[key].path);
	ringTextures[key].colorSpace = THREE.SRGBColorSpace;

	// add select component elements
	/*
		this is the structure 
		<li class="select-items">
			<img class="select-img" src="./textures/pink.png" />
			<span class="color-name">pink</span>
		</li>
	*/
	if (key !== "rainbow") {
		// 1- create the list item
		const li = document.createElement("li");
		li.setAttribute("class", "select-items");

		// 2- create an image
		const img = document.createElement("img");
		img.setAttribute("class", "select-img");
		img.setAttribute("src", textureList[key].path);
		li.appendChild(img);

		// 3- create span
		const span = document.createElement("span");
		span.setAttribute("class", "color-name");
		span.setAttribute("value", key);
		span.innerText = textureList[key].label;
		li.appendChild(span);

		listContainer.appendChild(li);
	}
}

listContainer.addEventListener("click", (e) => {
	const currentElement = e.target.closest("li");
	const clonedElement = currentElement.cloneNode(true);
	const colorElement = currentElement.querySelector(".color-name");

	if (colorElement.innerText) {
		// console.log(currentElement.innerText);
		const selected = colorElement.getAttribute("value");
		btnSelected.setAttribute("value", selected);

		btnSelected.innerHTML = "";
		btnSelected.appendChild(clonedElement);

		listContainer.classList.toggle("hide");
		feelingsDescription.classList.add("hide");
	}
});
