class Game {

    constructor(canvas, boardSize = 4, imgPlayer1, imgPlayer2 ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isDragging = false;
        this.highlightedColumn = -1;
        this.dropZoneHeight = 90;

        this.timerPlayer1 = new Timer("timerPlayer1",0,2, () => this.endGame("Gano Jugador 2"));
        this.timerPlayer2 = new Timer("timerPlayer2",0,2, () => this.endGame("Gano Jugador 1"));
        
        this.imagePlayer1 = imgPlayer1;
        this.imagePlayer2 = imgPlayer2;
        this.winnerText = '';
        this.winnerTextAlpha = 0;
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

    setPlayer1Image(player1){
        this.imagePlayer1 = player1;
        this.initializePieces();
    }

    setPlayer2Image(player2){
        this.imagePlayer2 = player2;
        this.initializePieces();
    }

    initGame() {
        this.board = new Board(this.canvas.width, this.canvas.height, this.rows, this.cols);
        this.currentPlayer = 1;
        this.gameOver = false;
        this.selectedPiece = null;

        // Crear piezas para ambos jugadores
        this.initializePieces();
    }

    initializePieces() {
        const pieceRadius = Math.min(this.board.cellWidth, this.board.cellHeight) * 0.4;
        const piecesPerPlayer = Math.ceil((this.rows * this.cols) / 2);

        this.pieces = {
            1: [],
            2: []
        };

        // Crear piezas para jugador 1 (lado izquierdo)
        for (let i = 0; i < piecesPerPlayer; i++) {
            this.pieces[1].push(new Piece(
                1,
                pieceRadius * 2,
                50 + i * (pieceRadius * 0.2),
                pieceRadius,
                'media/images/4inLine/' + this.imagePlayer1
            ));
        }

        // Crear piezas para jugador 2 (lado derecho)
        for (let i = 0; i < piecesPerPlayer; i++) {
            this.pieces[2].push(new Piece(
                2,
                this.canvas.width - pieceRadius * 2,
                50 + i * (pieceRadius * 0.2),
                pieceRadius,
                'media/images/4inLine/' + this.imagePlayer2
            ));
        }
    }

    handleClick(e) {
        if (this.gameOver) return;

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Solo permitir seleccionar una pieza si no estamos en medio de un drag
        if (!this.isDragging) {
            const availablePieces = this.pieces[this.currentPlayer];
            for (let piece of availablePieces) {
                if (piece.isPointInside(mouseX, mouseY)) {
                    this.selectedPiece = piece;
                    this.isDragging = true;
                    piece.startDragging(mouseX, mouseY);
                    break;
                }
            }
        }
    }

    handleMove(e) {
        if (!this.selectedPiece || !this.isDragging || this.gameOver) return;

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Solo mover la pieza si estamos en modo dragging
        this.selectedPiece.drag(mouseX, mouseY);

        if (mouseY <= this.dropZoneHeight) {
            this.highlightedColumn = this.board.getColumnFromX(mouseX);
        } else {
            this.highlightedColumn = -1;
        }
    }

    handleRelease(e) {
        if (!this.selectedPiece || !this.isDragging || this.gameOver) return;

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        this.isDragging = false;

        // Solo procesar el drop si estamos en la zona válida
        if (mouseY <= this.dropZoneHeight) {
            const column = this.board.getColumnFromX(mouseX);

            if (column >= 0 && column < this.board.cols) {
                const row = this.board.getLowestEmptyRow(column);

                if (row >= 0) {
                    const targetX = this.board.offsetX + (column * this.board.cellWidth) + (this.board.cellWidth / 2);
                    const targetY = this.board.offsetY + (row * this.board.cellHeight) + (this.board.cellHeight / 2);

                    this.selectedPiece.x = targetX;
                    this.selectedPiece.originalX = targetX;
                    this.selectedPiece.isDropping = true;

                    const dropInterval = setInterval(() => {
                        if (this.selectedPiece && this.selectedPiece.drop(targetY)) {
                            clearInterval(dropInterval);

                            this.selectedPiece.x = targetX;
                            this.selectedPiece.y = targetY;
                            this.board.grid[row][column] = this.selectedPiece;

                            const index = this.pieces[this.currentPlayer].indexOf(this.selectedPiece);
                            if (index > -1) {
                                this.pieces[this.currentPlayer].splice(index, 1);
                            }

                            if (this.board.checkWin(row, column, this.winCount)) {
                                this.endGame(`¡Jugador ${this.currentPlayer} gana!`);
                            } else {
                                this.changeTimer();
                                this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                            }

                            this.selectedPiece = null;
                        }
                    }, 16);

                    this.highlightedColumn = -1;
                    return;
                }
            }
        }

        // Si la pieza no se pudo colocar, asi que la devolvemos a su posición original
        this.selectedPiece.reset();
        this.selectedPiece.stopDragging();
        this.selectedPiece = null;
        this.highlightedColumn = -1;
    }

    endGame(message) {
        this.gameOver = true;
        this.stopTimer();
        this.winnerText = message;
        this.winnerTextAlpha = 0;
    }

    resetGame(){
        this.initGame();
        this.resetTimer();
        this.winnerText = '';
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar tablero
        this.board.draw(this.ctx);

        // Dibujar la zona de drop
        this.drawDropZone();

        // Dibujar piezas disponibles
        for (let player in this.pieces) {
            this.pieces[player].forEach(piece => piece.draw(this.ctx));
        }

        if (this.winnerText) {
            this.drawWinnerText();
        }

        // Solicitar siguiente frame
        requestAnimationFrame(() => this.draw());
    }

    drawDropZone() {
        this.ctx.save();

        // Dibujar el área de drop
        this.ctx.fillStyle = 'rgba(200, 200, 200, 0.2)';
        this.ctx.fillRect(this.board.offsetX, 0, this.board.width, this.dropZoneHeight);

        // Dibujar el highlight de la columna
        if (this.highlightedColumn >= 0 && this.highlightedColumn < this.board.cols) {
            const columnX = this.board.offsetX + (this.highlightedColumn * this.board.cellWidth);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.fillRect(columnX, 0, this.board.cellWidth, this.dropZoneHeight);

            // Dibujar la flecha destacada
            if (this.board.arrows[this.highlightedColumn]) {
                const arrow = this.board.arrows[this.highlightedColumn];
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                this.ctx.beginPath();
                this.ctx.moveTo(arrow.x - 15, arrow.y);
                this.ctx.lineTo(arrow.x + 15, arrow.y);
                this.ctx.lineTo(arrow.x, arrow.y + 20);
                this.ctx.closePath();
                this.ctx.fill();
            }
        }

        this.ctx.restore();
    }

    drawWinnerText() {
        this.ctx.save();
        this.ctx.font = 'bold 48px Arial';
        this.ctx.fillStyle = `rgba(255, 215, 0, ${this.winnerTextAlpha})`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.winnerText, this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.restore();

        if (this.winnerTextAlpha < 1) {
            this.winnerTextAlpha += 0.01;
        }
    }

    stopTimer(){
        this.timerPlayer1.stop();
        this.timerPlayer2.stop();
    }

    starTimer(){
        if(this.currentPlayer === 1) {
            this.timerPlayer1.start();
        } else {
            this.timerPlayer2.start();
            console.log("timer 2");
        }
    }

    changeTimer(){
        if(this.currentPlayer === 1){
            this.timerPlayer1.stop();
            this.timerPlayer2.start();
        }else{
            this.timerPlayer2.stop();
            this.timerPlayer1.start();
        }
    }

    resetTimer(){
        this.timerPlayer1.reset(2,0);
        this.timerPlayer2.reset(2,0);
    }
}
