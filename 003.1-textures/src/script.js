import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

const canvas = document.querySelector("canvas.webgl");

const size = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const gui = new GUI({
	width: 300,
	title: "object controls",
});

const scene = new THREE.Scene();
scene.background = new THREE.Color("#001");

// settings
const guiObject = {
	type: "sphere",
	wireframe: false,
	color: "#FFA500",
	map: "none",
};

const box = new THREE.BoxGeometry(1, 1, 1);
const sphere = new THREE.SphereGeometry(1, 32, 16);
const capsule = new THREE.CapsuleGeometry(1, 1, 4, 8);
const circle = new THREE.CircleGeometry(1, 32);
const cone = new THREE.ConeGeometry(1, 2, 32);
const cylinder = new THREE.CylinderGeometry(1, 1, 2, 32);
const plane = new THREE.PlaneGeometry(1, 1);
const ring = new THREE.RingGeometry(1, 2, 32);
const torus = new THREE.TorusGeometry(1, 0.4, 12, 48);
const torusKnot = new THREE.TorusKnotGeometry(1, 0.4, 64, 8);

const textureLoader = new THREE.TextureLoader();
const barkTexture = textureLoader.load("/bark/bark_07_baseColor_1k.png");
const cliffRockTexture = textureLoader.load(
	"/clif-rock/cliff_rocks_01_color_1k.png"
);
const floorTexture = textureLoader.load(
	"/floor/floor_tiles_16_basecolor_1k.png"
);
const grassTexture = textureLoader.load("/grass/ground_04_color_1k.png");
const groundTexture = textureLoader.load(
	"/ground/ground_with_rocks_03_color_1k.png"
);
const industrialWallTexture = textureLoader.load(
	"/industrial-wall/industrial_wall_02_baseColor_1k.png"
);
const metalTexture = textureLoader.load("/metal/metal_plates_01_color_1k.png");
const windowTexture = textureLoader.load("/window/window_01_baseColor_1k.png");
const woodTexture = textureLoader.load("/wood/wood_planks_12_color_1k.png");

// list of textures
const textureObject = {
	none: null,
	bark: barkTexture,
	cliff: cliffRockTexture,
	floor: floorTexture,
	grass: grassTexture,
	ground: groundTexture,
	industrial: industrialWallTexture,
	metal: metalTexture,
	window: windowTexture,
	wood: woodTexture,
};

// update the color space
for (const texture in textureObject) {
	if (!textureObject[texture]) continue;
	textureObject[texture].colorSpace = THREE.SRGBColorSpace;
}

const material = new THREE.MeshBasicMaterial({
	color: guiObject.color,
	wireframe: guiObject.wireframe,
	map: textureObject[guiObject.map],
});

// list of geometries
const geometryObject = {
	box,
	sphere,
	capsule,
	circle,
	cone,
	cylinder,
	plane,
	ring,
	torus,
	torusKnot,
};

const mesh = new THREE.Mesh(geometryObject[guiObject.type], material);
scene.add(mesh);

gui.add(guiObject, "wireframe").onChange((value) => {
	material.wireframe = value;
});

gui.addColor(guiObject, "color").onChange(() => {
	material.color.set(guiObject.color);
});

gui
	.add(guiObject, "type", [
		"box",
		"sphere",
		"capsule",
		"circle",
		"cone",
		"cylinder",
		"plane",
		"ring",
		"torus",
		"torusKnot",
	])
	.name("geometry type")
	.onChange((value) => {
		mesh.geometry.dispose();

		mesh.geometry = geometryObject[value];
	});

gui
	.add(guiObject, "map", [
		"none",
		"bark",
		"cliff",
		"floor",
		"grass",
		"ground",
		"industrial",
		"metal",
		"window",
		"wood",
	])
	.name("texture type")
	.onChange((value) => {
		mesh.material.map = textureObject[value];
		mesh.material.needsUpdate = true;
	});

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 5;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	controls.update();
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", () => {
	size.width = window.innerWidth;
	size.height = window.innerHeight;

	camera.aspect = size.width / size.height;
	camera.updateProjectionMatrix();

	renderer.setSize(size.width, size.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
