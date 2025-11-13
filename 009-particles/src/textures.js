import * as THREE from "three";

const textures = {
	circle: "particles/1.png",
	ring: "particles/2.png",
	distortedCircle: "particles/3.png",
	star: "particles/4.png",
	bigStar: "particles/5.png",
	bubble: "particles/6.png",
	target: "particles/7.png",
	brightStar: "particles/8.png",
	thinStar: "particles/9.png",
	heart: "particles/10.png",
	cartoonStar: "particles/11.png",
	rainDrop: "particles/12.png",
	thickRainDrop: "particles/13.png",
};

export const data = {};
export const textureNames = [];

const textureLoader = new THREE.TextureLoader();

for (let key in textures) {
	const txt = textureLoader.load(textures[key]);

	data[key] = txt;
	textureNames.push(key);
}
