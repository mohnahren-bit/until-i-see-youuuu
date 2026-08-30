import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Fog {

    constructor(scene) {

        scene.fog = new THREE.Fog(
            0x87CEEB,
            15,
            80
        );

    }

}