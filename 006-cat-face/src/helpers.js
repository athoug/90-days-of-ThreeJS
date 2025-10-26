import * as THREE from "three";

export class CustomSinCurve extends THREE.Curve {
	constructor(scale = 1) {
		super();
		this.scale = scale;
	}

	getPoint(t, optionalTarget = new THREE.Vector3()) {
		const tx = t * 3 - 1.5;
		const ty = Math.sin(2 * Math.PI * t);
		const tz = 0;

		return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
	}
}

export const whiskersPoints = {
	point1: [
		// x, y, z
		-12,
		2,
		4, // Point 1
		1,
		0,
		4, // Point 2
	],
	point2: [
		// x, y, z
		-12,
		-1,
		4, // Point 1
		1,
		0,
		4, // Point 2
	],
	point3: [
		// x, y, z
		12,
		2,
		4, // Point 1
		1,
		0,
		4, // Point 2
	],
	point4: [
		// x, y, z
		12,
		-1,
		4, // Point 1
		1,
		0,
		4, // Point 2
	],
};
