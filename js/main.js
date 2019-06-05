'use strict'

let canvas
let ctx
let currElement = 'triangle'
var mouseDown = 0;
var lastX;
var lastY;

function init() {

    canvas = document.querySelector('#my-canvas');
    ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth - 50
    canvas.height = window.innerHeight - 100

    canvas.addEventListener('mousedown', onMouseDown, false)
    canvas.addEventListener('mousemove', onMouseMove, false)
    canvas.addEventListener('mouseup', onMouseUp, false)
}



function changeEl(elName) {
    console.log(elName)
    currElement = elName
}

function draw(ev) {
    console.log(ev)
    ctx.save()
    // const offsetX = ev.offsetX
    // const offsetY = ev.offsetY
    const {
        offsetX,
        offsetY
    } = ev
    switch (currElement) {
        case 'triangle':
            drawTriangle()
            break;
        case 'rect':
            drawRect(offsetX, offsetY)
            break;
        case 'text':
            drawText('test', offsetX, offsetY)
            break;
    }
    ctx.restore()
}

function clearCanvas() {
    // ctx.fillStyle = 'yellow'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.clearRect(50, 50, 100, 100)
}

// function clearCanvas(canvas,ctx) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
// }

function drawArc() {
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 1 * Math.PI);
    ctx.stroke();
}

function drawRect(x, y) {
    ctx.rect(x, y, 150, 150)
    ctx.fillStyle = 'orange'
    ctx.fillRect(x, y, 150, 150)
    ctx.stroke()
    ctx.fill()
}



function drawTriangle() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 150);
    ctx.lineTo(100, 100);
    ctx.closePath()

    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue'
    ctx.fillStyle = '#ff0000'

    ctx.stroke();
    ctx.fill()

}


function draw(ctx, x, y) {

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
}


function onMouseDown(e) {
    var xy = getMousePos(e);
    lastX = xy.mouseX;
    lastY = xy.mouseY;
    mouseDown = 1;
}

function onMouseUp() {
    mouseDown = 0
}

function onMouseMove(e) {
    if (mouseDown == 1) {
        var xy = getMousePos(e);
        draw(ctx, xy.mouseX, xy.mouseY);
        lastX = xy.mouseX, lastY = xy.mouseY;
    }
}

function getMousePos(e) {
    var o = {};
    if (!e)
        var e = event
    if (e.offsetX) {
        o.mouseX = e.offsetX
        o.mouseY = e.offsetY
    } else if (e.layerX) {
        o.mouseX = e.layerX
        o.mouseY = e.layerY
    }
    return o;
}