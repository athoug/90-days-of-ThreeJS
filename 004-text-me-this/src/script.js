import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

const words = [
	"coding is \ncreativity",
	"sometimes \ncode can \nbe therapy",
	"when coed \nmake sense you \nunderstand the matrix",
];
const canvas = document.querySelector("canvas.webgl");

const gui = new GUI({
	width: 300,
	title: "let's text controls",
});
const size = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();

const sceneControls = gui.addFolder("scene controls");
const scene = new THREE.Scene();
scene.background = new THREE.Color("#002");
// scene.background = textureLoader.load("/env/1.png");

sceneControls.addColor(scene, "background");

const textData = {
	text: words[Math.floor(Math.random() * words.length)],
	size: 0.5,
	depth: 0.2, // this is the height property
	curveSegments: 5,
	bevelEnabled: true,
	bevelThickness: 0.03,
	bevelSize: 0.02,
	bevelOffset: 0,
	bevelSegments: 4,
};

let text;
let textPosition;
const texture = textureLoader.load("textures/12.png");
texture.colorSpace = THREE.SRGBColorSpace;
// font magic happens here
const fontLoader = new FontLoader();
// === font stuff ===
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
	const textControls = gui.addFolder("text controls");
	const textGeometry = new TextGeometry(textData.text, {
		font,
		...textData,
	});

	textGeometry.center();
	textGeometry.computeBoundingBox();
	textPosition = textGeometry.boundingBox;
	console.log(textGeometry.boundingBox);

	textControls.add(textData, "text").onChange((textValue) => {
		text.geometry.dispose();

		text.geometry = new TextGeometry(textValue, {
			font,
			...textData,
		}).center();
	});
	const material = new THREE.MeshMatcapMaterial({
		matcap: texture,
	});
	text = new THREE.Mesh(textGeometry, material);

	scene.add(text);

	// === objects stuff ===

	const ring = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
	const box = new THREE.BoxGeometry(1, 1, 1);
	for (let i = 0; i < 100; i++) {
		const object = Math.random() < 0.5 ? box : ring;
		const donut = new THREE.Mesh(object, material);

		// add randomness in the position
		donut.position.x = computePositions("x");
		donut.position.y = computePositions("y");
		donut.position.z = computePositions("z");

		// let's change the rotation
		donut.rotation.x = Math.random() * Math.PI;
		donut.rotation.y = Math.random() * Math.PI;

		// add randomness to the size
		const scale = Math.random();
		donut.scale.set(scale, scale, scale);

		scene.add(donut);
	}
});

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 10;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
const tick = () => {
	const time = clock.getElapsedTime();

	controls.update();
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};
tick();

function computePositions(positionAxis = "x") {
	const location = {
		x: [textPosition?.min.x, textPosition?.max.x],
		y: [textPosition?.min.y, textPosition?.max.y],
		z: [textPosition?.min.z, textPosition?.max.z],
	};

	let randomPosition;
	let count = 0;
	let maxAttempts = 100;

	do {
		randomPosition = (Math.random() - 0.5) * 20;
		count += 1;

		if (count > maxAttempts) {
			console.warn("Max attempts reached, using fallback position");
			// Fallback: place it far from the text
			randomPosition = location[positionAxis][1] + 2;
			break;
		}
	} while (
		randomPosition > location[positionAxis][0] &&
		randomPosition < location[positionAxis][1]
	);

	return randomPosition;
}

window.addEventListener("resize", () => {
	size.width = window.innerWidth;
	size.height = window.innerHeight;

	camera.aspect = size.width / size.height;
	camera.updateProjectionMatrix();

	renderer.setSize(size.width, size.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
