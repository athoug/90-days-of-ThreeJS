import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");

const size = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const gui = new GUI({
	title: "mood controls",
	width: 300,
});

const scene = new THREE.Scene();
scene.background = new THREE.Color("#002");

const geometry = new THREE.TorusGeometry(1, 0.3, 32, 64);
const material = new THREE.MeshBasicMaterial();
material.wireframe = true;
const ring = new THREE.Mesh(geometry, material);
scene.add(ring);

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 4;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.render(scene, camera);

const clock = new THREE.Clock();
const tick = () => {
	const timePassed = clock.getElapsedTime();

	ring.rotation.x = timePassed * 0.1;
	ring.rotation.y = timePassed * 0.15;
	ring.rotation.z = timePassed * 0.25;

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
