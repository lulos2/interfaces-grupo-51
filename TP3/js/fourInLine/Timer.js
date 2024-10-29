class Timer {
    constructor(elementId, seconds , minutes, onTimeUpCallback) {
        this.element = document.getElementById(elementId);
        this.seconds = 0;
        this.minutes = 0;
        this.isCountdown = false;
        this.timer = null;
        this.onTimeUpCallback = onTimeUpCallback || function() {};
        this.setTime(minutes, seconds);
    }

    start() {
        if (!this.isCountdown) {
            this.isCountdown = true;
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.timer = setInterval(() => this.updateTimer(), 1000);
        }
    }

    stop() {
        this.isCountdown = false;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    reset(minutes, seconds) {
        this.stop();
        this.setTime(minutes, seconds);
    }

    setTime(minutes, seconds) {
        this.minutes = parseInt(minutes) || 0;
        this.seconds = parseInt(seconds) || 0;
        this.updateDisplay();
    }

    updateTimer() {
        if (this.isCountdown) {
            if (this.minutes === 0 && this.seconds === 0) {
                this.stop();
                this.timeIsUp();
                return;
            }
            if (this.seconds === 0) {
                this.seconds = 59;
                this.minutes--;
            } else {
                this.seconds--;
            }
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.element.textContent = `${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`;
    }

    timeIsUp(message = '¡Tiempo terminado!') {
        alert(message);
        this.onTimeUpCallback();
    }
}