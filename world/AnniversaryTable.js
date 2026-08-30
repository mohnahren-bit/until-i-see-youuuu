import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export class AnniversaryTable {

    constructor(scene) {

        const table = new THREE.Group();

        const wood = new THREE.MeshStandardMaterial({
            color: 0x8D6E63
        });

        // =========================
        // MESA
        // =========================

        const top = new THREE.Mesh(
            new THREE.BoxGeometry(2.2, 0.12, 1.4),
            wood
        );

        top.position.y = 0.55;
        table.add(top);

        const legPositions = [
            [-0.9,0.25,-0.5],
            [ 0.9,0.25,-0.5],
            [-0.9,0.25, 0.5],
            [ 0.9,0.25, 0.5]
        ];

        for(const pos of legPositions){

            const leg = new THREE.Mesh(
                new THREE.BoxGeometry(0.12,0.5,0.12),
                wood
            );

            leg.position.set(...pos);

            table.add(leg);

        }

        // =========================
        // BANDEJA
        // =========================

        const tray = new THREE.Mesh(

            new THREE.BoxGeometry(1.25,0.05,0.75),

            new THREE.MeshStandardMaterial({
                color:0x5d4037
            })

        );

        tray.position.set(0,0.64,0);

        table.add(tray);

        // =========================
        // SUSHI
        // =========================

        const riceMaterial = new THREE.MeshStandardMaterial({
            color:0xf8f8f8
        });

        const salmonMaterial = new THREE.MeshStandardMaterial({
            color:0xff8a65
        });

        const seaweedMaterial = new THREE.MeshStandardMaterial({
            color:0x222222
        });

        function createNigiri(x,z){

            const group=new THREE.Group();

            const rice=new THREE.Mesh(

                new THREE.BoxGeometry(.18,.08,.12),

                riceMaterial

            );

            const fish=new THREE.Mesh(

                new THREE.BoxGeometry(.20,.03,.13),

                salmonMaterial

            );

            fish.position.y=.05;

            group.add(rice);
            group.add(fish);

            group.position.set(x,.70,z);

            table.add(group);

        }

        function createMaki(x,z){

            const group=new THREE.Group();

            const rice=new THREE.Mesh(

                new THREE.CylinderGeometry(.055,.055,.08,20),

                riceMaterial

            );

            const seaweed=new THREE.Mesh(

                new THREE.CylinderGeometry(.06,.06,.085,20),

                seaweedMaterial

            );

            group.add(seaweed);
            group.add(rice);

            group.position.set(x,.70,z);

            table.add(group);

        }

        createNigiri(-0.35,-0.18);
        createNigiri(-0.10,-0.18);
        createNigiri( 0.15,-0.18);
        createNigiri( 0.40,-0.18);

        createMaki(-0.28,0.18);
        createMaki(-0.08,0.18);
        createMaki( 0.12,0.18);
        createMaki( 0.32,0.18);

        // =========================
        // TAZAS
        // =========================

        const cupMaterial=new THREE.MeshStandardMaterial({
            color:0xffffff
        });

        function cup(x){

            const c=new THREE.Mesh(

                new THREE.CylinderGeometry(.07,.07,.11,20),

                cupMaterial

            );

            c.position.set(x,.70,-0.45);

            table.add(c);

        }

        cup(-0.55);
        cup(0.55);

        // =========================
        // PALILLOS
        // =========================

        const chopstickMaterial=new THREE.MeshStandardMaterial({
            color:0xc68642
        });

        function chopsticks(x){

            const stick1=new THREE.Mesh(

                new THREE.CylinderGeometry(.008,.008,.45,8),

                chopstickMaterial

            );

            const stick2=stick1.clone();

            stick1.rotation.z=Math.PI/2;
            stick2.rotation.z=Math.PI/2;

            stick1.position.set(x,.69,.42);
            stick2.position.set(x,.69,.39);

            table.add(stick1);
            table.add(stick2);

        }

        chopsticks(-0.55);
        chopsticks(0.55);

        // =========================

        table.scale.set(1.5,1.5,1.5);

        table.position.set(7.4,0.35,-7.0);

        scene.add(table);

        this.mesh=table;

    }

}