import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class SecondMonthCollectible {

    constructor(scene, x, z, color = 0xff9ed8) {

        this.scene = scene;
        this.collected = false;

        this.group = new THREE.Group();

        // Brillo exterior
        const glow = new THREE.Mesh(
            new THREE.SphereGeometry(0.45, 16, 16),
            new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.15
            })
        );

        this.group.add(glow);

        // Cristal central
        const crystal = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.25),
            new THREE.MeshStandardMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 1.8,
                roughness: 0.25
            })
        );

        this.group.add(crystal);

        // Luz
        const light = new THREE.PointLight(
            color,
            1.5,
            4
        );

        this.group.add(light);

        // Posición
        this.group.position.set(
            x,
            0.8,
            z
        );

        this.scene.add(this.group);
    }

    update(time) {

        if (this.collected) return;

        this.group.rotation.y += 0.02;

        this.group.position.y =
            0.8 +
            Math.sin(time * 2) * 0.12;

    }

    collect() {

        if (this.collected) return;

        this.collected = true;

        this.scene.remove(this.group);

    }

}