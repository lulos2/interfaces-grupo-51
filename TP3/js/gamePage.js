// Espera a que el contenido de la página se cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos del DOM
    const canvas = document.getElementById('gameCanvas');         // Canvas del juego
    const boardSizeSelect = document.getElementById('boardSize'); // Selector de tamaño del tablero
    const restartBtn = document.getElementById('restartBtn');     // Botón para reiniciar el juego
    let tokensP1 = document.getElementById('tokensP1');           // Selector de imagen de fichas jugador 1
    let tokensP2 = document.getElementById('tokensP2');           // Selector de imagen de fichas jugador 2
    let game;

    // Función para inicializar el juego
    function initializeGame() {
        const boardSize = parseInt(boardSizeSelect.value);

        // Crea una instancia de `Game` con el tamaño del tablero y las imágenes iniciales
        game = new Game(canvas, boardSize, 'messi.jpg', 'mbappe.jpg');
        gameMenu.setGame(game);  // Asocia el juego con el menú

        // Inicia el ciclo de renderizado del juego
        game.draw();
    }

    // Listeners de eventos del canvas para la interacción del jugador
    canvas.addEventListener('mousedown', (e) => game.handleClick(e));     // Selección de pieza
    canvas.addEventListener('mousemove', (e) => game.handleMove(e));      // Movimiento de la pieza
    canvas.addEventListener('mouseup', (e) => game.handleRelease(e));     // Soltar la pieza
    canvas.addEventListener('mouseleave', (e) => game.handleRelease(e));  // Soltar fuera del canvas

    // Cambia el tamaño del tablero al seleccionar una opción diferente
    boardSizeSelect.addEventListener('change', () => {
        game.setBoardSize(boardSizeSelect.value);
    });

    // Reinicia el juego cuando se hace clic en el botón de reinicio
    restartBtn.addEventListener('click', () => {
        game.resetGame();
    });

    // Actualiza la imagen de las fichas para el jugador 1
    tokensP1.addEventListener('change', () => {
        game.setPlayer1Image(tokensP1.value);
        console.log(tokensP1.value);
    });

    // Actualiza la imagen de las fichas para el jugador 2
    tokensP2.addEventListener('change', () => {
        game.setPlayer2Image(tokensP2.value);
        console.log(tokensP2.value);
    });

    // Crea una instancia de `GameMenu` para el control de la interfaz de menú
    const gameMenu = new GameMenu();
    initializeGame();  // Llama a la función para iniciar el juego
});

// Clase para gestionar el menú del juego
class GameMenu {
    constructor() {
        // Selección de elementos de menú en el DOM
        this.menuOverlay = document.getElementById('menuOverlay');  // Overlay del menú
        this.playButton = document.getElementById('playButton');    // Botón para iniciar el juego
        this.menuButton = document.getElementById('menuBtn');       // Botón para mostrar el menú
        this.restartButton = document.getElementById('restartBtn'); // Botón para reiniciar el juego
        this.boardSizeSelect = document.getElementById('boardSize');// Selector de tamaño del tablero
        this.game = null;  // Referencia al juego actual

        this.initializeEventListeners();  // Configura los listeners del menú
    }

    // Configura los eventos de interacción del menú
    initializeEventListeners() {
        this.playButton.addEventListener('click', () => {
            this.hideMenu();  // Oculta el menú y comienza el juego
        });

        this.menuButton.addEventListener('click', () => {
            this.showMenu();  // Muestra el menú
        });

        this.restartButton.addEventListener('click', () => {
            if (this.game) {
                this.game.resetGame();  // Reinicia el juego si está definido
            }
        });
    }

    // Asigna la instancia del juego al menú
    setGame(gameInstance) {
        this.game = gameInstance;
    }

    // Muestra el menú superpuesto y detiene el temporizador del juego
    showMenu() {
        this.menuOverlay.classList.remove('hidden');
        this.game?.stopTimer();
    }

    // Oculta el menú y reanuda el temporizador del juego
    hideMenu() {
        this.menuOverlay.classList.add('hidden');
        this.game?.startTimer();
    }
}