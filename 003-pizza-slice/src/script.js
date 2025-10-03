import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

const canvas = document.querySelector("canvas.webgl");

const gui = new GUI({
	width: 300,
	title: "Pizza controls",
});

const size = {
	with: window.innerWidth,
	height: window.innerHeight,
};

// 1. scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#001");

// 2. object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
	color: 0x47ff23,
	wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 3. camera
const camera = new THREE.PerspectiveCamera(
	75,
	size.with / size.height,
	0.1,
	100
);
camera.position.z = 3;
scene.add(camera);

// 4. controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// 5. renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.with, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 6. animation function
const clock = new THREE.Clock();
const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// update controls
	controls.update();

	// update renderer
	renderer.render(scene, camera);

	// refresh (call the next function)
	window.requestAnimationFrame(tick);
};
tick();

// 7. resize window
window.addEventListener("resize", () => {
	// update size
	size.with = window.innerWidth;
	size.height = window.innerHeight;

	// update camera
	camera.aspect = size.with / size.height;
	camera.updateProjectionMatrix();

	// update renderer
	renderer.setSize(size.with, size.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
