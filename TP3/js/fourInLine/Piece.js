class Piece {
    constructor(player, x, y, radius, image) {
        // Asigna el jugador propietario y la posición inicial de la pieza
        this.player = player;
        this.x = x;
        this.y = y;
        this.radius = radius;

        // Crea una nueva imagen para la pieza y establece su fuente
        this.image = new Image();
        this.image.src = image;

        // Variables para manejar el estado de arrastre, gravedad y caída
        this.isDragging = false;          // Indica si la pieza está siendo arrastrada
        this.originalX = x;               // Guarda la posición original en X
        this.originalY = y;               // Guarda la posición original en Y
        this.velocityY = 0;               // Velocidad vertical usada en la caída
        this.gravity = 0.8;               // Valor de gravedad para la caída
        this.isDropping = false;          // Indica si la pieza está en caída libre
        this.isWinningPiece = false;      // Indica si la pieza es parte de la combinación ganadora
        this.reboundEffectFactor = 0.4;   // Factor de rebote al caer
        this.minVelocity = 1;             // Velocidad mínima antes de detener el rebote
    }

    // Dibuja la pieza en el contexto 2D del canvas
    draw(ctx) {
        ctx.save();
        ctx.beginPath();

        // Dibuja un círculo de recorte para contener la imagen de la pieza
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.clip();

        // Efecto de parpadeo para una pieza ganadora
        if (this.isWinningPiece) {
            ctx.globalAlpha = Math.abs(Math.sin(Date.now() / 200));
        }

        // Dibuja la imagen de la pieza dentro del área del círculo
        ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);

        ctx.restore();
    }

    // Verifica si un punto (px, py) está dentro del área de la pieza
    isPointInside(px, py) {
        const distance = Math.sqrt(Math.pow(this.x - px, 2) + Math.pow(this.y - py, 2));
        return distance <= this.radius;
    }

    // Inicia el arrastre de la pieza y guarda el offset del ratón
    startDragging(mouseX, mouseY) {
        this.isDragging = true;
        this.dragOffsetX = this.x - mouseX;
        this.dragOffsetY = this.y - mouseY;
    }

    // Actualiza la posición de la pieza mientras se arrastra
    drag(mouseX, mouseY) {
        if (this.isDragging && !this.isDropping) {
            this.x = mouseX + this.dragOffsetX;
            this.y = mouseY + this.dragOffsetY;
        }
    }

    // Detiene el arrastre de la pieza
    stopDragging() {
        this.isDragging = false;
    }

    // Reinicia la pieza a su posición original
    reset() {
        this.x = this.originalX;
        this.y = this.originalY;
        this.velocityY = 0;
        this.isDropping = false;
    }

    // Lógica para dejar caer la pieza hasta la posición objetivo en Y
    drop(targetY) {
        if (!this.isDropping) return false;

        // Incrementa la velocidad vertical con la gravedad
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Si la pieza llega a la posición objetivo, aplica rebote
        if (this.y >= targetY) {
            this.y = targetY; // Fija la posición exacta

            if (Math.abs(this.velocityY) > this.minVelocity) {
                // Invierte la velocidad para simular un rebote
                this.velocityY = -this.velocityY * this.reboundEffectFactor;
            } else {
                // Si la velocidad es baja, detiene el rebote
                this.isDropping = false;
                this.velocityY = 0;
                return true;
            }
        }
        return false;
    }

    // Marca la pieza como ganadora, lo que activa el efecto visual
    setWinner() {
        this.isWinningPiece = true;
    }
}