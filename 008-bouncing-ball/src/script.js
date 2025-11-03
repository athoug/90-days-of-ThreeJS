import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");
const gui = new GUI({
	title: "ball controls",
});
const size = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const scene = new THREE.Scene();
scene.background = new THREE.Color("#fff");

const ball = new THREE.Mesh(
	new THREE.SphereGeometry(0.5, 32, 64),
	new THREE.MeshStandardMaterial()
);
scene.add(ball);

const ambientLight = new THREE.AmbientLight("#fff", 1);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(
	75,
	size.width / size.height,
	0.1,
	100
);
camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
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
