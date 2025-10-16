import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ringTextures } from "./texture";

const canvas = document.querySelector("canvas.webgl");

console.log(ringTextures);

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

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

gui.addColor(ambientLight, "color");
gui.add(ambientLight, "intensity").min(0).max(3).step(0.001);

// directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.y = 4;

// adjusting shadow property
directionalLight.castShadow = true;

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

const geometryRing = new THREE.TorusGeometry(1.15, 0.2, 20, 64);
const geometryInner = new THREE.TorusGeometry(1.11, 0.21, 6, 64);
const geometryOuter = new THREE.TorusGeometry(1.15, 0.1, 6, 64);

const materialRing = new THREE.MeshMatcapMaterial({
	matcap: ringTextures.gray,
});
const materialOuter = new THREE.MeshStandardMaterial();
materialRing.wireframe = false;

// === ring making ===
const ringGroup = new THREE.Group();
ringGroup.castShadow = true;

const outerRing1 = new THREE.Mesh(geometryOuter, materialOuter);
outerRing1.position.y = 1;
outerRing1.position.z = -0.2;
outerRing1.material.roughness = 0.1;
outerRing1.material.metalness = 0;
outerRing1.castShadow = true;

const ring = new THREE.Mesh(geometryRing, materialRing);
// ring.material.roughness = 0.1;
// ring.material.metalness = 0;
ring.castShadow = true;

ring.position.y = 1;

const insideRing = new THREE.Mesh(geometryInner, materialOuter);
insideRing.position.y = 1;
// insideRing.scale.set(0.9, 0.9, 0.9);
insideRing.material.roughness = 0.1;
insideRing.material.metalness = 0;

const outerRing2 = new THREE.Mesh(geometryOuter, materialOuter);
outerRing2.position.y = 1;
outerRing2.position.z = 0.2;
outerRing2.material.roughness = 0.1;
outerRing2.material.metalness = 0;
outerRing2.castShadow = true;

const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(6, 6),
	new THREE.MeshStandardMaterial({
		color: "#001",
		// side: THREE.DoubleSide,
	})
);

plane.receiveShadow = true;

plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -1;

ringGroup.add(outerRing1, ring, insideRing, outerRing2);
ringGroup.rotation.x = Math.PI * 0.25;

scene.add(ringGroup, plane);

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

	// ringGroup.rotation.x = timePassed;
	// ringGroup.rotation.y = timePassed * 0.15;
	// ringGroup.rotation.z = timePassed * 0.25;

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
