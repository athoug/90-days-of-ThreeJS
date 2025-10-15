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
// scene.background = new THREE.Color("#002");

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

gui.addColor(ambientLight, "color");
gui.add(ambientLight, "intensity").min(0).max(3).step(0.001);

// directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.castShadow = true;
directionalLight.position.y = 4;

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

directionalLight.shadow.camera.top = 3.5;
directionalLight.shadow.camera.right = 3.5;
directionalLight.shadow.camera.bottom = -3.5;
directionalLight.shadow.camera.left = -3.5;

directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;

console.log(directionalLight.shadow.camera);

scene.add(directionalLight);

const cameraHelperDirectional = new THREE.CameraHelper(
	directionalLight.shadow.camera
);
// scene.add(cameraHelperDirectional);

const geometry = new THREE.TorusGeometry(1, 0.3, 32, 64);
const material = new THREE.MeshStandardMaterial();
material.wireframe = false;

const ring = new THREE.Mesh(geometry, material);
ring.material.roughness = 0.1;
ring.material.metalness = 0;
ring.castShadow = true;

ring.position.y = 1;

gui.add(ring.material, "roughness").min(0).max(100).step(0.001);
gui.add(ring.material, "metalness").min(0).max(1).step(0.001);

const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(6, 6),
	new THREE.MeshStandardMaterial({
		// side: THREE.DoubleSide,
	})
);

plane.receiveShadow = true;

plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -1;

scene.add(ring, plane);

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 6;
camera.position.y = 2;
camera.position.x = 2;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

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
