import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");
const size = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const gui = new GUI({
	title: "cat control",
});

const scene = new THREE.Scene();
scene.background = new THREE.Color("#001");

const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(5, 5),
	new THREE.MeshStandardMaterial({
		side: THREE.DoubleSide,
	})
);
plane.rotation.x = Math.PI * 0.5;
plane.position.y = -1.5;
// scene.add(plane);

const cat = new THREE.Group();
scene.add(cat);

const head = new THREE.Mesh(
	new THREE.SphereGeometry(1.5, 64, 64),
	new THREE.MeshStandardMaterial()
);
cat.add(head);

const earGeometry = new THREE.ConeGeometry(0.55, 1, 3);
const earMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const earL = new THREE.Mesh(earGeometry, earMaterial);
earL.position.y = 1.75;
earL.position.z += 1;
earL.rotation.y = 0.75;
earL.rotation.z = 0.05;
cat.add(earL);

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 5;
// camera.position.y = 2;
// camera.position.x = 1;
scene.add(camera);

const ambientLight = new THREE.AmbientLight("#fff", 1);
scene.add(ambientLight);

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
