import { TypeMessage } from "./TypeMessage";

export class TypeWriter {
    static #instance: TypeWriter;

    public static get instance(): TypeWriter {
        if (!this.#instance) {
            this.#instance = new TypeWriter();
        }

        return this.#instance;
    }


    private messages: TypeMessage[] = [
        new TypeMessage("Loading interactive portfolio...", 100, 10),
    ];
    private currentMessageIndex: number = 0;
    private currentCharIndex: number = 0;
    private container: HTMLUListElement;
    private currentLi: HTMLLIElement | null = null;
    private isTyping: boolean = false

    private constructor() {
        this.container = document.querySelector("#console ul") as HTMLUListElement;
        this.newLi();
    }

    public async startTyping() {
        if (this.isTyping) {
            return;
        }
        this.isTyping = true;
        while (this.messages.length != 0) {
            const typeMessage = this.popMessages();
            await this.typeMessage(typeMessage);
            this.currentMessageIndex++;
        }
        this.isTyping = false;
    }

    public pushNewMessage(typeMessage: TypeMessage) {
        this.messages.push(typeMessage);
        this.startTyping();
    }

    private popMessages() {
        const message = this.messages[0];
        this.messages.splice(0, 1);
        return message;
    }

    private async typeMessage(typeMessage: TypeMessage) {
        const p = this.currentLi?.querySelector('p');
        if (!p) {
            throw new Error('TypeWriter error');
        }

        const message = typeMessage.getMessage();
        for (let i = 0; i < message.length; i++) {
            p.textContent = message.slice(0, i + 1);
            p.classList.add("typing");
            await this.wait(typeMessage.getTypingSpeed());
        }
        p.classList.remove("typing");
        // Create the next p
        this.newLi();

        await this.wait(typeMessage.getDelay());
    }

    private newLi() {
        this.currentLi = document.createElement("li");
        const p = document.createElement("p");
        this.currentLi.appendChild(p);
        this.container.appendChild(this.currentLi);
        p.classList.add("typing");
    }

    private wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private async onLoad() {
        this.startTyping();
    }

    private async onLoadComplete() {
        this.pushNewMessage(
            new TypeMessage("Portfolio loaded !", 100, 10))
        this.pushNewMessage(
            new TypeMessage("Scroll down to continue...", 50, 10))
    }
}
