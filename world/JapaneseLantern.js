import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class JapaneseLantern {

    constructor(scene, x, z) {

        const lantern = new THREE.Group();

        // Base
        const base = new THREE.Mesh(

            new THREE.CylinderGeometry(0.18, 0.22, 0.15, 12),

            new THREE.MeshStandardMaterial({
                color: 0x9E9E9E
            })

        );

        base.position.y = 0.08;

        lantern.add(base);

        // Columna
        const column = new THREE.Mesh(

            new THREE.CylinderGeometry(0.07, 0.07, 0.8, 12),

            new THREE.MeshStandardMaterial({
                color: 0xBDBDBD
            })

        );

        column.position.y = 0.5;

        lantern.add(column);

        // Linterna
        const lightBox = new THREE.Mesh(

            new THREE.BoxGeometry(0.35, 0.25, 0.35),

            new THREE.MeshStandardMaterial({
                color: 0xFFF8DC,
                emissive: 0xFFD54F,
                emissiveIntensity: 0.35
            })

        );

        lightBox.position.y = 1.0;

        lantern.add(lightBox);

        // Techo
        const roof = new THREE.Mesh(

            new THREE.CylinderGeometry(0.30, 0.40, 0.08, 4),

            new THREE.MeshStandardMaterial({
                color: 0x616161
            })

        );

        roof.rotation.y = Math.PI / 4;
        roof.position.y = 1.2;

        lantern.add(roof);

        lantern.scale.set(1.8, 1.8, 1.8);

        lantern.position.set(x, 0, z);

        scene.add(lantern);

    }

}