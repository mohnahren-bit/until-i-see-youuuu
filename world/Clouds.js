import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Clouds {

    constructor(scene) {

        this.clouds = [];

        for (let i = 0; i < 12; i++) {

            const cloud = new THREE.Group();

            // =========================
            // PARTES DE LA NUBE
            // =========================

            const cloudMaterial =
                new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    roughness: 1
                });

            const parts = 5 + Math.floor(Math.random() * 3);

            for (let j = 0; j < parts; j++) {

                const size =
                    0.55 + Math.random() * 0.45;

                const part = new THREE.Mesh(

                    new THREE.SphereGeometry(
                        size,
                        16,
                        12
                    ),

                    cloudMaterial
                );

                // Agrupar las esferas
                part.position.set(
                    (j - (parts - 1) / 2) * 0.65 +
                    (Math.random() - 0.5) * 0.25,

                    Math.random() * 0.35,

                    (Math.random() - 0.5) * 0.5
                );

                // Aplastar ligeramente las esferas
                part.scale.y =
                    0.55 + Math.random() * 0.25;

                cloud.add(part);

            }


            // =========================
            // POSICIÓN DE LA NUBE
            // =========================

            cloud.position.set(

                (Math.random() - 0.5) * 70,

                9 + Math.random() * 7,

                (Math.random() - 0.5) * 70

            );


            // Escala general
            const scale =
                0.9 + Math.random() * 0.8;

            cloud.scale.set(
                scale,
                scale,
                scale
            );


            // Rotación
            cloud.rotation.y =
                Math.random() * Math.PI * 2;


            scene.add(cloud);

            this.clouds.push(cloud);

        }

    }

}