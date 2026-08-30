import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Butterflies {

    constructor(scene) {

        this.group = new THREE.Group();
        this.butterflies = [];

        const colors = [
            0xff69b4,
            0x87cefa,
            0xffff66,
            0xffffff,
            0xba55d3
        ];

        for (let i = 0; i < 20; i++) {

            const butterfly = new THREE.Group();

            const material = new THREE.MeshStandardMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                side: THREE.DoubleSide
            });

            const wingGeometry = new THREE.PlaneGeometry(0.18, 0.25);

            const leftWing = new THREE.Mesh(wingGeometry, material);
            leftWing.position.x = -0.1;
            leftWing.rotation.y = Math.PI / 6;

            const rightWing = new THREE.Mesh(wingGeometry, material);
            rightWing.position.x = 0.1;
            rightWing.rotation.y = -Math.PI / 6;

            const body = new THREE.Mesh(
                new THREE.CylinderGeometry(0.02, 0.02, 0.18, 8),
                new THREE.MeshStandardMaterial({
                    color: 0x222222
                })
            );

            body.rotation.z = Math.PI / 2;

            butterfly.add(leftWing);
            butterfly.add(rightWing);
            butterfly.add(body);

            butterfly.position.set(
                (Math.random() - 0.5) * 18,
                1.2 + Math.random(),
                (Math.random() - 0.5) * 18
            );

            butterfly.userData = {

                leftWing,
                rightWing,

                offset: Math.random() * Math.PI * 2,

                speed: 0.4 + Math.random() * 0.6,

                radius: 0.5 + Math.random(),

                centerX: butterfly.position.x,

                centerZ: butterfly.position.z

            };

            this.group.add(butterfly);

            this.butterflies.push(butterfly);

        }

        scene.add(this.group);

    }

    update(time) {

        this.butterflies.forEach((b) => {

            const data = b.userData;

            const flap = Math.sin(time * 12 + data.offset) * 0.8;

            data.leftWing.rotation.y = flap;

            data.rightWing.rotation.y = -flap;

            b.position.x =
                data.centerX +
                Math.cos(time * data.speed + data.offset) * data.radius;

            b.position.z =
                data.centerZ +
                Math.sin(time * data.speed + data.offset) * data.radius;

            b.position.y =
                1.4 +
                Math.sin(time * 2 + data.offset) * 0.25;

            b.rotation.y += 0.02;

        });

    }

}