export default class Stopwatch {
    constructor() {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.running = false;
    }

    start() {
        if (!this.running) {
            this.startTime = Date.now();
            this.running = true;
        }
    }

    stop() {
        if (this.running) {
            this.elapsedTime += Date.now() - this.startTime;
            this.running = false;
        }
    }

    reset() {
        this.elapsedTime = 0;
        if (this.running) {
            this.startTime = Date.now();
        }
    }

    getElapsedTime() {
        if (this.running) {
            return this.elapsedTime + (Date.now() - this.startTime);
        }
        return this.elapsedTime;
    }
}
