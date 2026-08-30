import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class CherryTree {

    constructor(scene, x, z) {

        const tree = new THREE.Group();

        // Tronco
        const trunk = new THREE.Mesh(

            new THREE.CylinderGeometry(0.22, 0.28, 2.5, 12),

            new THREE.MeshStandardMaterial({
                color: 0x6D4C41
            })

        );

        trunk.position.y = 1.25;

        tree.add(trunk);

        // Copa rosa
        const blossom = new THREE.Mesh(

            new THREE.SphereGeometry(1.4, 24, 24),

            new THREE.MeshStandardMaterial({
                color: 0xF8BBD0
            })

        );

        blossom.position.y = 3;

        tree.add(blossom);

        tree.position.set(x, 0, z);

        scene.add(tree);

    }

}