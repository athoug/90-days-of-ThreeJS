import * as THREE from "three";

const textureList = {
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
	ringTextures[key] = textureLoader.load(textureList[key]);
	ringTextures[key].colorSpace = THREE.SRGBColorSpace;
}
