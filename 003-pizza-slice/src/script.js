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

// 1.1 create a group
const pizza = new THREE.Group();

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
pizza.add(crust1);

const crust2 = new THREE.Mesh(crustGeometry, crustMaterial);
crust2.position.x = -13;
crust2.position.y = -1.25;
crust2.rotation.z = 0.1;
pizza.add(crust2);

const crust3 = new THREE.Mesh(crustGeometry, crustMaterial);
crust3.position.x = -25;
crust3.position.y = -3.7;
crust3.rotation.z = 0.2;
pizza.add(crust3);

// gui controls
// gui.add(crustMaterial, "wireframe");
gui
	.addColor(shapeSettings, "color")
	.name("crust")
	.onChange(() => {
		crustMaterial.color.set(shapeSettings.color);
		triangleMaterial.color.set(shapeSettings.color);
	});

// 2.2 pizza middle
const triangleSettings = {
	length: 0,
	width: 18,
	color: "#eab162",
	cheeseColor: "#f5e5ad",
};
let triangle = new THREE.Shape();
triangle.moveTo(0, -50);
triangle.lineTo(triangleSettings.width, 0);
triangle.lineTo(-triangleSettings.width, triangleSettings.length);
triangle.lineTo(triangleSettings.length, -50);
triangle.lineTo(0, -50);

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

pizza.add(triShape);

// 2.3 Cheese pizza middle
const cheeseExtrudeSettings = {
	depth: 2,
	bevelEnabled: false,
};

const cheeseGeometry = new THREE.ExtrudeGeometry(
	triangle,
	cheeseExtrudeSettings
);

const cheeseMaterial = new THREE.MeshBasicMaterial({
	color: triangleSettings.cheeseColor,
	wireframe: false,
});

const cheeseShape = new THREE.Mesh(cheeseGeometry, cheeseMaterial);
cheeseShape.position.z = 5;
cheeseShape.position.x = -6;
cheeseShape.position.y = -1;
cheeseShape.rotation.z = 0.1;

pizza.add(cheeseShape);

gui
	.addColor(triangleSettings, "cheeseColor")
	.name("cheese")
	.onChange(() => {
		cheeseMaterial.color.set(triangleSettings.cheeseColor);
	});

// 2.4 peperoni
const peperoniSettings = {
	big: 4,
	small: 3,
	color: "#bf5c4c",
};
const peperoniBigGeometry = new THREE.CylinderGeometry(
	peperoniSettings.big,
	peperoniSettings.big,
	1,
	32
);
const peperoniSmallGeometry = new THREE.CylinderGeometry(
	peperoniSettings.small,
	peperoniSettings.small,
	1,
	32
);
const peperoniMaterial = new THREE.MeshBasicMaterial({
	color: peperoniSettings.color,
});

const peperoni1 = new THREE.Mesh(peperoniBigGeometry, peperoniMaterial);
peperoni1.position.z = 7.5;
peperoni1.position.y = -13;
peperoni1.rotation.x = -1.55;
pizza.add(peperoni1);

const peperoni2 = new THREE.Mesh(peperoniSmallGeometry, peperoniMaterial);
peperoni2.position.z = 7.5;
peperoni2.position.y = -20;
peperoni2.position.x = -10;
peperoni2.rotation.x = -1.55;
pizza.add(peperoni2);

const peperoni3 = new THREE.Mesh(peperoniSmallGeometry, peperoniMaterial);
peperoni3.position.z = 7.5;
peperoni3.position.y = -9;
peperoni3.position.x = -11;
peperoni3.rotation.x = -1.55;
pizza.add(peperoni3);

const peperoni4 = new THREE.Mesh(peperoniBigGeometry, peperoniMaterial);
peperoni4.position.z = 7.5;
peperoni4.position.y = -28;
peperoni4.rotation.x = -1.55;
peperoni4.position.x = -2;

pizza.add(peperoni4);

const peperoni5 = new THREE.Mesh(peperoniSmallGeometry, peperoniMaterial);
peperoni5.position.z = 7.5;
peperoni5.position.y = -39;
peperoni5.position.x = -2;
peperoni5.rotation.x = -1.55;
pizza.add(peperoni5);

gui
	.addColor(peperoniSettings, "color")
	.name("peperoni")
	.onChange(() => {
		peperoniMaterial.color.set(peperoniSettings.color);
	});

pizza.position.y = 30;
scene.add(pizza);
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

	// rotate
	pizza.rotation.y += Math.sin(elapsedTime) * 0.001 * (Math.PI * 2);
	pizza.rotation.z += Math.cos(elapsedTime) * 0.001 * (Math.PI * 2);

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
