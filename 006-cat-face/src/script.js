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

// 1 world unit is cm
const measurements = {
	head: 6,
	eye: 0.5,
	ear: {
		radius: 2.35,
		height: 6,
		radialSeg: 3,
		heightSeg: 1,
	},
};

const scene = new THREE.Scene();
scene.background = new THREE.Color("#001");

const axisHelper = new THREE.AxesHelper(25);
scene.add(axisHelper);

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

const catControls = gui.addFolder("cat");

const head = new THREE.Mesh(
	new THREE.SphereGeometry(measurements.head, 64, 32),
	new THREE.MeshStandardMaterial()
);
cat.add(head);

catControls
	.add(measurements, "head")
	.name("head size")
	.min(0.1)
	.max(10)
	.onChange((v) => {
		measurements.head = v;
		console.log(v);

		head.geometry.dispose();

		head.geometry = new THREE.SphereGeometry(measurements.head, 64, 32);
	});

const earGeometry = new THREE.ConeGeometry(
	measurements.ear.radius,
	measurements.ear.height,
	measurements.ear.radialSeg,
	measurements.ear.height
);
const earMaterial = new THREE.MeshStandardMaterial();
const earR = new THREE.Mesh(earGeometry, earMaterial);
earR.position.x = 3.15;
earR.position.y = 6.67;
earR.position.z = 1.64;
earR.rotation.x = 0.519999999999996;
earR.rotation.y = 0.930000000000007;
earR.rotation.z = -0.560000000000002;
cat.add(earR);

const earL = new THREE.Mesh(earGeometry, earMaterial);
earL.position.x = -4.7;
earL.position.y = 6.67;
earL.position.z = 1.64;
earL.rotation.x = -0.519999999999996;
earL.rotation.y = 0.930000000000007;
earL.rotation.z = 0.950000000000003;
cat.add(earL);

const eyeGeometry = new THREE.SphereGeometry(measurements.eye, 64, 32);
const eyeMaterial = new THREE.MeshStandardMaterial({ color: "#001" });
const eyeL = new THREE.Mesh(eyeGeometry, eyeMaterial);
eyeL.position.x = -2.05;
eyeL.position.z = 5.57;
cat.add(eyeL);

const eyeR = new THREE.Mesh(eyeGeometry, eyeMaterial);
eyeR.position.x = 2.05;
eyeR.position.z = 5.57;
cat.add(eyeR);

catControls.add(eyeL.position, "x").min(-10).max(10).step(0.01);
catControls.add(eyeL.position, "y").min(-10).max(10).step(0.01);
catControls.add(eyeL.position, "z").min(-10).max(10).step(0.01);

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 25;
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
