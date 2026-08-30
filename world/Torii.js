import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Torii {

    constructor(scene) {

        const torii = new THREE.Group();

        const material = new THREE.MeshStandardMaterial({
            color: 0xC62828
        });

        const left = new THREE.Mesh(
            new THREE.CylinderGeometry(0.12,0.12,3,12),
            material
        );

        left.position.set(-1,1.5,0);

        torii.add(left);

        const right = left.clone();

        right.position.x = 1;

        torii.add(right);

        const top = new THREE.Mesh(
            new THREE.BoxGeometry(2.8,0.18,0.25),
            material
        );

        top.position.y = 3;

        torii.add(top);

        const top2 = new THREE.Mesh(
            new THREE.BoxGeometry(3.3,0.15,0.35),
            material
        );

        top2.position.y = 3.18;

        torii.add(top2);

        torii.position.set(7.2, 0.35, -2.2);

        torii.rotation.y = Math.PI;

        scene.add(torii);

    }

}