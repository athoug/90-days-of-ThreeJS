import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

// ball textures
const basketTexture = textureLoader.load("./balls/basketBall.png");
const tennisColor = textureLoader.load("./balls/tennis/NewTennisBallColor.jpg");
const tennisBump = textureLoader.load("./balls/tennis/TennisBallBump.jpg");
const baseColor = textureLoader.load("./balls/baseball/SoftballColor.jpg");
const baseBump = textureLoader.load("./balls/baseball/SoftballBump.jpg");
const beachColor = textureLoader.load("./balls/beachball/BeachBallColor.jpg");
const beachTransparent = textureLoader.load(
	"./balls/beachball/BeachBallTransp.jpg"
);

basketTexture.colorSpace = THREE.SRGBColorSpace;
tennisColor.colorSpace = THREE.SRGBColorSpace;
baseColor.colorSpace = THREE.SRGBColorSpace;
beachColor.colorSpace = THREE.SRGBColorSpace;

export const ballTypes = {
	selected: "baseball",
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
	beachball: {
		map: beachColor,
		alphaMap: beachTransparent,
	},
};

// plane textures
const planeBeachColor = textureLoader.load(
	"./plane/beach/aerial_beach_diff.jpg"
);
const planeBeachARM = textureLoader.load("./plane/beach/aerial_beach_arm.jpg");

const planeBeachDispose = textureLoader.load(
	"./plane/beach/aerial_beach_disp.jpg"
);
const planeBeachNormal = textureLoader.load(
	"./plane/beach/aerial_beach_nor_gl.jpg"
);

const planeGrassColor = textureLoader.load(
	"./plane/grass/brown_mud_leaves_diff.jpg"
);
const planeGrassARM = textureLoader.load(
	"./plane/grass/brown_mud_leaves_arm.jpg"
);
const planeGrassDispose = textureLoader.load(
	"./plane/grass/brown_mud_leaves_disp.jpg"
);
const planeGrassNormal = textureLoader.load(
	"./plane/grass/brown_mud_leaves_nor_gl.jpg"
);

const planeWoodColor = textureLoader.load("./plane/wood/wood_floor_diff.jpg");
const planeWoodARM = textureLoader.load("./plane/wood/wood_floor_arm.jpg");
const planeWoodDispose = textureLoader.load("./plane/wood/wood_floor_disp.jpg");
const planeWoodNormal = textureLoader.load(
	"./plane/wood/wood_floor_nor_gl.jpg"
);

planeBeachColor.colorSpace = THREE.SRGBColorSpace;
planeGrassColor.colorSpace = THREE.SRGBColorSpace;
planeWoodColor.colorSpace = THREE.SRGBColorSpace;

const grass = {
	map: planeGrassColor,
	aoMap: planeGrassARM,
	displacementMap: planeGrassDispose,
	metalnessMap: planeGrassARM,
	roughnessMap: planeGrassARM,
	normalMap: planeGrassNormal,
};

export const planeTypes = {
	beachball: {
		map: planeBeachColor,
		aoMap: planeBeachARM,
		displacementMap: planeBeachDispose,
		metalnessMap: planeBeachARM,
		roughnessMap: planeBeachARM,
		normalMap: planeBeachNormal,
	},
	tennisball: grass,
	baseball: grass,
	basketball: {
		map: planeWoodColor,
		aoMap: planeWoodARM,
		displacementMap: planeWoodDispose,
		metalnessMap: planeWoodARM,
		roughnessMap: planeWoodARM,
		normalMap: planeWoodNormal,
	},
};
