import { SceneManager } from "./SceneManager.js";
import { CameraManager } from "./CameraManager.js";
import { CameraController } from "./CameraController.js";
import { Renderer } from "./Renderer.js";

export class Game {

    constructor() {

        this.sceneManager = new SceneManager();

        this.cameraManager = new CameraManager();

        this.cameraController = new CameraController(
            this.cameraManager.camera,
            this.sceneManager.player
        );

        this.renderer = new Renderer();

        // ==================================================
        // MÚSICA DEL PRIMER MUNDO
        // ==================================================

        this.music = new Audio("./assets/music.mp3");
        this.music.loop = true;
        this.music.volume = 0.20;


        // ==================================================
        // MÚSICA DEL SEGUNDO MUNDO
        // ==================================================

        this.secondMusic = new Audio(
            "./assets/second-world.mp3");

        this.secondMusic.loop = true;
        this.secondMusic.volume = 0.20;

        this.secondWorldMusicStarted = false;


        // ==================================================
        // INICIAR MÚSICA
        // ==================================================

        // Algunos navegadores bloquean el autoplay.
        // La música comenzará con la primera tecla o clic.

        const startMusic = () => {

            // Si ya estamos en el segundo mundo,
            // comenzar directamente su música.

            if (
                this.sceneManager.secondMonthArea &&
                !this.secondWorldMusicStarted
            ) {

                this.secondWorldMusicStarted = true;

                this.secondMusic
                    .play()
                    .catch(error =>
                        console.error(error)
                    );

            } else {

                this.music
                    .play()
                    .then(() =>
                        console.log("Música iniciada")
                    )
                    .catch(error =>
                        console.error(error)
                    );

            }

            window.removeEventListener(
                "keydown",
                startMusic
            );

            window.removeEventListener(
                "mousedown",
                startMusic
            );

        };


        window.addEventListener(
            "keydown",
            startMusic
        );

        window.addEventListener(
            "mousedown",
            startMusic
        );


        // ==================================================
        // ANIMACIÓN
        // ==================================================

        this.animate =
            this.animate.bind(this);

        this.animate();

    }


    // ==================================================
    // ANIMATE
    // ==================================================

    animate() {

        requestAnimationFrame(
            this.animate
        );


        this.sceneManager.player.update();


        this.sceneManager.update(
            performance.now() * 0.001
        );


        // ==================================================
        // CAMBIAR MÚSICA AL SEGUNDO MUNDO
        // ==================================================

        if (
            this.sceneManager.secondMonthArea &&
            !this.secondWorldMusicStarted
        ) {

            this.secondWorldMusicStarted = true;


            // Detener música del primer mundo

            this.music.pause();

            this.music.currentTime = 0;


            // Iniciar música del segundo mundo

            this.secondMusic
                .play()
                .then(() =>
                    console.log(
                        "Música del segundo mundo iniciada"
                    )
                )
                .catch(error =>
                    console.error(
                        "No se pudo iniciar la música del segundo mundo:",
                        error
                    )
                );

        }


        // ==================================================
        // CÁMARA
        // ==================================================

        this.cameraController.update();


        // ==================================================
        // RENDER
        // ==================================================

        this.renderer.renderer.render(
            this.sceneManager.scene,
            this.cameraManager.camera
        );

    }

}