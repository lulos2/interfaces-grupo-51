class Game {

    constructor(canvas, boardSize = 4, imgPlayer1, imgPlayer2 ) {
        // Inicializa el juego con el canvas, tamaño del tablero y las imágenes de los jugadores
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isDragging = false;                  // Estado de arrastre
        this.highlightedColumn = -1;              // Columna resaltada en la zona de drop
        this.dropZoneHeight = 90;                 // Altura de la zona de drop

        // Timers para cada jugador
        this.timerPlayer1 = new Timer("timerPlayer1", 0, 2, () => this.endGame("Gano Jugador 2"));
        this.timerPlayer2 = new Timer("timerPlayer2", 0, 2, () => this.endGame("Gano Jugador 1"));

        // Configuración de las imágenes de las piezas de cada jugador
        this.imagePlayer1 = imgPlayer1;
        this.imagePlayer2 = imgPlayer2;
        this.winnerText = '';
        this.winnerTextAlpha = 0;                 // Transparencia del texto ganador

        this.setBoardSize(boardSize);             // Configura el tamaño del tablero
        this.initGame();                          // Inicia el juego
    }

    // Configura el tamaño del tablero y reinicia el juego si es necesario
    setBoardSize(size) {
        this.winCount = parseInt(size);
        this.rows = this.winCount + 2;
        this.cols = this.winCount + 3;

        if (this.board) {
            this.initGame();
        }
    }

    // Cambia la imagen del jugador 1 y reinicia las piezas
    setPlayer1Image(player1) {
        this.imagePlayer1 = player1;
        this.initializePieces();
    }

    // Cambia la imagen del jugador 2 y reinicia las piezas
    setPlayer2Image(player2) {
        this.imagePlayer2 = player2;
        this.initializePieces();
    }

    // Inicializa el tablero, piezas y el jugador actual
    initGame() {
        this.board = new Board(this.canvas.width, this.canvas.height, this.rows, this.cols);
        this.dropZone = new DropZone(this.board.offsetX, this.board.cellWidth, this.board.cols);
        this.currentPlayer = 1;
        this.gameOver = false;
        this.selectedPiece = null;

        this.initializePieces();  // Crea las piezas para ambos jugadores
    }

    // Crea las piezas de cada jugador y las posiciona en los laterales del tablero
    initializePieces() {
        const pieceRadius = Math.min(this.board.cellWidth, this.board.cellHeight) * 0.4;
        const piecesPerPlayer = Math.ceil((this.rows * this.cols) / 2);

        this.pieces = { 1: [], 2: [] };

        // Crea las piezas del jugador 1 en el lado izquierdo
        for (let i = 0; i < piecesPerPlayer; i++) {
            this.pieces[1].push(new Piece(
                1,
                pieceRadius * 2,
                50 + i * (pieceRadius * 0.2),
                pieceRadius,
                'media/images/4inLine/' + this.imagePlayer1
            ));
        }

        // Crea las piezas del jugador 2 en el lado derecho
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

    // Maneja el evento de clic para seleccionar una pieza
    handleClick(e) {
        if (this.gameOver) return;

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Si no se está arrastrando, permite seleccionar una pieza
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

    // Maneja el movimiento de la pieza mientras se arrastra
    handleMove(e) {
        if (!this.selectedPiece || !this.isDragging || this.gameOver) return;

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        this.selectedPiece.drag(mouseX, mouseY);

        // Resalta la columna de drop si está en la zona de drop
        if (this.dropZone.isInsideDropZone(mouseX, mouseY)) {
            this.highlightedColumn = this.dropZone.getColumnFromX(mouseX);
        } else {
            this.highlightedColumn = -1;
        }
    }

    // Maneja el evento de soltar para colocar la pieza en el tablero
    handleRelease(e) {
        if (!this.selectedPiece || !this.isDragging || this.gameOver) return;

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        this.isDragging = false;

        // Coloca la pieza en la columna correspondiente si está en la zona de drop
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

                            // Actualiza la posición y el tablero
                            this.selectedPiece.x = targetX;
                            this.selectedPiece.y = targetY;
                            this.board.grid[row][column] = this.selectedPiece;

                            // Remueve la pieza de las piezas disponibles del jugador
                            const index = this.pieces[this.currentPlayer].indexOf(this.selectedPiece);
                            if (index > -1) {
                                this.pieces[this.currentPlayer].splice(index, 1);
                            }

                            // Verifica si hay un ganador
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

        // Si la pieza no se coloca, vuelve a su posición original
        this.selectedPiece.reset();
        this.selectedPiece.stopDragging();
        this.selectedPiece = null;
        this.highlightedColumn = -1;
    }

    // Termina el juego y muestra el mensaje de victoria
    endGame(message) {
        this.gameOver = true;
        this.stopTimer();
        this.winnerText = message;
        this.winnerTextAlpha = 0;
    }

    // Reinicia el juego y el temporizador
    resetGame() {
        this.initGame();
        this.resetTimer();
        this.winnerText = '';
    }

    // Dibuja el juego en cada frame
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibuja el tablero, la zona de drop, las piezas y el mensaje de ganador si aplica
        this.board.draw(this.ctx);
        this.drawDropZone();
        for (let player in this.pieces) {
            this.pieces[player].forEach(piece => piece.draw(this.ctx));
        }
        if (this.winnerText) this.drawWinnerText();

        // Solicita el próximo frame
        requestAnimationFrame(() => this.draw());
    }

    // Dibuja la zona de drop y la columna resaltada
    drawDropZone() {
        this.dropZone.hoveredColumn = this.highlightedColumn;
        this.dropZone.update();
        this.dropZone.draw(this.ctx, (column) => this.board.getLowestEmptyRow(column));
    }

    // Dibuja el texto ganador
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

    // Control de los temporizadores de los jugadores
    stopTimer() {
        this.timerPlayer1.stop();
        this.timerPlayer2.stop();
    }

    startTimer() {
        if (this.currentPlayer === 1) {
            this.timerPlayer1.start();
        } else {
            this.timerPlayer2.start();
        }
    }

    changeTimer() {
        if (this.currentPlayer === 1) {
            this.timerPlayer1.stop();
            this.timerPlayer2.start();
        } else {
            this.timerPlayer2.stop();
            this.timerPlayer1.start();
        }
    }

    resetTimer() {
        this.timerPlayer1.reset(2, 0);
        this.timerPlayer2.reset(2, 0);
    }
}

class DropZone {
    constructor(offsetX, cellWidth, cols) {
        this.offsetX = offsetX;
        this.cellWidth = cellWidth;
        this.balls = this.initializeBalls(cols);
        this.hoveredColumn = -1;
        this.rotation = 0;
        this.animationSpeed = 0.04;
    }

    // Inicializa las pelotas para cada columna
    initializeBalls(cols) {
        return Array(cols).fill().map((_, i) => ({
            x: this.offsetX + (i * this.cellWidth) + (this.cellWidth / 2),
            y: 45,
            alpha: 0.7,
            size: 30,
            rotation: 0,
            scale: 1
        }));
    }

    // Actualiza el estado de las pelotas (animaciones)
    update() {
        this.balls.forEach((ball, index) => {
            if (index === this.hoveredColumn) {
                // Aumenta la escala cuando está en hover
                ball.scale = Math.min(ball.scale + 0.05, 1.4);
                ball.rotation += this.animationSpeed;
            } else {
                // Regresa a la escala normal
                ball.scale = 1;
                ball.rotation = 0;
            }
        });
    }

    // Metoddo principal para dibujar la zona de drop
    draw(ctx, getLowestEmptyRow) {
        ctx.save();
        this.balls.forEach((ball, index) => {
            const columnIsFull = getLowestEmptyRow(index) === -1;
            const alpha = columnIsFull ? 0.3 : (index === this.hoveredColumn ? 0.9 : 0.7);
            this.drawBall(ctx, ball, alpha);
        });
        ctx.restore();
    }

    // Dibuja una pelota individual
    drawBall(ctx, ball, alpha) {
        ctx.save();

        // Aplica transformaciones (rotación y escala desde el centro de la pelota)
        ctx.translate(ball.x, ball.y);
        ctx.rotate(ball.rotation);
        ctx.scale(ball.scale, ball.scale);
        ctx.translate(-ball.x, -ball.y);

        // Círculo base blanco
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Hexágono central y líneas decorativas
        this.drawHexagon(ctx, ball, alpha);
        this.drawDecorativeLines(ctx, ball, alpha);

        ctx.restore();
    }

    // Dibuja el hexágono central de la pelota
    drawHexagon(ctx, ball, alpha) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI / 3) - Math.PI / 6;
            const x = ball.x + ball.size * 0.5 * Math.cos(angle);
            const y = ball.y + ball.size * 0.5 * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fill();
    }

    // Dibuja las líneas decorativas de la pelota
    drawDecorativeLines(ctx, ball, alpha) {
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI / 3) - Math.PI / 6;
            const x1 = ball.x + ball.size * 0.5 * Math.cos(angle);
            const y1 = ball.y + ball.size * 0.5 * Math.sin(angle);
            const x2 = ball.x + ball.size * Math.cos(angle);
            const y2 = ball.y + ball.size * Math.sin(angle);

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    // Obtiene la columna basada en la posición X del mouse
    getColumnFromX(x) {
        if (x < this.offsetX) return -1;
        return Math.floor((x - this.offsetX) / this.cellWidth);
    }

    // Verifica si una posición está dentro de la zona de drop
    isInsideDropZone(x, y) {
        return y <= 90 && // altura de la zona de drop
            x >= this.offsetX &&
            x <= this.offsetX + (this.balls.length * this.cellWidth);
    }
}