import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Island {

    constructor(scene) {

        // =========================
        // ISLA PRINCIPAL
        // =========================

        const geometry = new THREE.CylinderGeometry(
            20,
            33,
            4,
            64
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0x4CAF50,
            flatShading: true
        });

        this.mesh = new THREE.Mesh(
            geometry,
            material
        );

        this.mesh.position.set(0, -2, 0);

        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        scene.add(this.mesh);


        // =========================
        // LAGO
        // =========================

        const lakeGroup = new THREE.Group();

        // Agua principal

        const waterMaterial = new THREE.MeshStandardMaterial({
            color: 0x4FC3F7,
            transparent: true,
            opacity: 0.82,
            roughness: 0.15,
            metalness: 0.05
        });

        const lake = new THREE.Mesh(
            new THREE.CircleGeometry(5, 64),
            waterMaterial
        );

        lake.rotation.x = -Math.PI / 2;

        lake.scale.set(1.6, 1, 1);

        lake.position.set(
            17,
            0.04,
            -8
        );

        lakeGroup.add(lake);


        // =========================
        // BORDE DEL AGUA
        // =========================

        const edgeMaterial = new THREE.MeshStandardMaterial({
            color: 0x81D4FA,
            transparent: true,
            opacity: 0.35
        });

        const edge = new THREE.Mesh(
            new THREE.RingGeometry(
                4.7,
                5.0,
                64
            ),
            edgeMaterial
        );

        edge.rotation.x = -Math.PI / 2;

        edge.scale.set(1.6, 1, 1);

        edge.position.set(
            17,
            0.055,
            -8
        );

        lakeGroup.add(edge);


        // =========================
        // PEQUEÑAS ONDAS
        // =========================

        const rippleMaterial = new THREE.MeshBasicMaterial({
            color: 0xB3E5FC,
            transparent: true,
            opacity: 0.22,
            side: THREE.DoubleSide
        });


        const ripple1 = new THREE.Mesh(
            new THREE.RingGeometry(
                0.45,
                0.55,
                32
            ),
            rippleMaterial
        );

        ripple1.rotation.x = -Math.PI / 2;

        ripple1.position.set(
            15.8,
            0.075,
            -7.4
        );

        ripple1.scale.set(
            1.8,
            1,
            0.8
        );

        lakeGroup.add(ripple1);


        const ripple2 = new THREE.Mesh(
            new THREE.RingGeometry(
                0.35,
                0.43,
                32
            ),
            rippleMaterial
        );

        ripple2.rotation.x = -Math.PI / 2;

        ripple2.position.set(
            17.8,
            0.075,
            -8.8
        );

        ripple2.scale.set(
            1.5,
            1,
            0.7
        );

        lakeGroup.add(ripple2);


        const ripple3 = new THREE.Mesh(
            new THREE.RingGeometry(
                0.25,
                0.32,
                32
            ),
            rippleMaterial
        );

        ripple3.rotation.x = -Math.PI / 2;

        ripple3.position.set(
            18.5,
            0.075,
            -6.9
        );

        ripple3.scale.set(
            1.6,
            1,
            0.7
        );

        lakeGroup.add(ripple3);


        // =========================
        // AÑADIR LAGO
        // =========================

        scene.add(lakeGroup);

        this.lake = lakeGroup;

    }

}