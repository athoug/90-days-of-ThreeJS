import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");
const size = {
	with: window.innerWidth,
	height: window.innerHeight,
};

const gui = new GUI({
	title: "particle controls",
	width: 300,
});

// --- start ---
const scene = new THREE.Scene();

const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(),
	new THREE.MeshBasicMaterial()
);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
	75,
	size.with / size.height,
	0.1,
	100
);
camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.with, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
const tick = () => {
	const t = clock.getElapsedTime();

	controls.update();
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};
tick();

window.addEventListener("resize", () => {
	size.with = window.innerWidth;
	size.height = window.innerHeight;

	camera.aspect = size.with / size.height;
	camera.updateProjectionMatrix();

	renderer.setSize(size.with, size.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
