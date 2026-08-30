import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Path {

    constructor(scene) {

        const material = new THREE.MeshStandardMaterial({
            color: 0xD2B48C
        });

        const pathPoints = [

            { x: 0.0,  z: -6.5 },
            { x: 0.4,  z: -7.8 },
            { x: 1.0,  z: -9.1 },
            { x: 2.0,  z: -10.3 },
            { x: 3.3,  z: -11.2 },
            { x: 4.8,  z: -11.8 },
            { x: 6.4,  z: -11.2 },
            { x: 7.8,  z: -10.0 },
            { x: 8.8,  z: -8.5 },
            { x: 9.4,  z: -6.6 },
            { x: 10.0, z: -4.8 }

        ];

        for (const point of pathPoints) {

            const stone = new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.35,
                    0.35,
                    0.10,
                    20
                ),

                material

            );

            stone.position.set(
                point.x,
                0.45,
                point.z
            );

            stone.rotation.y = Math.random() * Math.PI;

            scene.add(stone);

        }

    }

}