import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

import { Lighting } from "../world/Lighting.js";
import { Fog } from "../world/Fog.js";
import { Island } from "../world/Island.js";
import { Grass } from "../world/Grass.js";
import { Flowers } from "../world/Flowers.js";
import { Clouds } from "../world/Clouds.js";
import { Trees } from "../world/Trees.js";
import { Path } from "../world/Path.js";
import { Player } from "../player/Player.js";
import { Collectible } from "../world/Collectible.js";
import { Butterflies } from "../world/Butterflies.js";
import { FinalArea } from "../world/FinalArea.js";
import { Torii } from "../world/Torii.js";
import { CherryTree } from "../world/CherryTree.js";
import { AnniversaryTable } from "../world/AnniversaryTable.js";
import { Garden } from "../world/Garden.js";

import { SecondMonthArea } from "../world/SecondMonthArea.js";
import { SecondMonthCollectible } from "../world/SecondMonthCollectible.js";
import { SecondMonthBridge } from "../world/SecondMonthBridge.js";
import { Aurora } from "./Aurora.js";

export class SceneManager {

    constructor() {

        // ==================================================
        // ESCENA
        // ==================================================

        this.scene =
            new THREE.Scene();

        this.scene.background =
            new THREE.Color(
                0xffb37a
            );


        // ==================================================
        // MUNDO PRINCIPAL
        // ==================================================

        new Lighting(
            this.scene
        );

        new Fog(
            this.scene
        );

        new Island(
            this.scene
        );

        new Grass(
            this.scene
        );

        new Flowers(
            this.scene
        );

        new Trees(
            this.scene
        );

        new Path(
            this.scene
        );

        new FinalArea(
            this.scene
        );

        new Torii(
            this.scene
        );


        // ==================================================
        // CEREZOS
        // ==================================================

        new CherryTree(
            this.scene,
            4,
            -8
        );

        new CherryTree(
            this.scene,
            10,
            -8
        );


        // ==================================================
        // JARDÍN
        // ==================================================

        new Garden(
            this.scene
        );


        // ==================================================
        // MESA DE SUSHI
        // ==================================================

        this.table =
            new AnniversaryTable(
                this.scene
            );


        // ==================================================
        // NUBES
        // ==================================================

        new Clouds(
            this.scene
        );


        // ==================================================
        // JUGADOR
        // ==================================================

        this.player =
            new Player(
                this.scene
            );


        // ==================================================
        // MARIPOSAS
        // ==================================================

        this.butterflies =
            new Butterflies(
                this.scene
            );


        // ==================================================
        // RECUERDOS PRIMER MES
        // ==================================================

        this.collectibles = [];


        const collectiblePositions = [

            { x: -7, z: -3 },

            { x: -2, z: 6 },

            { x: 3, z: -5 },

            { x: 11, z: -2 }

        ];


        for (
            const position
            of collectiblePositions
        ) {

            const collectible =
                new Collectible(
                    this.scene,
                    position.x,
                    position.z
                );


            this.collectibles.push(
                collectible
            );

        }


        // ==================================================
        // MENSAJES PRIMER MES
        // ==================================================

        this.messages = [

            "Every little moment with you became a memory I wanted to keep.",

            "I love the way even the smallest conversations with you can make my day better.",

            "Distance may separate us sometimes, but you are always close to my heart.",

            "Thank you for all the smiles, laughs and beautiful moments we have shared."

        ];


        this.currentMessage =
            0;


        // ==================================================
        // RECUERDOS SEGUNDO MES
        // ==================================================

        this.secondMonthCollectibles =
            [];


        this.secondMonthMessages = [

            "Two months with you... and somehow, every day, I find another reason to love you. ❤️",

            "Even from far away, you have become such an important part of my life. I can't wait for the day when distance isn't between us anymore.",

            "I keep imagining all the little things we'll do when we're finally together — the conversations, the laughs, the hugs, and all the moments we haven't lived yet. ❤️",

            "You found the last memory... but there is one more thing waiting for you. This time, I don't want to write it here. I want to tell you when I'm standing right in front of you. ❤️"

        ];


        this.secondMonthMessage =
            0;


        // ==================================================
        // ESTADO
        // ==================================================

        this.finished =
            false;

        this.secondMonthUnlocked =
            false;

        this.secondMonthFinished =
            false;


        // ==================================================
        // AURORA
        // ==================================================

        this.auroraTriggered =
            false;
        // TEXTO EN EL CIELO
        this.loveSkyText =
        null;

        // ==================================================
        // INTERACCIÓN
        // ==================================================

        this.interaction =
            document.getElementById(
                "interaction"
            );


        // ==================================================
        // SEGUNDO MUNDO
        // ==================================================

        this.secondMonthEntrance =
            null;

        this.secondMonthArea =
            null;

        this.secondMonthBridge =
            null;

    }


    // ==================================================
    // UPDATE
    // ==================================================

    update(time) {

        // ==================================================
        // SEGUNDO MUNDO
        // ==================================================

        if (
            this.secondMonthArea
        ) {

            if (
                typeof this.secondMonthArea.update ===
                "function"
            ) {

                this.secondMonthArea.update(
                    time
                );

            }

        }


        // ==================================================
        // MARIPOSAS
        // ==================================================

        if (
            this.butterflies
        ) {

            this.butterflies.update(
                time
            );

        }


        // ==================================================
        // RECUERDOS PRIMER MES
        // ==================================================

        for (
            const collectible
            of this.collectibles
        ) {

            if (
                typeof collectible.update ===
                "function"
            ) {

                collectible.update(
                    time
                );

            }

        }


        // ==================================================
        // SEGUNDO MES
        // ==================================================

        if (
            this.secondMonthUnlocked
        ) {

            this.updateSecondMonth(
                time
            );

            return;

        }


        // ==================================================
        // RECOGER RECUERDOS
        // ==================================================

        for (
            const collectible
            of this.collectibles
        ) {

            if (
                collectible.collected
            ) {

                continue;

            }


            const position =
                collectible.group
                    ? collectible.group.position
                    : collectible.mesh.position;


            const distance =
                this.player.mesh.position.distanceTo(
                    position
                );


            if (
                distance < 0.8
            ) {

                collectible.collect();


                if (
                    this.currentMessage <
                    this.messages.length
                ) {

                    this.showMemory(

                        this.messages[
                            this.currentMessage
                        ]

                    );

                    this.currentMessage++;

                }

            }

        }


        // ==================================================
        // TODOS LOS RECUERDOS
        // ==================================================

        const allCollected =
            this.collectibles.every(
                c =>
                    c.collected
            );


        // ==================================================
        // SEGURIDAD
        // ==================================================

        if (
            !this.interaction ||
            !this.table ||
            !this.player
        ) {

            return;

        }


        if (
            !allCollected
        ) {

            this.interaction.classList.add(
                "hidden"
            );

            return;

        }


        // ==================================================
        // DISTANCIA A LA MESA
        // ==================================================

        const tableDistance =
            this.player.mesh.position.distanceTo(
                this.table.mesh.position
            );


        // ==================================================
        // CERCA DE LA MESA
        // ==================================================

        if (
            tableDistance < 2.5
        ) {

            this.interaction.classList.remove(
                "hidden"
            );


            this.interaction.innerHTML =
                "Press <b>E</b> to unlock Chapter II ❤️";


            if (
                this.player.pressedE()
            ) {

                this.unlockSecondMonth();

            }

        } else {

            this.interaction.classList.add(
                "hidden"
            );

        }

    }
        // ==================================================
    // DESBLOQUEAR SEGUNDO MES
    // ==================================================

    unlockSecondMonth() {

        if (
            this.secondMonthUnlocked
        ) {

            return;

        }


        this.secondMonthUnlocked =
            true;


        // ==================================================
        // OCULTAR INTERACCIÓN
        // ==================================================

        if (
            this.interaction
        ) {

            this.interaction.classList.add(
                "hidden"
            );

        }


        // ==================================================
        // CAMBIAR A NOCHE
        // ==================================================

        this.scene.background =
            new THREE.Color(
                0x071426
            );


        // ==================================================
        // CREAR SEGUNDO MUNDO
        // ==================================================

        if (
            !this.secondMonthArea
        ) {

            this.secondMonthArea =
                new SecondMonthArea(
                    this.scene
                );

        }

        // AURORA DEL SEGUNDO MES
        this.aurora = new Aurora(this.scene);

        // ==================================================
        // CREAR PUENTE
        // ==================================================

        if (
            !this.secondMonthBridge
        ) {

            this.secondMonthBridge =
                new SecondMonthBridge(
                    this.scene
                );

        }


        // ==================================================
        // CREAR RECUERDOS DEL SEGUNDO MES
        // ==================================================

        this.createSecondMonthCollectibles();


        // ==================================================
        // MENSAJE
        // ==================================================

        this.showChapterTwo();

    }


    // ==================================================
    // CREAR RECUERDOS DEL SEGUNDO MES
    // ==================================================

    createSecondMonthCollectibles() {

        // Limpiar por seguridad

        this.secondMonthCollectibles =
            [];


        // ==================================================
        // POSICIONES
        //
        // Están distribuidas por el segundo mundo.
        // ==================================================

const positions = [

    // Memoria 1 — lado izquierdo, cerca del borde
    {
        x: -4.5,
        z: -40
    },

    // Memoria 2 — lado derecho
    {
        x: 4.5,
        z: -40
    },

    // Memoria 3 — izquierda, más al fondo
    {
        x: -4.5,
        z: -44
    },

    // Memoria 4 — derecha, más al fondo
    {
        x: 4.5,
        z: -44
    }

];


        // ==================================================
        // CREAR RECUERDOS
        // ==================================================

        for (
            const position
            of positions
        ) {

            const collectible =
                new SecondMonthCollectible(

                    this.scene,

                    position.x,

                    position.z

                );


            this.secondMonthCollectibles.push(
                collectible
            );

        }

    }


    // ==================================================
    // ACTUALIZAR SEGUNDO MES
    // ==================================================

    updateSecondMonth(time) {

        // ==================================================
        // ACTUALIZAR RECUERDOS
        // ==================================================

        for (
            const collectible
            of this.secondMonthCollectibles
        ) {

            if (
                typeof collectible.update ===
                "function"
            ) {

                collectible.update(
                    time
                );

            }

        }


        // ==================================================
        // RECOGER RECUERDOS
        // ==================================================

        for (
            const collectible
            of this.secondMonthCollectibles
        ) {

            if (
                collectible.collected
            ) {

                continue;

            }


            const position =
                collectible.group
                    ? collectible.group.position
                    : collectible.mesh.position;


            const distance =
                this.player.mesh.position.distanceTo(
                    position
                );


            if (
                distance < 1.2
            ) {

                collectible.collect();


                // ==================================================
                // MOSTRAR MENSAJE
                // ==================================================

                if (
                    this.secondMonthMessage <
                    this.secondMonthMessages.length
                ) {

                    this.showMemory(

                        this.secondMonthMessages[
                            this.secondMonthMessage
                        ]

                    );


                    this.secondMonthMessage++;

                }


                // ==================================================
                // TERMINÓ LOS RECUERDOS
                // ==================================================

                if (
                    this.secondMonthMessage >=
                    this.secondMonthMessages.length
                ) {

                    this.secondMonthFinished =
                        true;

                }

            }

        }


        // ==================================================
        // CORAZÓN
        // ==================================================

        if (
            this.secondMonthArea &&
            this.secondMonthArea.heart
        ) {

            const heartPosition =
                new THREE.Vector3();


            this.secondMonthArea.heart
                .getWorldPosition(
                    heartPosition
                );


            const distance =
                this.player.mesh.position.distanceTo(
                    heartPosition
                );


            // ==================================================
            // SOLO DESPUÉS DE LAS MEMORIAS
            // ==================================================

            if (
                this.secondMonthFinished &&
                !this.auroraTriggered
            ) {

                if (
                    distance < 2.5
                ) {

                    if (
                        this.interaction
                    ) {

                        this.interaction.classList.remove(
                            "hidden"
                        );


                        this.interaction.innerHTML =
                            "Press <b>E</b> to touch the heart ❤️";

                    }


                    // ==================================================
                    // PRESIONAR E
                    // ==================================================

                    if (
                        this.player.pressedE()
                    ) {

                            // ❤️ DESINTERGRAR EL CORAZON
    if (

        this.secondMonthArea &&
        !this.secondMonthArea.heartDestroyed
    ) {
        
    {
        this.secondMonthArea.destroyHeart();
    }

      // 🌌 ACTIVAR AURORA
    this.auroraTriggered = true;

    if (this.interaction) {
        this.interaction.classList.add("hidden");
    }

}

    


                        // ==================================================
                        // ACTIVAR AURORA
                        // ==================================================

                        

                        // ==================================================
                        // CARTA DESPUÉS DE 5 SEGUNDOS
                        // ==================================================
                    if (
                    typeof this.secondMonthArea.activateAurora ===
                    "function"
) {

    this.secondMonthArea.activateAurora();

    // Mostrar I LOVE U en el cielo
    this.createLoveSkyText();

}
                        setTimeout(
                            () => {

                                // ==================================================


                                this.showSecondMonthLetter();

                            },
                            5000
                        );

                    }

                } else {

                    if (
                        this.interaction
                    ) {

                        this.interaction.classList.add(
                            "hidden"
                        );

                    }

                }

            } else {

                if (
                    this.interaction
                ) {

                    this.interaction.classList.add(
                        "hidden"
                    );

                }

            }

        }

    }


    // ==================================================
    // MOSTRAR MEMORIA
    // ==================================================

    showMemory(message) {

        const container =
            document.getElementById(
                "letterContainer"
            );


        if (
            !container
        ) {

            return;

        }


        container.innerHTML = `

            <div class="letter-overlay">

                <div class="letter-card">

                    <p>
                        ${message}
                    </p>

                    <button
                        id="closeMemory"
                    >
                        Continue
                    </button>

                </div>

            </div>

        `;


        const closeButton =
            document.getElementById(
                "closeMemory"
            );


        if (
            closeButton
        ) {

            closeButton.addEventListener(
                "click",
                () => {

                    container.innerHTML =
                        "";

                }
            );

        }

    }


    // ==================================================
    // CAPÍTULO II
    // ==================================================

    showChapterTwo() {

        const container =
            document.getElementById(
                "letterContainer"
            );


        if (
            !container
        ) {

            return;

        }


        container.innerHTML = `

            <div class="letter-overlay">

                <div class="letter-card">

                    <h1>
                        Chapter II 🌙
                    </h1>

                    <p>
                        Two months.
                    </p>

                    <p>
                        Another little world
                        is waiting for you.
                    </p>

                    <button
                        id="closeChapterTwo"
                    >
                        Continue
                    </button>

                </div>

            </div>

        `;


        const button =
            document.getElementById(
                "closeChapterTwo"
            );


        if (
            button
        ) {

            button.addEventListener(
                "click",
                () => {

                    container.innerHTML =
                        "";

                }
            );

        }

    }


    // ==================================================
    // CARTA DEL SEGUNDO MES
    // ==================================================

    showSecondMonthLetter() {

        const container =
            document.getElementById(
                "letterContainer"
            );


        if (
            !container
        ) {

            return;

        }


        container.innerHTML = `

            <div class="letter-overlay">

                <div class="letter-card">

                    <h1>
                        For When I See You ❤️
                    </h1>

                    <p>
                        If you're reading this,
                        then the moment I've been
                        waiting for is finally here.
                    </p>

                    <p>
                        We've shared so many memories
                        from far away, but this is one
                        I don't want to experience
                        through a screen.
                    </p>

                    <p>
                        I want to see your face,
                        hear your voice,
                        and finally have you
                        standing right in front of me.
                    </p>

                    <p>
                        So when I see you,
                        just remember this:
                    </p>

                    <h2>
                        I have been waiting for you. ❤️
                    </h2>

                    <button
                        id="closeSecondMonthLetter"
                    >
                        Close
                    </button>

                </div>

            </div>

        `;


        const button =
            document.getElementById(
                "closeSecondMonthLetter"
            );


        if (
            button
        ) {

            button.addEventListener(
                "click",
                () => {

                    container.innerHTML =
                        "";

                }
            );

        }

    }

        // ==================================================
    // CARTA FINAL DEL PRIMER MES
    // ==================================================

    showFinalLetter() {

        const container =
            document.getElementById(
                "letterContainer"
            );


        if (
            !container
        ) {

            return;

        }


        container.innerHTML = `

            <div class="letter-overlay">

                <div class="letter-card">

                    <h1>
                        Happy First Month ❤️
                    </h1>

                    <p>
                        This little world was my way
                        of saying thank you.
                    </p>

                    <p>
                        Thank you for every smile,
                        every conversation,
                        every late-night message,
                        and every memory we've
                        already created.
                    </p>

                    <p>
                        This is only the first chapter
                        of our story.
                    </p>

                    <p>
                        And someday, when I finally
                        see you in person, I hope we
                        can create even more memories
                        together.
                    </p>

                    <h2>
                        I love you ❤️
                    </h2>

                    <button
                        id="closeLetter"
                    >
                        Close
                    </button>

                </div>

            </div>

        `;


        const button =
            document.getElementById(
                "closeLetter"
            );


        if (
            button
        ) {

            button.addEventListener(
                "click",
                () => {

                    container.innerHTML =
                        "";

                }
            );

        }

    }
}