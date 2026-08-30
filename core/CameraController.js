import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class CameraController {

    constructor(camera, player) {

        this.camera = camera;
        this.player = player;

        this.distance = 10;
        this.height = 5;

        this.rotation = 0;

        this.isDragging = false;

        window.addEventListener("mousedown", (e) => {

            if (e.button === 2) {

                this.isDragging = true;

            }

        });

        window.addEventListener("mouseup", () => {

            this.isDragging = false;

        });

        window.addEventListener("mousemove", (e) => {

    if (!this.isDragging) return;

    console.log(e.movementX);

    this.rotation -= e.movementX * 0.005;

        });

        window.addEventListener("wheel", (e) => {

            this.distance += e.deltaY * 0.01;

            this.distance = Math.max(4, Math.min(18, this.distance));

        });

        window.addEventListener("contextmenu", (e) => e.preventDefault());

    }

    update() {

        const x = this.player.mesh.position.x;
        const y = this.player.mesh.position.y;
        const z = this.player.mesh.position.z;

        this.camera.position.x = x + Math.sin(this.rotation) * this.distance;

        this.camera.position.z = z + Math.cos(this.rotation) * this.distance;

        this.camera.position.y = y + this.height;

        this.camera.lookAt(x, y + 1.2, z);

    }

}