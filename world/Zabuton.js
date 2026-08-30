import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Zabuton {

    constructor(scene, x, z, color = 0xC62828) {

        const cushion = new THREE.Mesh(

            new THREE.BoxGeometry(
                0.8,
                0.12,
                0.8
            ),

            new THREE.MeshStandardMaterial({
                color: color
            })

        );

        cushion.position.set(
            x,
            0.42,
            z
        );

        cushion.castShadow = true;
        cushion.receiveShadow = true;

        scene.add(cushion);

    }

}