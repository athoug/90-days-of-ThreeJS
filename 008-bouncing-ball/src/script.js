import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const textureLoader = new THREE.TextureLoader();
const basketTexture = textureLoader.load("./balls/basketBall.png");
const tennisColor = textureLoader.load("./balls/tennis/NewTennisBallColor.jpg");
const tennisBump = textureLoader.load("./balls/tennis/TennisBallBump.jpg");

const baseColor = textureLoader.load("./balls/baseball/SoftballColor.jpg");
const baseBump = textureLoader.load("./balls/baseball/SoftballBump.jpg");

basketTexture.colorSpace = THREE.SRGBColorSpace;
tennisColor.colorSpace = THREE.SRGBColorSpace;
baseColor.colorSpace = THREE.SRGBColorSpace;

const canvas = document.querySelector("canvas.webgl");
const gui = new GUI({
	title: "ball controls",
});
const size = {
	width: window.innerWidth,
	height: window.innerHeight,
	ball: {
		basketball: 0.45,
		tennisball: 0.12,
		baseball: 0.14,
	},
};

const ballTypes = {
	selected: "basketball",
	basketball: {
		map: basketTexture,
	},
	tennisball: {
		map: tennisColor,
		bumpMap: tennisBump,
	},
	baseball: {
		map: baseColor,
		bumpMap: baseBump,
	},
};

const scene = new THREE.Scene();
// scene.background = new THREE.Color("#001");
scene.background = new THREE.Color("#fff");

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

const ball = new THREE.Mesh(
	new THREE.SphereGeometry(size.ball.basketball, 32, 16),
	new THREE.MeshStandardMaterial({
		map: basketTexture,
	})
);
ball.position.y = size.ball.basketball;
ball.castShadow = true;
ball.receiveShadow = true;

scene.add(plane, ball);

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

const updateBall = (e) => {
	ball.geometry.dispose();
	ball.geometry = new THREE.SphereGeometry(size.ball[e], 32, 16);
	ball.position.y = size.ball[e];

	for (const [key, value] of Object.entries(ballTypes[e])) {
		ball.material[key] = value;
	}
};

// gui controls
gui
	.add(ballTypes, "selected", ["basketball", "tennis ball", "baseball"])
	.name("ball type")
	.onChange((e) => {
		ballTypes.selected = e.replace(" ", "");
		console.log(ballTypes.selected);

		updateBall(ballTypes.selected);
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
