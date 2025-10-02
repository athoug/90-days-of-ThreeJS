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
	title: "Rainbow Death Star",
});
const debugObject = {
	radius: 15,
	widthSegments: 32,
	heightSegments: 16,
	phiStart: 0,
	phiLength: Math.PI * 2,
	thetaStart: 0,
	thetaLength: Math.PI,
};

const scene = new THREE.Scene();
scene.background = new THREE.Color("#001");

const geometry = new THREE.SphereGeometry(
	debugObject.radius,
	debugObject.widthSegments,
	debugObject.heightSegments,
	debugObject.phiStart,
	debugObject.phiLength,
	debugObject.thetaStart
);
const material = new THREE.MeshNormalMaterial({
	// color: 0xffff00,
	wireframe: true,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// === debug builder ===
// position
gui.add(sphere.position, "x").min(-10).max(10).step(0.1).name("x-axis");
gui.add(sphere.position, "y").min(-10).max(10).step(0.1).name("y-axis");
gui.add(sphere.position, "z").min(-60).max(60).step(0.1).name("z-axis");
// visibility
gui.add(sphere, "visible");
gui.add(material, "wireframe");
// color
// gui.addColor(material);

const camera = new THREE.PerspectiveCamera(
	75,
	size.width / size.height,
	0.1,
	100
);
camera.position.z = 60;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
const tick = () => {
	controls.update();
	renderer.render(scene, camera);

	const timeElapsed = clock.getElapsedTime();

	sphere.rotation.z += Math.sin(timeElapsed) * 0.01;
	sphere.rotation.y += Math.cos(timeElapsed) * 0.01;

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
