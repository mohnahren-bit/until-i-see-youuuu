import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Garden {

    constructor(scene) {

        const flowerColors = [
            0xF8BBD0,
            0xF48FB1,
            0xFFFFFF,
            0xFFE082
        ];

        for (let i = 0; i < 120; i++) {

            const flower = new THREE.Mesh(

                new THREE.SphereGeometry(0.06, 8, 8),

                new THREE.MeshStandardMaterial({
                    color: flowerColors[
                        Math.floor(Math.random() * flowerColors.length)
                    ]
                })

            );

            let x;
            let z;

            do {

                x = 7 + (Math.random() - 0.5) * 8;
                z = -8 + (Math.random() - 0.5) * 8;

            } while (

                Math.sqrt(
                    (x - 7) * (x - 7) +
                    (z + 8) * (z + 8)
                ) < 1.8

            );

            flower.position.set(
                x,
                0.43,
                z
            );

            scene.add(flower);

        }

    }

}