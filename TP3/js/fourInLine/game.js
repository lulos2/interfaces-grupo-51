

let c = document.getElementById("gameCanvas");
let ctx = c.getContext("2d");

let finishGame = false;//marcador de fin de juego
let lostPos = null;
let lastClickedFigure = null;
let isMouseDown = false;
let canvasWidth = c.width;
let canvasHeight = c.height;
let imgBackground= new Image();
imgBackground.src = "./media/images/connect-4/4-en-linea-1.webp";

