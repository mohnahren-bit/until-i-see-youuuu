export class MessageUI {

    constructor() {

        this.overlay = document.getElementById("messageOverlay");
        this.text = document.getElementById("messageText");

        this.waiting = false;

        window.addEventListener("keydown", (event) => {

            if (!this.waiting) return;

            if (event.code === "Space") {

                this.hide();

            }

        });

    }

    show(message) {

        this.text.textContent = message;

        this.overlay.classList.remove("hidden");

        this.waiting = true;

    }

    hide() {

        this.overlay.classList.add("hidden");

        this.waiting = false;

    }

}