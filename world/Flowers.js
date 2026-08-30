import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Flowers {

    constructor(scene) {

        const colors = [
            0xFF69B4,
            0xFFD700,
            0xFF6B6B,
            0xFFFFFF,
            0x87CEFA,
            0xBA68C8
        ];

        // Cantidad de flores
        for (let i = 0; i < 100; i++) {

            const flower = new THREE.Group();


            // =========================
            // TALLO
            // =========================

            const stem = new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.025,
                    0.025,
                    0.35,
                    8
                ),

                new THREE.MeshStandardMaterial({
                    color: 0x2E8B57
                })

            );

            stem.position.y = 0.17;

            flower.add(stem);


            // =========================
            // CENTRO DE LA FLOR
            // =========================

            const center = new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.08,
                    10,
                    10
                ),

                new THREE.MeshStandardMaterial({
                    color: 0xFFD54F
                })

            );

            center.position.y = 0.37;

            flower.add(center);


            // =========================
            // PÉTALOS
            // =========================

            const petalMaterial =
                new THREE.MeshStandardMaterial({
                    color:
                        colors[
                            Math.floor(
                                Math.random() *
                                colors.length
                            )
                        ]
                });


            for (let p = 0; p < 5; p++) {

                const angle =
                    (Math.PI * 2 / 5) * p;

                const petal = new THREE.Mesh(

                    new THREE.SphereGeometry(
                        0.075,
                        10,
                        10
                    ),

                    petalMaterial
                );

                petal.position.set(

                    Math.cos(angle) * 0.09,

                    0.37,

                    Math.sin(angle) * 0.09

                );

                flower.add(petal);

            }


            // =========================
            // POSICIÓN
            // =========================

            const angle =
                Math.random() * Math.PI * 2;

            const radius =
                Math.random() * 7;


            flower.position.set(

                Math.cos(angle) * radius,

                0.2,

                Math.sin(angle) * radius

            );


            // =========================
            // VARIACIÓN
            // =========================

            const scale =
                0.8 +
                Math.random() * 0.6;

            flower.scale.set(
                scale,
                scale,
                scale
            );


            flower.rotation.y =
                Math.random() * Math.PI * 2;


            scene.add(flower);

        }

    }

}