import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class Aurora {

    constructor(scene) {

        this.scene = scene;

        this.group = new THREE.Group();

        this.active = false;

        this.time = 0;

        // ==================================================
        // AURORA BOREAL
        // ==================================================

        this.auroraMeshes = [];

        const colors = [
            0x55ffcc,
            0x66ccff,
            0xb875ff,
            0xff77cc
        ];

        for (let band = 0; band < 4; band++) {

            const geometry =
                new THREE.PlaneGeometry(
                    30,
                    9,
                    60,
                    12
                );

            const material =
                new THREE.MeshBasicMaterial({
                    color: colors[band],
                    transparent: true,
                    opacity: 0,
                    side: THREE.DoubleSide,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending
                });

            const mesh =
                new THREE.Mesh(
                    geometry,
                    material
                );

            mesh.position.set(
                (band - 1.5) * 5,
                10 + band * 0.5,
                -12
            );

            mesh.rotation.x = -0.15;

            this.group.add(mesh);

            this.auroraMeshes.push(mesh);
        }


        // ==================================================
        // I LOVE U ❤️
        // ==================================================

        const canvas =
            document.createElement("canvas");

        canvas.width = 1024;
        canvas.height = 256;

        const ctx =
            canvas.getContext("2d");

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font =
            "bold 110px Georgia";

        ctx.fillStyle =
            "#fff4dc";

        ctx.shadowColor =
            "#ff7ac8";

        ctx.shadowBlur = 30;

        ctx.fillText(
            "I LOVE U ❤️",
            canvas.width / 2,
            canvas.height / 2
        );

        const texture =
            new THREE.CanvasTexture(canvas);

        texture.needsUpdate = true;

        const textMaterial =
            new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: 0,
                depthWrite: false
            });

        this.loveText =
            new THREE.Sprite(textMaterial);

        this.loveText.position.set(
            0,
            8.5,
            -13
        );

        this.loveText.scale.set(
            8,
            2,
            1
        );

        this.group.add(this.loveText);


        // ==================================================
        // AGREGAR AL ESCENARIO
        // ==================================================

        scene.add(this.group);
    }


    // ==================================================
    // ACTIVAR AURORA
    // ==================================================

    show() {

        if (this.active) return;

        this.active = true;

        this.time = 0;

        for (const mesh of this.auroraMeshes) {

            mesh.material.opacity = 0;

        }

        this.loveText.material.opacity = 0;
    }


    // ==================================================
    // ANIMACIÓN
    // ==================================================

    update(delta = 0.016) {

        if (!this.active) return;

        this.time += delta;


        // ==================================================
        // APARICIÓN
        // ==================================================

        const fade =
            Math.min(
                this.time / 3,
                1
            );


        // ==================================================
        // AURORA
        // ==================================================

        this.auroraMeshes.forEach(
            (mesh, index) => {

                mesh.material.opacity =
                    0.10 +
                    fade * 0.16 +
                    Math.sin(
                        this.time * 1.2 +
                        index
                    ) * 0.04;

                mesh.position.x =
                    (index - 1.5) * 5 +
                    Math.sin(
                        this.time * 0.5 +
                        index
                    ) * 1.5;

                mesh.position.y =
                    10 +
                    index * 0.5 +
                    Math.sin(
                        this.time * 0.8 +
                        index
                    ) * 0.6;

                mesh.rotation.z =
                    Math.sin(
                        this.time * 0.4 +
                        index
                    ) * 0.08;

            }
        );


        // ==================================================
        // I LOVE U ❤️
        // ==================================================

        this.loveText.material.opacity =
            fade;

        this.loveText.scale.set(
            8 +
            Math.sin(
                this.time * 1.5
            ) * 0.15,

            2 +
            Math.sin(
                this.time * 1.5
            ) * 0.04,

            1
        );

        this.loveText.position.y =
            8.5 +
            Math.sin(
                this.time * 0.8
            ) * 0.2;

    }

}