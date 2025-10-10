import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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

const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial()
);
scene.add(mesh);

const cameraControls = gui.addFolder("camera controls");
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 5;
scene.add(camera);

cameraControls
	.add(camera, "fov")
	.min(0)
	.max(360)
	.step(1)
	.name("field of view")
	.onChange(() => {
		camera.updateProjectionMatrix();
	});

// cameraControls
// 	.add(camera.position, "x")
// 	.min(-100)
// 	.max(100)
// 	.step(0.01)
// 	.name("x")
// 	.onChange(() => {
// 		camera.updateProjectionMatrix();
// 	});
// cameraControls
// 	.add(camera.position, "y")
// 	.min(-100)
// 	.max(100)
// 	.step(0.01)
// 	.name("y")
// 	.onChange(() => {
// 		camera.updateProjectionMatrix();
// 	});

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

window.addEventListener("resize", () => {
	size.width = window.innerWidth;
	size.height = window.innerHeight;

	camera.aspect = size.width / size.height;
	camera.updateProjectionMatrix();

	renderer.setSize(size.width, size.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
