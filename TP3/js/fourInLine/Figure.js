
class Figure{
    constructor(posX,posY,fill,context){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.seleccionado = false;
        this.proximidad = null;
        this.seleccionadoStyle = "rgb(0,0,0)";
    }

    getContext(){
        return this.context;
    }

    setFill(fill){
        this.fill = fill;
    }

    setSeleccionado(selec){
        this.seleccionado = selec;
    }

    getSeleccionado(){
        return this.seleccionado;
    }

    seleccionadoStyle(style){
        this.seleccionadoStyle = style;
    }

    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }

    getPosition(){
        return {
            x : this.getPosX(),
            y : this.getPosY(),
        };
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getFill(){
        return this.fill;
    }

    draw(){
        this.context.fillStyle = this.fill;
    }

    setNull(){
        this.posX = 0;
        this.posY = 0;
        this.fill = "none";
    }

    isPointInside(x,y){}
}