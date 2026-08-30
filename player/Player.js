import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";
import { InputManager } from "./InputManager.js";

export class Player {

    constructor(scene) {

        const geometry = new THREE.CapsuleGeometry(
            0.35,
            1,
            8,
            16
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff
        });

        this.mesh = new THREE.Mesh(
            geometry,
            material
        );

        this.mesh.position.set(
            0,
            1,
            0
        );

        scene.add(this.mesh);

        this.input = new InputManager();

        this.speed = 0.08;

        // ==================================================
        // CONFIGURACIÓN DEL PUENTE
        // ==================================================

        this.bridgeStartZ = 5;
        this.bridgeEndZ = -54;

        // Altura del puente
        this.bridgeStartY = 0.15;
        this.bridgeEndY = 1.15;

        // Altura del jugador sobre las tablas
        this.playerHeight = 1.12;

    }


    update() {

        // ==================================================
        // MOVIMIENTO
        // ==================================================

        if (this.input.keys["KeyW"]) {

            this.mesh.position.z -= this.speed;

        }

        if (this.input.keys["KeyS"]) {

            this.mesh.position.z += this.speed;

        }

        if (this.input.keys["KeyA"]) {

            this.mesh.position.x -= this.speed;

        }

        if (this.input.keys["KeyD"]) {

            this.mesh.position.x += this.speed;

        }


        // ==================================================
        // ALTURA DEL JUGADOR EN EL PUENTE
        // ==================================================

        const z = this.mesh.position.z;

        if (
            z <= this.bridgeStartZ &&
            z >= this.bridgeEndZ &&
            Math.abs(this.mesh.position.x) <= 2.2
        ) {

            // Progreso sobre el puente
            const progress =
                (this.bridgeStartZ - z) /
                (this.bridgeStartZ - this.bridgeEndZ);

            // Altura de las tablas
            const bridgeY =
                this.bridgeStartY +
                (
                    this.bridgeEndY -
                    this.bridgeStartY
                ) * progress;

            // El jugador sigue la inclinación
            this.mesh.position.y =
                bridgeY +
                this.playerHeight;

        } else {

            // Altura normal del mundo
            this.mesh.position.y = 1;

        }

    }


    pressedE() {

        return this.input.consumeKey("KeyE");

    }

}