class Game {
    constructor(canvas, boardSize = 4) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.setBoardSize(boardSize);
        this.initGame();
    }

    setBoardSize(size) {
        this.winCount = parseInt(size);
        this.rows = this.winCount + 2;
        this.cols = this.winCount + 3;


        if (this.board) {
            this.initGame();
        }
    }

    initGame() {
        this.board = new Board(this.canvas.width, this.canvas.height, this.rows, this.cols);
        this.currentPlayer = 1;
        this.gameOver = false;
        this.timeLeft = 300; // 5 minutos
        this.selectedPiece = null;
        this.draggedPiece = null;

        // Crear piezas para ambos jugadores
        this.initializePieces();

        // Iniciar timer
        if (this.timer) clearInterval(this.timer);
        this.startTimer();
    }

    initializePieces() {
        const pieceRadius = Math.min(this.board.cellWidth, this.board.cellHeight) * 0.4;
        const piecesPerPlayer = Math.ceil((this.rows * this.cols) / 2);

        this.pieces = {
            1: [],
            2: []
        };

        const leftMargin = this.board.offsetX / 2; // Mitad del espacio lateral izquierdo
        const rightMargin = this.canvasWidth - (this.board.offsetX / 2); // Mitad del espacio lateral derecho
        const startY = this.board.offsetY;
        const verticalSpacing = (this.canvasHeight - startY) / piecesPerPlayer;

        // Crear piezas para jugador 1 (lado izquierdo)
        for (let i = 0; i < piecesPerPlayer; i++) {
            this.pieces[1].push(new Piece(
                1,
                pieceRadius * 2,
                50 + i * (pieceRadius * 2.5),
                pieceRadius,
                'media/images/adicionales/mbappe.png'
            ));
        }

        // Crear piezas para jugador 2 (lado derecho)
        for (let i = 0; i < piecesPerPlayer; i++) {
            this.pieces[2].push(new Piece(
                2,
                this.canvas.width - pieceRadius * 2,
                50 + i * (pieceRadius * 1.5),
                pieceRadius,
                'media/images/adicionales/mbappe.png'
            ));
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            document.getElementById('timer').textContent = `Tiempo: ${this.timeLeft}s`;

            if (this.timeLeft <= 0) {
                this.endGame('¡Se acabó el tiempo!');
            }
        }, 1000);
    }

    handleClick(e) {
        if (this.gameOver) return;

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Buscar si se hizo click en alguna pieza del jugador actual
        const availablePieces = this.pieces[this.currentPlayer];
        for (let piece of availablePieces) {
            if (!piece.isDragging && piece.isPointInside(mouseX, mouseY)) {
                this.selectedPiece = piece;
                piece.startDragging(mouseX, mouseY);
                break;
            }
        }
    }

    handleMove(e) {
        if (!this.selectedPiece || this.gameOver) return;

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        this.selectedPiece.drag(mouseX, mouseY);
    }

    handleRelease(e) {
        if (!this.selectedPiece || this.gameOver) return;

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const column = this.board.getColumnFromX(mouseX);

        if (column >= 0 && column < this.board.cols) {
            const row = this.board.getLowestEmptyRow(column);

            if (row >= 0) {
                const targetY = row * this.board.cellHeight + this.board.cellHeight / 2;
                this.selectedPiece.x = column * this.board.cellWidth + this.board.cellWidth / 2;
                this.selectedPiece.isDropping = true;

                // Animar la caída
                const dropInterval = setInterval(() => {
                    if (this.selectedPiece && this.selectedPiece.drop(targetY)) {
                        clearInterval(dropInterval);
                        this.board.grid[row][column] = this.selectedPiece;

                        // Verificar victoria
                        if (this.board.checkWin(row, column, this.winCount)) {
                            this.endGame(`¡Jugador ${this.currentPlayer} gana!`);
                        } else {
                            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                        }
                    }
                }, 16);

                // Remover la pieza usada del array de piezas disponibles
                const index = this.pieces[this.currentPlayer].indexOf(this.selectedPiece);
                if (index > -1) {
                    this.pieces[this.currentPlayer].splice(index, 1);
                }
            }
        }

        this.selectedPiece.reset();
        this.selectedPiece.stopDragging();
        this.selectedPiece = null;
    }

    endGame(message) {
        this.gameOver = true;
        clearInterval(this.timer);
        setTimeout(() => {
            alert(message);
        }, 100);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar tablero
        this.board.draw(this.ctx);

        // Dibujar piezas disponibles
        for (let player in this.pieces) {
            this.pieces[player].forEach(piece => piece.draw(this.ctx));
        }

        // Solicitar siguiente frame
        requestAnimationFrame(() => this.draw());
    }
}
