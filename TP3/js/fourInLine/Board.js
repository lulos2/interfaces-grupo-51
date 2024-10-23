class Board {
    constructor(width, height, rows, cols) {
        this.totalWidth = width;
        this.totalHeight = height;

        this.width = Math.floor(width * 0.7);
        this.offsetX = Math.floor((width - this.width) / 2);

        this.height = height - 90;
        this.offsetY = 90;

        this.rows = rows;
        this.cols = cols;

        this.cellWidth = this.width / cols;
        this.cellHeight = this.height / rows;

        this.grid = Array(rows).fill().map(() => Array(cols).fill(null));
        this.background = new Image();
        this.background.src = 'media/icons/MPKlogo2.png';

        this.boardColor = 'rgba(37, 37, 37, 0.5)';
        this.cellColor = 'rgba(37, 37, 37, 0.5)';

        this.arrows = Array(cols).fill().map((_, i) => ({
            x: this.offsetX + (i * this.cellWidth) + (this.cellWidth / 2),
            y: 30,
            alpha: 1,
            direction: 1
        }));
    }

    draw(ctx) {
        // Dibujar fondo
        ctx.drawImage(this.background, 0, 0, this.totalWidth, this.totalHeight);

        // Dibujar el tablero
        ctx.fillStyle = this.boardColor;
        ctx.fillRect(this.offsetX, this.offsetY, this.width, this.height);

        // Dibujar flechas animadas
        this.drawArrows(ctx);

        // Dibujar grid
        this.drawGrid(ctx);
    }

    drawArrows(ctx) {
        ctx.save();
        this.arrows.forEach(arrow => {
            arrow.alpha = 0.7;
            ctx.fillStyle = `rgba(255, 255, 255, ${arrow.alpha})`;
            ctx.beginPath();
            ctx.moveTo(arrow.x - 15, arrow.y);
            ctx.lineTo(arrow.x + 15, arrow.y);
            ctx.lineTo(arrow.x, arrow.y + 20);
            ctx.closePath();
            ctx.fill();
        });
        ctx.restore();
    }

    drawGrid(ctx) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = this.offsetX + col * this.cellWidth;
                const y = this.offsetY + row * this.cellHeight;

                // Dibujar celda vacía
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

                // Si hay una ficha en esta posición, dibujarla
                if (this.grid[row][col]) {
                    this.grid[row][col].draw(ctx, x, y, this.cellWidth, this.cellHeight);
                }
            }
        }
    }

    getColumnFromX(x) {
        // Mejorar la detección de columna considerando el offset
        if (x < this.offsetX || x > this.offsetX + this.width) return -1;
        const relativeX = x - this.offsetX;
        return Math.floor(relativeX / this.cellWidth);
    }

    getLowestEmptyRow(col) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.grid[row][col]) {
                return row;
            }
        }
        return -1;
    }

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

            // Revisar en una dirección
            for (let i = 1; i < winCount; i++) {
                const newRow = row + dy * i;
                const newCol = col + dx * i;

                if (!this.isValidPosition(newRow, newCol)) break;
                if (!this.grid[newRow][newCol]) break;
                if (this.grid[newRow][newCol].player !== player) break;

                count++;
            }

            // Revisar en dirección opuesta
            for (let i = 1; i < winCount; i++) {
                const newRow = row - dy * i;
                const newCol = col - dx * i;

                if (!this.isValidPosition(newRow, newCol)) break;
                if (!this.grid[newRow][newCol]) break;
                if (this.grid[newRow][newCol].player !== player) break;

                count++;
            }

            if (count >= winCount) return true;
        }
        return false;
    }

    isValidPosition(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    clear() {
        this.grid = Array(this.rows).fill().map(() => Array(this.cols).fill(null));
    }
}
