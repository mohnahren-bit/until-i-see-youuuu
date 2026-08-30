import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Trees {

    constructor(scene) {

        const treePositions = [];

        const islandRadius = 20;

        const totalTrees = 140;

        for (let i = 0; i < totalTrees; i++) {

            const tree = new THREE.Group();

            // ==================================================
            // TRONCO
            // ==================================================

            const trunk = new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.12,
                    0.16,
                    1,
                    8
                ),

                new THREE.MeshStandardMaterial({
                    color: 0x8B5A2B
                })

            );

            trunk.position.y = 0.5;

            tree.add(trunk);


            // ==================================================
            // COPA
            // ==================================================

            const leaves = new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.55,
                    16,
                    16
                ),

                new THREE.MeshStandardMaterial({
                    color: 0x2E8B57
                })

            );

            leaves.position.y = 1.25;

            tree.add(leaves);


            // ==================================================
            // POSICIÓN
            // ==================================================

            let x;
            let z;

            let valid = false;

            while (!valid) {

                const angle =
                    Math.random() * Math.PI * 2;

                const radius =
                    Math.sqrt(Math.random()) *
                    islandRadius;

                x =
                    Math.cos(angle) *
                    radius;

                z =
                    Math.sin(angle) *
                    radius;


                // ==================================================
                // CENTRO
                // ==================================================

                if (
                    Math.sqrt(
                        x * x +
                        z * z
                    ) < 2.5
                ) {

                    continue;

                }


                // ==================================================
                // JARDÍN
                // ==================================================

                const gardenX = 7;
                const gardenZ = -8;
                const gardenRadius = 6;

                const dxGarden =
                    x - gardenX;

                const dzGarden =
                    z - gardenZ;

                if (
                    Math.sqrt(
                        dxGarden * dxGarden +
                        dzGarden * dzGarden
                    ) < gardenRadius
                ) {

                    continue;

                }


                // ==================================================
                // LAGO
                // ==================================================

                const lakeX = 17;
                const lakeZ = -8;

                const dxLake =
                    x - lakeX;

                const dzLake =
                    z - lakeZ;

                if (
                    Math.sqrt(
                        dxLake * dxLake +
                        dzLake * dzLake
                    ) < 6
                ) {

                    continue;

                }


                // ==================================================
                // ÁREA FINAL
                // ==================================================

                const finalAreaX = 13;
                const finalAreaZ = -10;
                const finalAreaRadius = 12;

                const dxFinal =
                    x - finalAreaX;

                const dzFinal =
                    z - finalAreaZ;

                if (
                    Math.sqrt(
                        dxFinal * dxFinal +
                        dzFinal * dzFinal
                    ) < finalAreaRadius
                ) {

                    continue;

                }


                // ==================================================
                // 🌉 PUENTE
                // ==================================================
                //
                // EL PUENTE COMPLETO VA:
                //
                // Z = 5
                //       ↓
                //       ↓
                //       ↓
                // Z = -54
                //
                // Dejamos TODO este corredor libre.
                // ==================================================

                const bridgeStartZ = 5;
                const bridgeEndZ = -54;

                const bridgeWidth = 6;

                if (
                    z <= bridgeStartZ &&
                    z >= bridgeEndZ &&
                    Math.abs(x) <= bridgeWidth
                ) {

                    continue;

                }


                // ==================================================
                // 🚫 ZONA EXTRA DE SEGURIDAD
                // ==================================================
                //
                // Evita que las copas de los árboles
                // invadan visualmente los bordes.
                // ==================================================

                const safetyWidth = 8;

                if (
                    z <= bridgeStartZ &&
                    z >= bridgeEndZ &&
                    Math.abs(x) <= safetyWidth
                ) {

                    continue;

                }


                // ==================================================
                // EVITAR ÁRBOLES JUNTOS
                // ==================================================

                valid = true;

                for (const pos of treePositions) {

                    const dx =
                        pos.x - x;

                    const dz =
                        pos.z - z;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dz * dz
                        );

                    if (distance < 1.4) {

                        valid = false;

                        break;

                    }

                }

            }


            // ==================================================
            // GUARDAR POSICIÓN
            // ==================================================

            treePositions.push({
                x,
                z
            });


            // ==================================================
            // COLOCAR ÁRBOL
            // ==================================================

            tree.position.set(
                x,
                0.2,
                z
            );


            // ==================================================
            // ROTACIÓN
            // ==================================================

            tree.rotation.y =
                Math.random() *
                Math.PI *
                2;


            // ==================================================
            // ESCALA
            // ==================================================

            const scale =
                0.8 +
                Math.random() *
                0.8;

            tree.scale.set(
                scale,
                scale,
                scale
            );


            // ==================================================
            // AGREGAR
            // ==================================================

            scene.add(tree);

        }

    }

}