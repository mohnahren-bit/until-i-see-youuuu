import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class CameraManager {

    constructor() {

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.camera.position.set(0, 6, 16);

        this.camera.lookAt(0, 0, 0);

    }

}