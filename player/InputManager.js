export class InputManager {

    constructor() {

        this.keys = {};
        this.justPressed = {};

        window.addEventListener("keydown", (event) => {

            if (!this.keys[event.code]) {

                this.justPressed[event.code] = true;

            }

            this.keys[event.code] = true;

        });

        window.addEventListener("keyup", (event) => {

            this.keys[event.code] = false;

        });

        // Reinicia las teclas cuando la ventana pierde el foco (como al abrir un alert)
        window.addEventListener("blur", () => {

            this.keys = {};
            this.justPressed = {};

        });

    }

    consumeKey(code) {

        if (this.justPressed[code]) {

            this.justPressed[code] = false;

            return true;

        }

        return false;

    }

}