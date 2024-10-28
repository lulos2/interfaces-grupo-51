class Piece {
    constructor(player, x, y, radius, image) {
        this.player = player;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.image = new Image();
        this.image.src = image;
        this.isDragging = false;
        this.originalX = x;
        this.originalY = y;
        this.velocityY = 0;
        this.gravity = 0.8;
        this.isDropping = false;
        this.isWinningPiece = false;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.clip();
        if (this.isWinningPiece) {
            ctx.globalAlpha = Math.abs(Math.sin(Date.now() / 200));
        }
        ctx.drawImage(this.image,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2
        );
        ctx.restore();
    }

    isPointInside(px, py) {
        const distance = Math.sqrt(
            Math.pow(this.x - px, 2) +
            Math.pow(this.y - py, 2)
        );
        return distance <= this.radius;
    }

    startDragging(mouseX, mouseY) {
        this.isDragging = true;
        this.dragOffsetX = this.x - mouseX;
        this.dragOffsetY = this.y - mouseY;
    }

    drag(mouseX, mouseY) {
        if (this.isDragging && !this.isDropping) {
            this.x = mouseX + this.dragOffsetX;
            this.y = mouseY + this.dragOffsetY;
        }
    }

    stopDragging() {
        this.isDragging = false;
    }

    reset() {
        this.x = this.originalX;
        this.y = this.originalY;
        this.velocityY = 0;
        this.isDropping = false;
    }

    drop(targetY) {
        if (!this.isDropping) return false;

        // Ajustar la velocidad y gravedad para una caída más suave
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Verificar si hemos llegado al objetivo
        if (this.y >= targetY) {
            this.y = targetY; // Asegurar la posición exacta
            this.isDropping = false;
            this.velocityY = 0;
            return true;
        }
        return false;
    }

    setWinner() {
        this.isWinningPiece = true;
    }
}