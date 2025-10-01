import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");

const size = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const scene = new THREE.Scene();
scene.background = new THREE.Color("#001");

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
	color: 0x3789f0,
	// wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const camera = new THREE.PerspectiveCamera(
	75,
	size.width / size.height,
	0.1,
	100
);
camera.position.z = 5;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
	const distance = camera.position.distanceTo(cube.position);

	const maxDistance = 5; // where jitter is low
	const minDistance = 1; // where jitter is high

	// Calculate intensity (0 to 1, where 1 is most intense)
	const intensity = Math.max(
		0,
		Math.min(1, (maxDistance - distance) / (maxDistance - minDistance))
	);

	// jitter amount
	const jitterAmount = 0.2 * intensity;

	// add the shake
	cube.rotation.z += (Math.random() - 0.5) * jitterAmount;
	cube.rotation.x += (Math.random() - 0.5) * jitterAmount;
	cube.rotation.y += (Math.random() - 0.5) * jitterAmount;

	controls.update();
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", () => {
	// update the size variable
	size.width = window.innerWidth;
	size.height = window.innerHeight;

	// update the camera
	camera.aspect = size.width / size.height;
	camera.updateProjectionMatrix();

	// update renderer
	renderer.setSize(size.width, size.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
