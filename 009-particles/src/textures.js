import * as THREE from "three";

const textures = {
	circle: "particles/1.png",
	ring: "particles/2.png",
	distortedCircle: "particles/3.png",
	star: "particles/4.png",
	bigStar: "particles/5.png",
	halfMoon: "particles/6.png",
	target: "particles/7.png",
};

const data = {};

const textureLoader = new THREE.TextureLoader();

for (let key in textures) {
	const txt = textureLoader.load(textures[key]);

	data[key] = txt;
}

console.log(data);
