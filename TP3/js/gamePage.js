/*

let ctx =  document.getElementById('gameCanvas').getContext('2d');
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(200, 200, 50, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();
*/

let circle = new Circle(200,200,'red',50,ctx);
circle.draw();

let rect = new Rect(100,100,'blue',ctx,50,50);
rect.draw();

for (let i = 0; i < 100; i++) {
    let circle = new Circle(Math.random()*1000,Math.random()*615,randomColor(),Math.random()*50,ctx);
    circle.draw();
    let rect = new Rect(Math.random()*1000,Math.random()*615,randomColor(),ctx,Math.random()*50,Math.random()*50);
    rect.draw();
}

function randomColor(){
    return 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
}