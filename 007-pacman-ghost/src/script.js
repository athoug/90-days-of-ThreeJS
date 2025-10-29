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
	leg: {
		radius: 0.25,
		widthSegments: 32,
		heightSegments: 16,
		phiStart: 0,
		phiLength: Math.PI * 2,
		thetaStart: 0,
		thetaLength: Math.PI / 2,
	},
	eye: {
		radius: 0.25,
		widthSegments: 32,
		heightSegments: 16,
		phiStart: 0,
		phiLength: Math.PI * 2,
		thetaStart: 0,
		thetaLength: Math.PI / 2,
	},
	eyeDot: {
		radius: 0.1,
		widthSegments: 32,
		heightSegments: 16,
		phiStart: 0,
		phiLength: Math.PI * 2,
		thetaStart: 0,
		thetaLength: Math.PI / 2,
	},
};

const ghosts = [
	{
		color: "#cc7e14",
		position: {
			x: -4,
		},
		multiplier: 1,
		speed: 0.02,
		mesh: null,
	},
	{
		color: "#4CABCA",
		position: {
			x: -1,
		},
		multiplier: 1,
		speed: 0.017,
		mesh: null,
	},
	{
		color: "#C680A9",
		position: {
			x: 2,
		},
		multiplier: 1,
		speed: 0.014,
		mesh: null,
	},
	{
		color: "#C31E13",
		position: {
			x: 5,
		},
		multiplier: 1,
		speed: 0.011,
		mesh: null,
	},
];

// const gui = new GUI({
// 	title: "boo",
// });

const scene = new THREE.Scene();
scene.background = new THREE.Color("#002");

// building the ghost

const domeGeometry = new THREE.SphereGeometry(
	ghostMeasurements.dome.radius,
	ghostMeasurements.dome.widthSegments,
	ghostMeasurements.dome.heightSegments,
	ghostMeasurements.dome.phiStart,
	ghostMeasurements.dome.phiLength,
	ghostMeasurements.dome.thetaStart,
	ghostMeasurements.dome.thetaLength
);

const legGeometry = new THREE.SphereGeometry(
	ghostMeasurements.leg.radius,
	ghostMeasurements.leg.widthSegments,
	ghostMeasurements.leg.heightSegments,
	ghostMeasurements.leg.phiStart,
	ghostMeasurements.leg.phiLength,
	ghostMeasurements.leg.thetaStart,
	ghostMeasurements.leg.thetaLength
);

const eyeGeometry = new THREE.SphereGeometry(
	ghostMeasurements.eye.radius,
	ghostMeasurements.eye.widthSegments,
	ghostMeasurements.eye.heightSegments,
	ghostMeasurements.eye.phiStart,
	ghostMeasurements.eye.phiLength,
	ghostMeasurements.eye.thetaStart,
	ghostMeasurements.eye.thetaLength
);

const eyeDotGeometry = new THREE.SphereGeometry(
	ghostMeasurements.eyeDot.radius,
	ghostMeasurements.eyeDot.widthSegments,
	ghostMeasurements.eyeDot.heightSegments,
	ghostMeasurements.eyeDot.phiStart,
	ghostMeasurements.eyeDot.phiLength,
	ghostMeasurements.eyeDot.thetaStart,
	ghostMeasurements.eyeDot.thetaLength
);

const bodyGeometry = new THREE.CylinderGeometry(1, 1, 2);

const buildGhost = (color) => {
	const newGhost = new THREE.Group();

	const ghostMaterial = new THREE.MeshStandardMaterial({
		color,
		metalness: 0.1,
		roughness: 0.5,
	});
	const ghostDome = new THREE.Mesh(domeGeometry, ghostMaterial);
	ghostDome.position.y = 1;

	const ghostBody = new THREE.Mesh(bodyGeometry, ghostMaterial);

	// legs
	const legs = new THREE.Group();
	const legMaterial = new THREE.MeshStandardMaterial({
		side: THREE.DoubleSide,
		color,
		metalness: 0.1,
		roughness: 0.5,
	});
	const legNumber = 8;
	for (let i = 0; i < legNumber; i++) {
		const ghostLeg = new THREE.Mesh(legGeometry, legMaterial);

		ghostLeg.rotation.x = Math.PI;
		ghostLeg.position.x = Math.cos(((2 * Math.PI) / legNumber) * i) * 0.75;
		ghostLeg.position.z = Math.sin(((2 * Math.PI) / legNumber) * i) * 0.75;
		ghostLeg.position.y = -1;

		legs.add(ghostLeg);
	}

	// eyes
	const ghostEyes = new THREE.Group();

	const ghostEyeWL = new THREE.Mesh(
		eyeGeometry,
		new THREE.MeshBasicMaterial({
			side: THREE.DoubleSide,
			color: "white",
		})
	);

	ghostEyeWL.position.x = -0.5;
	ghostEyeWL.position.y = 0.5;
	ghostEyeWL.position.z = 0.85;
	ghostEyeWL.rotation.x = Math.PI / 2;

	const ghostDotL = new THREE.Mesh(
		eyeDotGeometry,
		new THREE.MeshStandardMaterial({
			side: THREE.DoubleSide,
			color: "#183ac4",
		})
	);

	ghostDotL.position.x = -0.5;
	ghostDotL.position.y = 0.5;
	ghostDotL.position.z = 0.88 + 0.2;
	ghostDotL.rotation.x = Math.PI / 2;

	const ghostEyeWR = new THREE.Mesh(
		eyeGeometry,
		new THREE.MeshBasicMaterial({
			side: THREE.DoubleSide,
			color: "white",
		})
	);

	ghostEyeWR.position.x = 0.5;
	ghostEyeWR.position.y = 0.5;
	ghostEyeWR.position.z = 0.85;
	ghostEyeWR.rotation.x = Math.PI / 2;

	const ghostDotR = new THREE.Mesh(
		eyeDotGeometry,
		new THREE.MeshStandardMaterial({
			side: THREE.DoubleSide,
			color: "#183ac4",
		})
	);

	ghostDotR.position.x = 0.5;
	ghostDotR.position.y = 0.5;
	ghostDotR.position.z = 0.88 + 0.2;
	ghostDotR.rotation.x = Math.PI / 2;

	ghostEyes.add(ghostEyeWL, ghostDotL, ghostEyeWR, ghostDotR);

	newGhost.add(ghostDome, ghostEyes, ghostBody, legs);

	return newGhost;
};

for (const i in ghosts) {
	const ghost = buildGhost(ghosts[i].color);
	ghost.position.x = ghosts[i].position.x;

	ghosts[i].mesh = ghost;
	scene.add(ghost);
}

const ambientLight = new THREE.AmbientLight("#fff", 3);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 10;
camera.position.x = -0.5;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
	for (const ghost of ghosts) {
		if (ghost.mesh.position.y > 2 || ghost.mesh.position.y < -1) {
			ghost.multiplier *= -1;
		}
		ghost.mesh.position.y += ghost.speed * ghost.multiplier;
	}
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
