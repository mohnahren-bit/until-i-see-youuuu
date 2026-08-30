import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Renderer {

    constructor() {

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.setPixelRatio(
            window.devicePixelRatio
        );

        document.body.appendChild(
            this.renderer.domElement
        );

    }

}