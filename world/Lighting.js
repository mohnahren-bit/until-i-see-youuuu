import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Lighting {

    constructor(scene) {

        // Luz ambiental cálida
        const ambientLight = new THREE.AmbientLight(
            0xffd6a5,
            1.2
        );

        scene.add(ambientLight);

        // Sol del atardecer
        const sun = new THREE.DirectionalLight(
            0xff9e57,
            2.8
        );

        sun.position.set(-25, 8, 12);

        scene.add(sun);

    }

}