
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const canvas = document.getElementById('gameCanvas');
    const boardSizeSelect = document.getElementById('boardSize');
    const restartBtn = document.getElementById('restartBtn');
    let tokensP1 = document.getElementById('tokensP1');
    let tokensP2 = document.getElementById('tokensP2');
    let game;

    // Inicializar el juego
    function initializeGame() {
        const boardSize = parseInt(boardSizeSelect.value);

        game = new Game(canvas, boardSize, 'messi.jpg', 'mbappe.jpg');
        gameMenu.setGame(game);

        // Iniciar el loop de dibujado
        game.draw();
    }

    // Event Listeners
    canvas.addEventListener('mousedown', (e) => game.handleClick(e));
    canvas.addEventListener('mousemove', (e) => game.handleMove(e));
    canvas.addEventListener('mouseup', (e) => game.handleRelease(e));
    canvas.addEventListener('mouseleave', (e) => game.handleRelease(e));

    boardSizeSelect.addEventListener('change', () => {
        game.setBoardSize(boardSizeSelect.value);
    });

    restartBtn.addEventListener('click', () => {
       game.resetGame();
    });

    tokensP1.addEventListener('change', () => {
        game.setPlayer1Image(tokensP1.value);
        console.log(tokensP1.value);
    });

    tokensP2.addEventListener('change', () => {
        game.setPlayer2Image(tokensP2.value);
        console.log(tokensP2.value);
    });

    // Iniciar el juego
    const gameMenu = new GameMenu();
    initializeGame();
});

class GameMenu {
    constructor() {
        this.menuOverlay = document.getElementById('menuOverlay');
        this.playButton = document.getElementById('playButton');
        this.menuButton = document.getElementById('menuBtn');
        this.restartButton = document.getElementById('restartBtn');
        this.boardSizeSelect = document.getElementById('boardSize');
        this.game = null;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.playButton.addEventListener('click', () => {
            this.hideMenu();
        });

        this.menuButton.addEventListener('click', () => {
            this.showMenu();
        });

        this.restartButton.addEventListener('click', () => {
            if (this.game) {
                this.game.resetGame();
            }
        });
    }

    setGame(gameInstance) {
        this.game = gameInstance;
    }

    showMenu() {
        this.menuOverlay.classList.remove('hidden');
        this.game?.stopTimer();
    }

    hideMenu() {
        this.menuOverlay.classList.add('hidden');
        this.game?.starTimer();
    }
}