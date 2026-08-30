import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class SecondMonthBridge {

    constructor(scene) {

        this.group = new THREE.Group();

        // ==================================================
        // MATERIALES
        // ==================================================

        const wood = new THREE.MeshStandardMaterial({
            color: 0x4A3024,
            roughness: 0.85
        });

        const woodLight = new THREE.MeshStandardMaterial({
            color: 0x76513B,
            roughness: 0.8
        });

        const rope = new THREE.MeshStandardMaterial({
            color: 0x241A18,
            roughness: 1
        });

        const lampMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFF4B0,
            emissive: 0xFFD45A,
            emissiveIntensity: 2.5
        });

        // ==================================================
        // POSICIÓN DEL PUENTE
        //
        // PRIMER MUNDO
        //      |
        //      | PUENTE
        //      |
        // SEGUNDO MUNDO
        // ==================================================

        // Borde del primer mundo
        const startZ = -15;

        // Borde del segundo mundo
        const endZ = -29;

        const startY = 0.15;
        const endY = 1.15;

        const length = Math.abs(endZ - startZ);

        const centerZ = (startZ + endZ) / 2;
        const centerY = (startY + endY) / 2;

        const angle = Math.atan2(
            endY - startY,
            Math.abs(endZ - startZ)
        );

        // ==================================================
        // BASE DEL PUENTE
        // ==================================================

        const bridge = new THREE.Mesh(
            new THREE.BoxGeometry(
                4,
                0.25,
                length
            ),
            wood
        );

        bridge.position.set(
            0,
            centerY,
            centerZ
        );

        bridge.rotation.x = angle;

        bridge.castShadow = true;
        bridge.receiveShadow = true;

        this.group.add(bridge);

        // ==================================================
        // TABLAS
        // ==================================================

        const plankCount = 15;

        for (let i = 0; i < plankCount; i++) {

            const t = i / (plankCount - 1);

            const z =
                startZ +
                (endZ - startZ) * t;

            const y =
                startY +
                (endY - startY) * t;

            const plank = new THREE.Mesh(
                new THREE.BoxGeometry(
                    3.8,
                    0.18,
                    0.78
                ),
                woodLight
            );

            plank.position.set(
                0,
                y + 0.18,
                z
            );

            plank.rotation.x = angle;

            plank.castShadow = true;
            plank.receiveShadow = true;

            this.group.add(plank);
        }

        // ==================================================
        // BARANDALES
        // ==================================================

        const sides = [-1.85, 1.85];

        for (const x of sides) {

            // POSTES

            for (let i = 0; i < 8; i++) {

                const t = i / 7;

                const z =
                    startZ +
                    (endZ - startZ) * t;

                const y =
                    startY +
                    (endY - startY) * t;

                const post = new THREE.Mesh(
                    new THREE.CylinderGeometry(
                        0.09,
                        0.12,
                        1.4,
                        8
                    ),
                    wood
                );

                post.position.set(
                    x,
                    y + 0.72,
                    z
                );

                post.rotation.z = -angle;

                post.castShadow = true;

                this.group.add(post);
            }

            // BARANDAL SUPERIOR

            const rail = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.075,
                    0.075,
                    length,
                    8
                ),
                wood
            );

            rail.rotation.x =
                Math.PI / 2 - angle;

            rail.position.set(
                x,
                centerY + 1.35,
                centerZ
            );

            rail.castShadow = true;

            this.group.add(rail);

            // CUERDA

            const ropeMesh = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.035,
                    0.035,
                    length,
                    8
                ),
                rope
            );

            ropeMesh.rotation.x =
                Math.PI / 2 - angle;

            ropeMesh.position.set(
                x,
                centerY + 0.55,
                centerZ
            );

            this.group.add(ropeMesh);
        }

        // ==================================================
        // LUCES DEL PUENTE
        // ==================================================

        const lights = [
            [-1.6, -17.0],
            [1.6, -19.2],
            [-1.6, -21.4],
            [1.6, -23.6],
            [-1.6, -25.8],
            [1.6, -28.0]
        ];

        for (const [x, z] of lights) {

            const t =
                (z - startZ) /
                (endZ - startZ);

            const y =
                startY +
                (endY - startY) * t;

            // Bombilla

            const lamp = new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.14,
                    12,
                    12
                ),
                lampMaterial
            );

            lamp.position.set(
                x,
                y + 1,
                z
            );

            this.group.add(lamp);

            // Luz real

            const light = new THREE.PointLight(
                0xFFD978,
                2,
                5
            );

            light.position.copy(
                lamp.position
            );

            this.group.add(light);
        }

        // ==================================================
        // ARCO DE ENTRADA
        // ==================================================

        const leftPost = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.16,
                0.20,
                2.2,
                10
            ),
            wood
        );

        leftPost.position.set(
            -1.85,
            1.1,
            startZ
        );

        leftPost.castShadow = true;

        this.group.add(leftPost);

        const rightPost = leftPost.clone();

        rightPost.position.x = 1.85;

        this.group.add(rightPost);

        const top = new THREE.Mesh(
            new THREE.BoxGeometry(
                4.3,
                0.22,
                0.25
            ),
            wood
        );

        top.position.set(
            0,
            2.15,
            startZ
        );

        top.castShadow = true;

        this.group.add(top);

        // ==================================================
        // LUCES DEL ARCO
        // ==================================================

        for (const x of [-1.3, 0, 1.3]) {

            const lamp = new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.11,
                    12,
                    12
                ),
                lampMaterial
            );

            lamp.position.set(
                x,
                2.38,
                startZ
            );

            this.group.add(lamp);

            const light = new THREE.PointLight(
                0xFFD978,
                1.5,
                4
            );

            light.position.copy(
                lamp.position
            );

            this.group.add(light);
        }
        
        // ==================================================
// ÁRBOLES ALREDEDOR DEL PUENTE
// ==================================================

const treeTrunkMaterial = new THREE.MeshStandardMaterial({
    color: 0x4A2F20,
    roughness: 0.9
});

const treeLeafMaterial = new THREE.MeshStandardMaterial({
    color: 0x123F35,
    roughness: 0.8
});

const treePositions = [
    [-4.5, -17, 0.8],
    [4.5, -19, 1.0],
    [-4.8, -22, 0.9],
    [4.8, -24, 1.1],
    [-4.5, -27, 0.8],
    [4.5, -28, 1.0]
];

for (const [x, z, scale] of treePositions) {

    const tree = new THREE.Group();

    // Tronco
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.18 * scale,
            0.25 * scale,
            1.8 * scale,
            8
        ),
        treeTrunkMaterial
    );

    trunk.position.y = 0.9 * scale;

    tree.add(trunk);

    // Copa
    const leaves = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.9 * scale,
            12,
            12
        ),
        treeLeafMaterial
    );

    leaves.position.y = 2.0 * scale;

    tree.add(leaves);

    tree.position.set(
        x,
        0,
        z
    );

    tree.castShadow = true;

    this.group.add(tree);
}
        // ==================================================
        // AGREGAR AL ESCENARIO
        // ==================================================

        scene.add(this.group);
    }
}