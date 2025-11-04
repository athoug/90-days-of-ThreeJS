import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ballTypes, planeTypes } from "./textures";

const canvas = document.querySelector("canvas.webgl");
const gui = new GUI({
	title: "ball controls",
});
const size = {
	width: window.innerWidth,
	height: window.innerHeight,
	ball: {
		basketball: 0.45,
		beachball: 0.45,
		tennisball: 0.12,
		baseball: 0.14,
	},
};

const scene = new THREE.Scene();
scene.background = new THREE.Color("#001");
// scene.background = new THREE.Color("#fff");

const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(5, 5, 100, 100),
	new THREE.MeshStandardMaterial({
		side: THREE.DoubleSide,
	})
);

plane.receiveShadow = true;
plane.rotation.x = -Math.PI * 0.5;

const ball = new THREE.Mesh(
	new THREE.SphereGeometry(size.ball[ballTypes.selected], 32, 16),
	new THREE.MeshStandardMaterial()
);

ball.position.y = size.ball[ballTypes.selected];
ball.castShadow = true;
ball.receiveShadow = true;

updateMaterials(ballTypes.selected, true);
scene.add(plane, ball);

// lighting
const ambientLight = new THREE.AmbientLight("#fff", 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#fff", 1);
directionalLight.position.y = 3;

// shadow stuff
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;

directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 4;

directionalLight.shadow.camera.top = 3;
directionalLight.shadow.camera.right = 3;
directionalLight.shadow.camera.bottom = -3;
directionalLight.shadow.camera.left = -3;

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

const ballControls = {
	r: 1.5,
	speed: 0.04,
	direction: 1,
	rotationSpeed: 0.01,
	bounceHeight: 2,
};

const timer = new THREE.Timer();
timer.connect(document);

const tick = () => {
	timer.update();
	const t = timer.getElapsed();

	if (
		ball.position.y > ballControls.bounceHeight ||
		ball.position.y < size.ball[ballTypes.selected]
	) {
		ballControls.direction *= -1;
	}
	ball.position.x = Math.cos(t) * ballControls.r;
	ball.position.z = Math.sin(t) * ballControls.r;
	ball.position.y += ballControls.speed * ballControls.direction;

	ball.rotation.x += ballControls.rotationSpeed;
	ball.rotation.y += ballControls.rotationSpeed;
	ball.rotation.z += ballControls.rotationSpeed;

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

function updateMaterials(e, firstRender = false) {
	if (!firstRender) {
		ball.geometry.dispose();
		ball.geometry = new THREE.SphereGeometry(size.ball[e], 32, 16);
		ball.position.y = size.ball[e];
	}

	for (const [key, value] of Object.entries(ballTypes[e])) {
		ball.material[key] = value;
		if (key === "alphaMap") {
			ball.material.transparent = true;
		} else {
			ball.material.transparent = false;
		}
	}

	for (const [key, value] of Object.entries(planeTypes[ballTypes.selected])) {
		plane.material[key] = value;
		if (key === "displacementMap") {
			plane.material.displacementScale = 0.3;
			plane.material.displacementBias = -0.2;
		}
	}
}

// gui controls
gui
	.add(ballTypes, "selected", [
		"basketball",
		"tennis ball",
		"baseball",
		"beach ball",
	])
	.name("ball type")
	.onChange((e) => {
		ballTypes.selected = e.replace(" ", "");

		updateMaterials(ballTypes.selected);
	});

gui.add(ballControls, "r").min(1).max(2).step(0.01).name("ball radius");

gui
	.add(ballControls, "speed")
	.min(0.01)
	.max(0.5)
	.step(0.001)
	.name("bounce speed");

gui
	.add(ballControls, "rotationSpeed")
	.min(0.01)
	.max(0.2)
	.step(0.001)
	.name("ball rotation");

gui
	.add(ballControls, "bounceHeight")
	.min(1)
	.max(3)
	.step(0.001)
	.name("bounce height");
