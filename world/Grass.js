import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Grass {

    constructor(scene) {

        const geometry = new THREE.CylinderGeometry(
            7.8,
            13.8,
            0.4,
            64
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0x6ECF4B
        });

        this.mesh = new THREE.Mesh(
            geometry,
            material
        );

        this.mesh.position.set(0, 0.2, 0);

        this.mesh.receiveShadow = true;

        scene.add(this.mesh);

    }

}