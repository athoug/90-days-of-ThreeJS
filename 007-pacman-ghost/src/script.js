import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");

const size = {
	width: window.innerWidth,
	height: window.innerHeight,
};

// To create a half-sphere, you typically adjust the thetaLength parameter.
// Math.PI represents 180 degrees, which is half of a full circle (2 * Math.PI).

const ghostMeasurements = {
	dome: {
		radius: 1,
		widthSegments: 32,
		heightSegments: 16,
		phiStart: 0,
		phiLength: Math.PI * 2,
		thetaStart: 0,
		thetaLength: Math.PI / 2,
	},
};

const gui = new GUI({
	title: "boo",
});
const scene = new THREE.Scene();
scene.background = new THREE.Color("#001");

// building the ghost
const ghosts = new THREE.Group();
scene.add(ghosts);

const ghostMaterial = new THREE.MeshStandardMaterial();

const domeGeometry = new THREE.SphereGeometry(
	ghostMeasurements.dome.radius,
	ghostMeasurements.dome.widthSegments,
	ghostMeasurements.dome.heightSegments,
	ghostMeasurements.dome.phiStart,
	ghostMeasurements.dome.phiLength,
	ghostMeasurements.dome.thetaStart,
	ghostMeasurements.dome.thetaLength
);
const bodyGeometry = new THREE.CylinderGeometry(1, 1, 2);

const ghostDome = new THREE.Mesh(domeGeometry, ghostMaterial);
ghostDome.position.y = 1;

const ghostBody = new THREE.Mesh(bodyGeometry, ghostMaterial);
ghosts.add(ghostDome, ghostBody);

const ambientLight = new THREE.AmbientLight("#fff", 1);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 8;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
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
	size.width = window.innerWidth;
	size.height = window.innerHeight;

	camera.aspect = size.width / size.height;
	camera.updateProjectionMatrix();

	renderer.setSize(size.width, size.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
