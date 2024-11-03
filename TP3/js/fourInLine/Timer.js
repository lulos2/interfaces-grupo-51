class Timer {
    constructor(elementId, seconds, minutes, onTimeUpCallback) {
        // Inicializa el elemento del DOM donde se mostrará el tiempo y los valores iniciales
        this.element = document.getElementById(elementId); // Elemento de la interfaz
        this.seconds = 0;
        this.minutes = 0;
        this.isCountdown = false;            // Estado de cuenta regresiva
        this.timer = null;                   // Intervalo del temporizador
        this.onTimeUpCallback = onTimeUpCallback || function() {};  // Callback al finalizar el tiempo

        // Establece los valores iniciales del temporizador
        this.setTime(minutes, seconds);
    }

    // Inicia la cuenta regresiva
    start() {
        if (!this.isCountdown) {
            this.isCountdown = true;
            if (this.timer) {
                clearInterval(this.timer);
            }
            // Establece una función que actualiza el temporizador cada segundo
            this.timer = setInterval(() => this.updateTimer(), 1000);
        }
    }

    // Detiene la cuenta regresiva
    stop() {
        this.isCountdown = false;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    // Reinicia el temporizador con nuevos valores de minutos y segundos
    reset(minutes, seconds) {
        this.stop();
        this.setTime(minutes, seconds);
    }

    // Configura el tiempo del temporizador en minutos y segundos
    setTime(minutes, seconds) {
        this.minutes = parseInt(minutes) || 0;
        this.seconds = parseInt(seconds) || 0;
        this.updateDisplay();  // Actualiza el elemento de visualización
    }

    // Actualiza el tiempo restante en cada intervalo
    updateTimer() {
        if (this.isCountdown) {
            if (this.minutes === 0 && this.seconds === 0) {
                this.stop();
                this.timeIsUp();  // Llama al callback cuando el tiempo se termina
                return;
            }
            if (this.seconds === 0) {
                this.seconds = 59;
                this.minutes--;
            } else {
                this.seconds--;
            }
        }
        this.updateDisplay();  // Muestra el tiempo restante en el elemento
    }

    // Actualiza el elemento de visualización con el tiempo actual
    updateDisplay() {
        this.element.textContent = `${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`;
    }

    // Llama al callback configurado cuando el tiempo se acaba
    timeIsUp() {
        this.onTimeUpCallback();
    }
}