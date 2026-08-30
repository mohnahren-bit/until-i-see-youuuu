import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Collectible {

    constructor(scene, x, z) {

        this.scene = scene;
        this.collected = false;

        // =========================
        // GRUPO PRINCIPAL
        // =========================

        this.group = new THREE.Group();

        // =========================
        // CRISTAL / RECUERDO
        // =========================

        const geometry = new THREE.OctahedronGeometry(0.28);

        const material = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            emissive: 0xFFB300,
            emissiveIntensity: 1.2,
            roughness: 0.25,
            metalness: 0.15
        });

        this.mesh = new THREE.Mesh(
            geometry,
            material
        );

        this.mesh.position.y = 0;

        this.group.add(this.mesh);


        // =========================
        // AURA
        // =========================

        const auraMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFF3B0,
            transparent: true,
            opacity: 0.18,
            side: THREE.DoubleSide
        });

        const aura = new THREE.Mesh(
            new THREE.SphereGeometry(
                0.48,
                16,
                16
            ),
            auraMaterial
        );

        this.group.add(aura);


        // =========================
        // PEQUEÑAS PARTÍCULAS
        // =========================

        const particleMaterial =
            new THREE.MeshBasicMaterial({
                color: 0xFFE082
            });

        for (let i = 0; i < 5; i++) {

            const particle = new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.035,
                    8,
                    8
                ),
                particleMaterial
            );

            const angle =
                (Math.PI * 2 / 5) * i;

            particle.position.set(
                Math.cos(angle) * 0.42,
                0.15 + Math.random() * 0.25,
                Math.sin(angle) * 0.42
            );

            this.group.add(particle);

        }


        // =========================
        // POSICIÓN
        // =========================

        this.group.position.set(
            x,
            0.7,
            z
        );

        scene.add(this.group);


        // =========================
        // DATOS DE ANIMACIÓN
        // =========================

        this.timeOffset =
            Math.random() * Math.PI * 2;

    }


    // =========================
    // ANIMACIÓN
    // =========================

    update(time) {

        if (this.collected) return;

        // Girar
        this.mesh.rotation.y += 0.025;

        // Flotar
        this.group.position.y =
            0.7 +
            Math.sin(
                time * 2 +
                this.timeOffset
            ) * 0.08;

        // Movimiento suave del recuerdo
        this.mesh.rotation.x =
            Math.sin(
                time +
                this.timeOffset
            ) * 0.12;

    }


    // =========================
    // RECOGER
    // =========================

    collect() {

        if (this.collected) return;

        this.collected = true;

        this.scene.remove(
            this.group
        );

    }

}