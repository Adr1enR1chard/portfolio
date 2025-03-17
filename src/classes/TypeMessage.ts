export class TypeMessage {
    private message: string;
    private delay: number = 100;
    private typingSpeed: number = 50;

    constructor(message: string, delay: number = 100, typingSpeed: number = 50) {
        this.message = message;
        this.delay = delay;
        this.typingSpeed = typingSpeed;
    }

    public getMessage() {
        return this.message;
    }

    public getDelay() {
        return this.delay;
    }

    public getTypingSpeed() {
        return this.typingSpeed;
    }
}