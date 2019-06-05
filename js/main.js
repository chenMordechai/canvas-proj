'use strict'

function init() {
    canvas = document.querySelector('#my-canvas');
    ctx = canvas.getContext('2d')

    
    canvas.width = window.innerWidth - 50
    canvas.height = window.innerHeight - 100
}


let canvas
let ctx

let currElement = 'triangle'

function changeEl(elName) {
    console.log(elName)
    currElement = elName
}

function draw(ev) {
    console.log(ev)
    ctx.save()
    // const offsetX = ev.offsetX
    // const offsetY = ev.offsetY
    const {offsetX, offsetY} = ev
    switch (currElement) {
        case 'triangle':
            drawTriangle()
            break;
        case 'rect':
            drawRect(offsetX, offsetY)
            break;
        case 'cir':
            drawArc('test',offsetX, offsetY)
            break;
    }
    ctx.restore()
}

function clearCanvas() {
    // ctx.fillStyle = 'yellow'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.clearRect(50, 50, 100, 100)
}

function drawArc() {
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 1 * Math.PI);
    ctx.stroke();
}

function drawRect(x,y) {
    ctx.rect(x,y, 150, 150)
    ctx.fillStyle = 'orange'
    ctx.fillRect(x,y, 150, 150)
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