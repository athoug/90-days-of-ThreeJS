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
	ball: {
		r: 0.45,
	},
};

const scene = new THREE.Scene();
scene.background = new THREE.Color("#001");

const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(5, 5),
	new THREE.MeshStandardMaterial({
		side: THREE.DoubleSide,
		color: new THREE.Color(
			0.00392156862745098,
			0.00392156862745098,
			0.01568627450980392
		),
	})
);

plane.receiveShadow = true;
plane.rotation.x = -Math.PI * 0.5;

gui
	.addColor(plane.material, "color")
	.name("color")
	.onChange((e) => {
		const color = new THREE.Color(e);
		console.log(color);
	});
gui.add(plane.rotation, "x").name("rotation").min(-4).max(4).step(0.001);

const ball = new THREE.Mesh(
	new THREE.SphereGeometry(size.ball.r, 32, 16),
	new THREE.MeshStandardMaterial({
		color: "red",
	})
);
ball.position.y = size.ball.r;
ball.castShadow = true;
ball.receiveShadow = true;

scene.add(plane, ball);

const ambientLight = new THREE.AmbientLight("#fff", 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#fff", 1);
directionalLight.position.y = 3;

// shadow stuff
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512;

directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 4;

directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;

scene.add(directionalLight);

const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(cameraHelper);

const camera = new THREE.PerspectiveCamera(
	75,
	size.width / size.height,
	0.1,
	100
);
camera.position.y = 5;
camera.position.z = 5;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

const r = 1.5;
const speedControl = 0.04;
let direction = 1;

const timer = new THREE.Timer();
timer.connect(document);

const tick = () => {
	timer.update();
	const t = timer.getElapsed();

	if (ball.position.y > 2 || ball.position.y < 0.45) {
		direction *= -1;
	}
	ball.position.x = Math.cos(t) * r;
	ball.position.z = Math.sin(t) * r;
	ball.position.y += speedControl * direction;

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
