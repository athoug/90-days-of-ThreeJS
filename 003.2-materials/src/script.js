import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import * as Textures from "./textures";

const canvas = document.querySelector("canvas.webgl");

const textures = ["pillar", "stone", "industrial", "metal", "hay"];

const textureData = {
	pillar: Textures.pillarDataTextures,
	stone: Textures.stoneDataTextures,
	industrial: Textures.industrialTextures,
	metal: Textures.metalTextures,
	hay: Textures.hayTextures,
};

const size = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const gui = new GUI({
	width: 300,
	title: "Materials",
});

const scene = new THREE.Scene();
scene.background = new THREE.Color("#002");

const ambientLight = new THREE.AmbientLight("#ffffff", 1);
const lightTweaks = gui.addFolder("Light Tweaks");
lightTweaks.addColor(ambientLight, "color").name("Ambient light color");
lightTweaks
	.add(ambientLight, "intensity")
	.name("Ambient light intensity")
	.min(0)
	.max(1)
	.step(0.01);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

lightTweaks.addColor(pointLight, "color").name("Point light color");
lightTweaks
	.add(pointLight, "intensity")
	.name("Point light intensity")
	.min(0)
	.max(100)
	.step(0.01);

lightTweaks
	.add(pointLight.position, "x")
	.name("Point light x")
	.min(-100)
	.max(100)
	.step(0.1);

lightTweaks
	.add(pointLight.position, "y")
	.name("Point light y")
	.min(-100)
	.max(100)
	.step(0.1);

lightTweaks
	.add(pointLight.position, "z")
	.name("Point light z")
	.min(-100)
	.max(100)
	.step(0.1);

scene.add(pointLight);

const sphereControls = {
	radius: 1,
	widthSegments: 32,
	heightSegments: 16,
	phiStart: 0,
	phiLength: Math.PI * 2,
	thetaStart: 0,
	thetaLength: Math.PI,
};

const adjustments = {
	radius: [1, 30, 0.1],
	widthSegments: [3, 64, 1],
	heightSegments: [2, 32, 1],
	phiStart: [0, 6.28, 0.01],
	phiLength: [0, 6.28, 0.01],
	thetaStart: [0, 6.28, 0.01],
	thetaLength: [0, 6.28, 0.01],
};
const sphereTweaks = gui.addFolder("Sphere Tweaks");
const sphere = new THREE.SphereGeometry(
	sphereControls.radius,
	sphereControls.widthSegments,
	sphereControls.heightSegments
);

const tweakSphere = () => {
	mesh.geometry.dispose();
	mesh.geometry = new THREE.SphereGeometry(
		sphereControls.radius,
		sphereControls.widthSegments,
		sphereControls.heightSegments,
		sphereControls.phiStart,
		sphereControls.phiLength,
		sphereControls.thetaStart,
		sphereControls.thetaLength
	);
};

for (let i in adjustments) {
	sphereTweaks
		.add(sphereControls, i)
		.onChange(tweakSphere)
		.min(adjustments[i][0])
		.max(adjustments[i][1])
		.step(adjustments[i][2]);
}

const textureControls = {
	type: "pillar",
};
const textureTweaks = gui.addFolder("Texture Tweaks");
const material = new THREE.MeshPhysicalMaterial();
for (let i in textureData[textureControls.type]) {
	material[Textures.mapTypes[i]] = textureData[textureControls.type][i];
}

sphereTweaks.add(material, "wireframe");
textureTweaks
	.add(textureControls, "type", textures)
	.name("texture style")
	.onChange((value) => {
		for (let i in textureData[value]) {
			material[Textures.mapTypes[i]] = textureData[value][i];
		}
		mesh.material.needsUpdate = true;
	});

material.metalness = 0;
material.roughness = 0.2;
material.aoMapIntensity = 1;
material.displacementScale = 0.5;
material.normalScale.set(0.5, 0.5);
material.clearcoat = 1;
material.clearcoatRoughness = 0;
material.sheen = 1;
material.sheenRoughness = 0.25;
material.sheenColor.set(1, 1, 1);
material.iridescence = 1;
material.iridescenceIOR = 1;
material.iridescenceThicknessRange = [100, 800];
material.transmission = 0;
material.ior = 1.5;
material.thickness = 0.5;

textureTweaks.add(material, "metalness").min(0).max(1).step(0.001);
textureTweaks.add(material, "roughness").min(0).max(1).step(0.001);
textureTweaks.add(material, "aoMapIntensity").min(0).max(1).step(0.001);
textureTweaks.add(material, "displacementScale").min(0).max(1).step(0.001);
textureTweaks.add(material, "clearcoat").min(0).max(1).step(0.0001);
textureTweaks.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001);
textureTweaks.add(material, "sheen").min(0).max(1).step(0.0001);
textureTweaks.add(material, "sheenRoughness").min(0).max(1).step(0.0001);
textureTweaks.addColor(material, "sheenColor");
textureTweaks.add(material, "iridescence").min(0).max(1).step(0.0001);
textureTweaks.add(material, "iridescenceIOR").min(1).max(2.333).step(0.0001);
textureTweaks
	.add(material.iridescenceThicknessRange, "0")
	.min(1)
	.max(1000)
	.step(1)
	.name("iridescence Thickness 1");
textureTweaks
	.add(material.iridescenceThicknessRange, "1")
	.min(1)
	.max(1000)
	.step(1)
	.name("iridescence Thickness 2");

textureTweaks.add(material, "transmission").min(0).max(1).step(0.0001);
textureTweaks.add(material, "ior").min(1).max(10).step(0.0001);
textureTweaks.add(material, "thickness").min(0).max(1).step(0.0001);

const mesh = new THREE.Mesh(sphere, material);

scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 5;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
const tick = () => {
	const timePassed = clock.getElapsedTime();

	mesh.rotation.x = timePassed * 0.1;
	mesh.rotation.y = timePassed * 0.15;

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
