
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const canvas = document.getElementById('gameCanvas');
    canvas.width = 1000;
    canvas.height = 625;
    const boardSizeSelect = document.getElementById('boardSize');
    const restartBtn = document.getElementById('restartBtn');
    let game;

    // Inicializar el juego
    function initializeGame() {
        const boardSize = parseInt(boardSizeSelect.value);
        game = new Game(canvas, boardSize);

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
        game.initGame();
    });

    // Iniciar el juego
    initializeGame();
});