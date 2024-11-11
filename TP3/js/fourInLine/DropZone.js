
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