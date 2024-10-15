
class Circle extends Figure {
    constructor(posX,posY,fill,radius,context){
        super(posX,posY,fill,context);
        this.radius = radius;
    }

    draw(){
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0 , 2*Math.PI);
        this.context.fill();
        if(this.seleccionado === true){
            this.context.strokeStyle = this.seleccionadoStyle;
            this.context.lineWidth = 5;
            this.context.stroke();
        }
        this.context.closePath();
    }

    getRadius(){
        return this.radius;
    }

    setRadius(newRadius){
        this.radius = newRadius;
    }

    isPointInside(x,y){
        let disX = this.posX - x;
        let disY = this.posY - y;
        this.proximidad = Math.sqrt(disX * disX + disY * disY);
        return this.proximidad < this.radius;
    }

    setNull(){
        super.setNull();
        this.radius=0;
    }

}