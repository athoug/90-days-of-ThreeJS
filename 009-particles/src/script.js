import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { data, textureNames } from "./textures";

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

// for particles I need 3 things

// 1. a geometry
const particlesData = {
	count: 5000,
	radius: 10,
	color: "#ff5395",
	texture: data[textureNames[0]],
	size: 0.02,
};

const positions = new Float32Array(particlesData.count * 3); // multiplied by 3 because each point holds 3 values the x, y and z of a point

for (let i = 0; i < positions.length; i++) {
	positions[i] = (Math.random() - 0.5) * particlesData.radius;
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

// 2. a point material
const material = new THREE.PointsMaterial({
	size: particlesData.size,
	sizeAttenuation: true,
	color: particlesData.color,
	transparent: true,
	alphaMap: particlesData.texture,
	depthWrite: false,
});

// 3. points
const particles = new THREE.Points(geometry, material);
scene.add(particles);

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

// setting up the GUI
gui
	.add(particlesData, "size")
	.onChange((v) => {
		particles.material.size = v;
	})
	.min(0.0001)
	.max(2)
	.step(0.001)
	.name("particle size");

gui.addColor(particlesData, "color").onChange((v) => {
	const color = new THREE.Color(v);
	particles.material.color = color;
});
