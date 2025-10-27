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

const gui = new GUI({
	title: "boo",
});
const scene = new THREE.Scene();
scene.background = new THREE.Color("#002");

// building the ghost
const ghosts = new THREE.Group();
scene.add(ghosts);

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
	});
	const ghostDome = new THREE.Mesh(domeGeometry, ghostMaterial);
	ghostDome.position.y = 1;

	const ghostBody = new THREE.Mesh(bodyGeometry, ghostMaterial);

	// legs
	const legs = new THREE.Group();
	const legNumber = 8;
	for (let i = 0; i < legNumber; i++) {
		const ghostLeg = new THREE.Mesh(
			legGeometry,
			new THREE.MeshStandardMaterial({
				side: THREE.DoubleSide,
				color,
			})
		);

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

const ghost1 = buildGhost("#cc7e14");
const ghost2 = buildGhost("#4CABCA");
const ghost3 = buildGhost("#C680A9");
const ghost4 = buildGhost("#C31E13");

ghost1.position.x = -4;
ghost2.position.x = -1;
ghost3.position.x = 2;
ghost4.position.x = 5;

ghosts.add(ghost1, ghost2, ghost3, ghost4);

const ambientLight = new THREE.AmbientLight("#fff", 4);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 8;
camera.position.x = -0.5;
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
