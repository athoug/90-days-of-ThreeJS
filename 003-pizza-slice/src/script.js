import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

const canvas = document.querySelector("canvas.webgl");

const gui = new GUI({
	width: 300,
	title: "Pizza controls",
});

const size = {
	with: window.innerWidth,
	height: window.innerHeight,
};

// 1. scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#001");

// 2.1 object - pizza crust
const shapeSettings = {
	length: 12,
	width: 8,
	color: "#eab162",
};

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, shapeSettings.width);
shape.lineTo(shapeSettings.length, shapeSettings.width);
shape.lineTo(shapeSettings.length, 0);
shape.lineTo(0, 0);

const extrudeSettings = {
	steps: 2,
	depth: 10,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 1,
	bevelOffset: 0,
	bevelSegments: 1,
};

const crustGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const crustMaterial = new THREE.MeshBasicMaterial({
	color: shapeSettings.color,
	wireframe: false,
});
const crust1 = new THREE.Mesh(crustGeometry, crustMaterial);
scene.add(crust1);

const crust2 = new THREE.Mesh(crustGeometry, crustMaterial);
crust2.position.x = -13;
crust2.position.y = -1.25;
crust2.rotation.z = 0.1;
scene.add(crust2);

const crust3 = new THREE.Mesh(crustGeometry, crustMaterial);
crust3.position.x = -25;
crust3.position.y = -3.7;
crust3.rotation.z = 0.2;
scene.add(crust3);

// gui controls
gui.add(crustMaterial, "wireframe");
gui.addColor(shapeSettings, "color").onChange(() => {
	crustMaterial.color.set(shapeSettings.color);
});

// 2.2 pizza middle
const triangleSettings = {
	length: 0,
	width: 18,
	color: "#eab162",
};
let triangle = new THREE.Shape();
triangle.moveTo(0, -50);
triangle.lineTo(triangleSettings.width, 0);
triangle.lineTo(-triangleSettings.width, triangleSettings.length);
triangle.lineTo(triangleSettings.length, -50);
triangle.lineTo(0, -50);

console.log(triangle.getPoints());

const triangleExtrudeSettings = {
	depth: 5,
	bevelEnabled: false,
};

const triangleGeometry = new THREE.ExtrudeGeometry(
	triangle,
	triangleExtrudeSettings
);
const triangleMaterial = new THREE.MeshBasicMaterial({
	color: triangleSettings.color,
	wireframe: false,
});
const triShape = new THREE.Mesh(triangleGeometry, triangleMaterial);
triShape.position.x = -6;
triShape.position.y = -1;
triShape.rotation.z = 0.1;

scene.add(triShape);

// const vertices = new Float32Array([-20, 1, 0, 0, -50, 0, 20, 1, 0]);
// const sliceGeometry = new THREE.BufferGeometry();
// sliceGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
// const sliceMaterial = new THREE.MeshBasicMaterial({
// 	color: shapeSettings.color,
// 	side: THREE.DoubleSide,
// });
// const mesh = new THREE.Mesh(sliceGeometry, sliceMaterial);

// mesh.position.y = -2;
// mesh.position.x = -7;
// mesh.rotation.z = 0.1;
// scene.add(mesh);

// 3. camera
const camera = new THREE.PerspectiveCamera(
	75,
	size.with / size.height,
	0.1,
	1000
);
camera.position.z = 80;
camera.position.y = -50;
scene.add(camera);

// 4. controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// 5. renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.with, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 6. animation function
const clock = new THREE.Clock();
const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// update controls
	controls.update();

	// update renderer
	renderer.render(scene, camera);

	// refresh (call the next function)
	window.requestAnimationFrame(tick);
};
tick();

// 7. resize window
window.addEventListener("resize", () => {
	// update size
	size.with = window.innerWidth;
	size.height = window.innerHeight;

	// update camera
	camera.aspect = size.with / size.height;
	camera.updateProjectionMatrix();

	// update renderer
	renderer.setSize(size.with, size.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
