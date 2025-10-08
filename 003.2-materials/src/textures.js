import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

export const mapTypes = {
	color: "map",
	ao: "aoMap",
	height: "displacementMap",
	normal: "normalMap",
	metalness: "metalnessMap",
	roughness: "roughnessMap",
	alpha: "alphaMap",
	emissive: "emissiveMap",
	bump: "bumpMap",
};

// === PILLAR TEXTURE ===
const pillarData = {
	color: "./pillar/concrete_pillar_color.png",
	ao: "./pillar/concrete_pillar_ambient_occlusion.png",
	height: "./pillar/concrete_pillar_height.png",
	normal: "./pillar/concrete_pillar_normal_gl.png",
	roughness: "./pillar/concrete_pillar_roughness.png",
};

export const pillarDataTextures = {};
for (let i in pillarData) {
	pillarDataTextures[i] = textureLoader.load(pillarData[i]);
	if (i === "color") {
		pillarDataTextures[i].colorSpace = THREE.SRGBColorSpace;
	}
}

// === STONE TEXTURE ===
const stoneData = {
	color: "./stone/stone_wall_color.png",
	ao: "./stone/stone_wall_ambient_occlusion.png",
	height: "./stone/stone_wall_height.png",
	normal: "./stone/stone_wall_normal_gl.png",
	roughness: "./stone/stone_wall_roughness.png",
};

export const stoneDataTextures = {};
for (let i in stoneData) {
	stoneDataTextures[i] = textureLoader.load(stoneData[i]);
	if (i === "color") {
		stoneDataTextures[i].colorSpace = THREE.SRGBColorSpace;
	}
}

// === INDUSTRIAL TEXTURE ===
const industrialData = {
	color: "./industrial/industrial_wall_baseColor.png",
	ao: "./industrial/industrial_wall_ambientOcclusion.png",
	height: "./industrial/industrial_wall_height.png",
	normal: "./industrial/industrial_wall_normal_gl.png",
	roughness: "./industrial/industrial_wall_roughness.png",
	metalness: "./industrial/industrial_wall_metallic.png",
	emissive: "./industrial/industrial_wall_emissive.png",
};

export const industrialTextures = {};
for (let i in industrialData) {
	industrialTextures[i] = textureLoader.load(industrialData[i]);
	if (i === "color") {
		industrialTextures[i].colorSpace = THREE.SRGBColorSpace;
	}
}

// === METAL TEXTURE ===
const metalData = {
	color: "./metal/metal_color.png",
	ao: "./metal/metal_ambient_occlusion.png",
	height: "./metal/metal_height.png",
	normal: "./metal/metal_normal_gl.png",
	roughness: "./metal/metal_roughness.png",
	metalness: "./metal/metal_metallic.png",
};

export const metalTextures = {};
for (let i in metalData) {
	metalTextures[i] = textureLoader.load(metalData[i]);
	if (i === "color") {
		metalTextures[i].colorSpace = THREE.SRGBColorSpace;
	}
}

// === HAY TEXTURE ===
const hayData = {
	color: "./hay/hay_roof_color.png",
	ao: "./hay/hay_roof_ambient_occlusion.png",
	height: "./hay/hay_roof_height.png",
	normal: "./hay/hay_roof_normal_gl.png",
	roughness: "./hay/hay_roof_roughness.png",
};

export const hayTextures = {};
for (let i in hayData) {
	hayTextures[i] = textureLoader.load(hayData[i]);
	if (i === "color") {
		hayTextures[i].colorSpace = THREE.SRGBColorSpace;
	}
}
