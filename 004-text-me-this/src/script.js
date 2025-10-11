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

const sceneControls = gui.addFolder("scene controls");
const scene = new THREE.Scene();
scene.background = new THREE.Color("#002");

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
// font magic happens here
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
	const textControls = gui.addFolder("text controls");
	const textGeometry = new TextGeometry(textData.text, {
		font,
		...textData,
	});

	textGeometry.center();

	textControls.add(textData, "text").onChange((v) => {
		text.geometry.dispose();

		text.geometry = new TextGeometry(v, {
			font,
			...textData,
		}).center();
	});
	const material = new THREE.MeshNormalMaterial();
	text = new THREE.Mesh(textGeometry, material);

	scene.add(text);
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

	if (text?.rotation) {
		text.rotation.x = time * 0.1;
		text.rotation.z = time * 0.1;
	}

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
