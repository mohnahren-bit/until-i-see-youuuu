import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class SecondMonthArea {

    constructor(scene) {

        this.scene = scene;
        this.group = new THREE.Group();

        // ==================================================
        // POSICIÓN DEL SEGUNDO MUNDO
        // ==================================================

        this.group.position.set(
            0,
            0,
            -38
        );


        // ==================================================
        // ISLA NOCTURNA
        // ==================================================

        const island = new THREE.Mesh(
            new THREE.CylinderGeometry(
                13,
                17,
                2.5,
                64
            ),
            new THREE.MeshStandardMaterial({
                color: 0x12352f,
                roughness: 1
            })
        );

        island.position.y = -1;

        island.receiveShadow = true;

        this.group.add(island);


        // ==================================================
        // HIERBA
        // ==================================================

        const grass = new THREE.Mesh(
            new THREE.CylinderGeometry(
                12.5,
                15.5,
                0.35,
                64
            ),
            new THREE.MeshStandardMaterial({
                color: 0x286448,
                roughness: 1
            })
        );

        grass.position.y = 0.15;

        grass.receiveShadow = true;

        this.group.add(grass);


        // ==================================================
        // LUNA
        // ==================================================

        const moon = new THREE.Mesh(
            new THREE.SphereGeometry(
                1.8,
                32,
                32
            ),
            new THREE.MeshBasicMaterial({
                color: 0xfff4d6
            })
        );

        moon.position.set(
            5,
            9,
            -8
        );

        this.group.add(moon);


        // ==================================================
        // LUZ DE LUNA
        // ==================================================

        const moonLight = new THREE.PointLight(
            0xa9c7ff,
            3.5,
            40
        );

        moonLight.position.set(
            4,
            7,
            -6
        );

        this.group.add(moonLight);


        // ==================================================
        // ESTRELLAS
        // ==================================================

        const starMaterial =
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            });


        for (let i = 0; i < 120; i++) {

            const star = new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.035 +
                    Math.random() * 0.035,
                    6,
                    6
                ),
                starMaterial
            );

            star.position.set(
                (Math.random() - 0.5) * 55,
                7 + Math.random() * 20,
                (Math.random() - 0.5) * 55
            );

            this.group.add(star);

        }


        // ==================================================
        // LUCiÉRNAGAS
        // ==================================================

        this.fireflies = [];

        const fireflyColors = [
            0xffd75a,
            0xff9ed8,
            0xa9c7ff,
            0xffffff
        ];


        for (let i = 0; i < 45; i++) {

            const color =
                fireflyColors[
                    Math.floor(
                        Math.random() *
                        fireflyColors.length
                    )
                ];


            const material =
                new THREE.MeshStandardMaterial({

                    color: color,

                    emissive: color,

                    emissiveIntensity: 2

                });


            const firefly = new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.06,
                    8,
                    8
                ),
                material
            );


            const angle =
                Math.random() *
                Math.PI *
                2;


            const radius =
                2 +
                Math.random() *
                9;


            firefly.position.set(

                Math.cos(angle) * radius,

                0.8 +
                Math.random() * 2.5,

                Math.sin(angle) * radius

            );


            firefly.userData.baseY =
                firefly.position.y;

            firefly.userData.offset =
                Math.random() *
                Math.PI *
                2;


            this.fireflies.push(
                firefly
            );


            this.group.add(
                firefly
            );

        }


        // ==================================================
        // FLORES LUMINOSAS
        // ==================================================

        const flowerColors = [
            0x8ea7ff,
            0xff9ed8,
            0xc7a7ff,
            0xffffff,
            0xffd75a
        ];


        for (let i = 0; i < 65; i++) {

            const color =
                flowerColors[
                    Math.floor(
                        Math.random() *
                        flowerColors.length
                    )
                ];


            const flowerMaterial =
                new THREE.MeshStandardMaterial({

                    color: color,

                    emissive: color,

                    emissiveIntensity: 1.6

                });


            const flower = new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.11,
                    8,
                    8
                ),
                flowerMaterial
            );


            const angle =
                Math.random() *
                Math.PI *
                2;


            const radius =
                2 +
                Math.random() *
                9;


            flower.position.set(

                Math.cos(angle) * radius,

                0.42,

                Math.sin(angle) * radius

            );


            this.group.add(
                flower
            );

        }


        // ==================================================
        // FAROLES
        // ==================================================

        const lanternPositions = [

            [-5, -5],
            [5, -5],
            [-6, 2],
            [6, 2],
            [-7, -2],
            [7, -2]

        ];


        for (
            const [x, z]
            of lanternPositions
        ) {
        
        

            this.createLantern(
                x,
                z
            );

        }


        // ==================================================
        // CAMINO DE PIEDRAS
        // ==================================================

        const stoneMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x77758b,
                roughness: 0.9
            });


        for (let i = 0; i < 8; i++) {

            const stone = new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.45,
                    0.55,
                    0.12,
                    12
                ),

                stoneMaterial

            );


            stone.rotation.x =
                Math.random() * 0.15;

            stone.rotation.z =
                Math.random() * 0.15;


            stone.position.set(

                0,

                0.38,

                4.5 - i * 0.8

            );


            this.group.add(
                stone
            );

        }


        // ==================================================
        // PLATAFORMA CENTRAL
        // ==================================================

        const platform =
            new THREE.Mesh(

                new THREE.CylinderGeometry(
                    3.2,
                    3.5,
                    0.35,
                    32
                ),

                new THREE.MeshStandardMaterial({
                    color: 0x403952,
                    roughness: 0.8
                })

            );


        platform.position.set(
            0,
            0.4,
            -3
        );


        platform.receiveShadow = true;

        this.group.add(
            platform
        );


        // ==================================================
        // AURA DE LA PLATAFORMA
        // ==================================================

        const aura =
            new THREE.Mesh(

                new THREE.CylinderGeometry(
                    3.8,
                    3.8,
                    0.03,
                    64
                ),

                new THREE.MeshBasicMaterial({
                    color: 0x6d78b8,
                    transparent: true,
                    opacity: 0.22
                })

            );


        aura.position.set(
            0,
            0.59,
            -3
        );


        this.group.add(
            aura
        );


        // ==================================================
        // MESA DEL SEGUNDO MES
        // ==================================================

        const tableMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x5a3528,
                roughness: 0.75
            });


        const table =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    2.8,
                    0.25,
                    1.3
                ),

                tableMaterial

            );


        table.position.set(
            0,
            1,
            -3
        );


        table.castShadow = true;

        this.group.add(
            table
        );


        // ==================================================
        // PATAS DE LA MESA
        // ==================================================

        const legMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x3b241c
            });


        for (const x of [-1, 1]) {

            for (const z of [-0.4, 0.4]) {

                const leg =
                    new THREE.Mesh(

                        new THREE.BoxGeometry(
                            0.15,
                            1,
                            0.15
                        ),

                        legMaterial

                    );


                leg.position.set(
                    x,
                    0.5,
                    -3 + z
                );


                leg.castShadow = true;

                this.group.add(
                    leg
                );

            }

        }


        // ==================================================
        // ❤️ CORAZÓN FLOTANTE
        // ==================================================

        const heartMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xff4f9a,

                emissive: 0xff1f7a,

                emissiveIntensity: 2.5,

                roughness: 0.4,

                metalness: 0.1

            });


        const heart =
            new THREE.Group();


        // --------------------------------------------------
        // PARTE IZQUIERDA
        // --------------------------------------------------

        const left =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.32,
                    20,
                    20
                ),

                heartMaterial

            );


        left.position.set(
            -0.20,
            0.08,
            0
        );


        left.scale.set(
            1,
            1,
            0.85
        );


        heart.add(
            left
        );


        // --------------------------------------------------
        // PARTE DERECHA
        // --------------------------------------------------

        const right =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.32,
                    20,
                    20
                ),

                heartMaterial

            );


        right.position.set(
            0.20,
            0.08,
            0
        );


        right.scale.set(
            1,
            1,
            0.85
        );


        heart.add(
            right
        );


        // --------------------------------------------------
        // PUNTA
        // --------------------------------------------------

        const point =
            new THREE.Mesh(

                new THREE.ConeGeometry(
                    0.43,
                    0.75,
                    4
                ),

                heartMaterial

            );


        point.rotation.x =
            Math.PI;


        point.position.set(
            0,
            -0.22,
            0
        );


        heart.add(
            point
        );


        // --------------------------------------------------
        // POSICIÓN DEL CORAZÓN
        // --------------------------------------------------

        heart.position.set(
            0,
            2.05,
            -3
        );


        this.heart =
            heart;


        this.group.add(
            heart
        );


        // ==================================================
        // 💗 LUZ DEL CORAZÓN
        // ==================================================

        const heartLight =
            new THREE.PointLight(

                0xff4f9a,

                2.5,

                6

            );


        heartLight.position.set(
            0,
            2.05,
            -3
        );

        this.heartLight = heartLight;

        this.group.add(heartLight);

        this.heart = heart;

        this.group.add(heart);

        this.heartParticles = [];
        this.heartDestroyed = false;




        // ==================================================
        // AGREGAR AL ESCENARIO
        // ==================================================

        this.scene.add(
            this.group
        );

    }

    // ==================================================
// ❤️ CORAZÓN → PARTÍCULAS
// ==================================================

destroyHeart = () => {

    if (this.heartDestroyed) return;

    this.heartDestroyed = true;

    const center =
        this.heart.getWorldPosition(
            new THREE.Vector3()
        );

    // Ocultar corazón
    this.heart.visible = false;

    const particles = [];

    for (let i = 0; i < 45; i++) {

        const geometry =
            new THREE.SphereGeometry(
                0.055,
                6,
                6
            );

        const material =
            new THREE.MeshBasicMaterial({
                color:
                    Math.random() > 0.5
                        ? 0xff4fa3
                        : 0xff9dcc
            });

        const particle =
            new THREE.Mesh(
                geometry,
                material
            );

        particle.position.copy(center);

        particle.userData.velocity =
            new THREE.Vector3(
                (Math.random() - 0.5) * 0.14,
                (Math.random() - 0.5) * 0.14,
                (Math.random() - 0.5) * 0.14
            );

        this.scene.add(particle);

        particles.push(particle);
    }

    let elapsed = 0;

    const animateParticles = () => {

        elapsed += 0.016;

        particles.forEach(particle => {

            particle.position.add(
                particle.userData.velocity
            );

            particle.userData.velocity.y -= 0.002;

            particle.scale.multiplyScalar(0.98);

        });

        if (elapsed < 1.5) {

            requestAnimationFrame(
                animateParticles
            );

        } else {

            particles.forEach(particle => {

                this.scene.remove(particle);

                particle.geometry.dispose();
                particle.material.dispose();

            });

        }

    };

    animateParticles();
};



    // ==================================================
    // FAROL
    // ==================================================

    createLantern(x, z) {

        const group =
            new THREE.Group();


        // ==================================================
        // POSTE
        // ==================================================

        const pole =
            new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.06,
                    0.08,
                    1.5,
                    10
                ),

                new THREE.MeshStandardMaterial({
                    color: 0x3d3030,
                    roughness: 0.9
                })

            );


        pole.position.y =
            0.75;


        group.add(
            pole
        );


        // ==================================================
        // LUZ DEL FAROL
        // ==================================================

        const light =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.22,
                    12,
                    12
                ),

                new THREE.MeshStandardMaterial({

                    color: 0xffe6a3,

                    emissive: 0xffb347,

                    emissiveIntensity: 2.5

                })

            );


        light.position.y =
            1.55;


        group.add(
            light
        );


        // ==================================================
        // POINT LIGHT
        // ==================================================

        const pointLight =
            new THREE.PointLight(

                0xffc978,

                1.8,

                5

            );


        pointLight.position.y =
            1.55;


        group.add(
            pointLight
        );


        // ==================================================
        // POSICIÓN
        // ==================================================

        group.position.set(
            x,
            0,
            z
        );


        this.group.add(
            group
        );

    }


    // ==================================================
    // UPDATE
    // ==================================================

    update(time) {

        // ==================================================
// CORAZÓN DE LOS RECUERDOS
// ==================================================


        // ==================================================
        // ❤️ CORAZÓN FLOTANDO
        // ==================================================

        if (this.heart) {

            this.heart.position.y =
                2.05 +
                Math.sin(time * 2) *
                0.12;


            this.heart.rotation.y =
                Math.sin(time * 1.2) *
                0.12;

        }


        // ==================================================
        // 💗 PULSO DE LA LUZ
        // ==================================================

        if (this.heartLight) {

            this.heartLight.intensity =
                2.2 +
                Math.sin(time * 3) *
                0.7;

        }


        // ==================================================
        // ✨ LUCiÉRNAGAS
        // ==================================================

        for (
            let i = 0;
            i < this.fireflies.length;
            i++
        ) {

            const firefly =
                this.fireflies[i];


            firefly.position.y =
                firefly.userData.baseY +

                Math.sin(
                    time * 1.5 +
                    firefly.userData.offset
                ) * 0.25;


            if (
                firefly.material &&
                firefly.material.emissive
            ) {

                firefly.material.emissiveIntensity =
                    1.5 +

                    Math.sin(
                        time * 3 +
                        firefly.userData.offset
                    ) * 0.8;

            }

        }

    }

}