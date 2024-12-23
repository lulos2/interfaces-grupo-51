class Board {
    constructor(width, height, rows, cols) {
        // Configuración de las dimensiones y el offset del tablero en el canvas
        this.totalWidth = width;
        this.totalHeight = height;

        this.width = Math.floor(width * 0.7);      // 70% del ancho del canvas para el tablero
        this.offsetX = Math.floor((width - this.width) / 2); // Centrado horizontal

        this.height = height - 90;                 // Ajuste de la altura para dejar espacio superior
        this.offsetY = 90;                         // Offset vertical para la zona de drop

        this.rows = rows;                          // Filas del tablero
        this.cols = cols;                          // Columnas del tablero

        // Calcula el tamaño de cada celda en función de las filas y columnas
        this.cellWidth = this.width / cols;
        this.cellHeight = this.height / rows;

        // Inicializa la grilla del tablero con valores nulos (celdas vacías)
        this.grid = Array(rows).fill().map(() => Array(cols).fill(null));

        // Configura la imagen de fondo
        this.background = new Image();
        this.background.src = 'media/images/4inLine/wordCup.jpg';

        this.boardColor = 'rgba(25, 25, 25, 0.8)'; // Color de fondo del tablero
        this.cellColor = 'rgba(255, 255, 255, 0.1)'; // Color de las celdas

    }

    // Dibuja el tablero y sus componentes en el contexto del canvas
    draw(ctx) {
        ctx.save();

        // Dibuja el fondo del tablero con opacidad ajustada
        ctx.globalAlpha = 0.3;
        ctx.drawImage(this.background, 0, 0, this.totalWidth, this.totalHeight);
        ctx.restore();

        // Dibuja el rectángulo del tablero
        ctx.fillStyle = this.boardColor;
        ctx.fillRect(this.offsetX, this.offsetY, this.width, this.height);

        // Dibuja la grilla del tablero
        this.drawGrid(ctx);
    }

    // Dibuja las celdas de la grilla y las piezas dentro del tablero
    drawGrid(ctx) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = this.offsetX + col * this.cellWidth;
                const y = this.offsetY + row * this.cellHeight;

                // Dibuja una celda vacía
                ctx.beginPath();
                ctx.fillStyle = this.cellColor;
                const radius = Math.min(this.cellWidth, this.cellHeight) * 0.4;
                ctx.arc(
                    x + this.cellWidth / 2,
                    y + this.cellHeight / 2,
                    radius,
                    0,
                    Math.PI * 2
                );
                ctx.fill();

                // Dibuja la pieza si está presente en la celda
                if (this.grid[row][col]) {
                    this.grid[row][col].draw(ctx, x, y, this.cellWidth, this.cellHeight);
                }
            }
        }
    }

    // Obtiene el índice de columna a partir de una coordenada X
    getColumnFromX(x) {
        if (x < this.offsetX || x > this.offsetX + this.width) return -1;
        const relativeX = x - this.offsetX;
        return Math.floor(relativeX / this.cellWidth);
    }

    // Devuelve la fila vacía más baja en una columna dada, o -1 si está llena
    getLowestEmptyRow(col) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.grid[row][col]) {
                return row;
            }
        }
        return -1;
    }

    // Verifica si hay una combinación ganadora desde la posición dada
    checkWin(row, col, winCount) {
        const directions = [
            [0, 1],  // horizontal
            [1, 0],  // vertical
            [1, 1],  // diagonal derecha
            [1, -1]  // diagonal izquierda
        ];

        const player = this.grid[row][col].player;

        for (let [dy, dx] of directions) {
            let count = 1;
            let winCombination = [[row, col]];  // Almacena las posiciones ganadoras

            // Revisa en una dirección para encontrar piezas consecutivas
            for (let i = 1; i < winCount; i++) {
                const newRow = row + dy * i;
                const newCol = col + dx * i;

                if (!this.isValidPosition(newRow, newCol)) break;
                if (!this.grid[newRow][newCol] || this.grid[newRow][newCol].player !== player) break;

                winCombination.push([newRow, newCol]);
                count++;
            }

            // Revisa en la dirección opuesta
            for (let i = 1; i < winCount; i++) {
                const newRow = row - dy * i;
                const newCol = col - dx * i;

                if (!this.isValidPosition(newRow, newCol)) break;
                if (!this.grid[newRow][newCol] || this.grid[newRow][newCol].player !== player) break;

                winCombination.push([newRow, newCol]);
                count++;
            }

            // Si hay suficientes piezas consecutivas, marca la victoria
            if (count >= winCount) {
                winCombination.forEach(([row, col]) => {
                    this.grid[row][col].setWinner();
                });
                return true;
            }
        }
        return false;
    }

    // Verifica si una posición está dentro de los límites del tablero
    isValidPosition(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    // Limpia la grilla, eliminando todas las piezas
    clear() {
        this.grid = Array(this.rows).fill().map(() => Array(this.cols).fill(null));
    }
}
