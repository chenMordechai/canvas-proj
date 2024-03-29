'use strict'

let canvas
let ctx
let gCurrElement = 'triangle'
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
function uploadImg(elForm, ev) {
    ev.preventDefault();

    document.getElementById('imgData').value = canvas.toDataURL("image/jpeg");
   
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        console.log('uploadedImgUrl', uploadedImgUrl);

        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="w-inline-block social-share-btn fb" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);

    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        return response.text()
    })
    .then(onSuccess)
    .catch(function (error) {
        // console.error(error)
    })
}



(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));




function downloadImg(elLink) {
    console.log(elLink)
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}








function changeEl(elName) {
    // console.log(elName)
    gCurrElement = elName
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}



// /////////////////////////////////////////////////////
function draw(ctx, x, y) {
    var elColor = document.querySelector('.color').value
    ctx.save()
    switch (gCurrElement) {
        case 'tri':
            drawTriangle(elColor, x, y)
            break;
        case 'rec':
            drawRect(elColor, x, y)
            break;
        case 'cir':
            drawArc(elColor, x, y)
            break;
        case 'li':
            drawLine(elColor, ctx, x, y)
            break;
    }
    ctx.restore()
 
}

function drawLine(elColor, ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = elColor
    ctx.closePath();
    ctx.stroke();
}

function drawArc(color, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.fillStyle = color
    ctx.stroke();
    ctx.fill()
}

function drawRect(color, x, y) {
    ctx.beginPath();
    ctx.rect(x, y, 150, 150)
    ctx.fillStyle = color
    ctx.fillRect(x, y, 150, 150)
    ctx.stroke()
    ctx.fill()
}

function drawTriangle(color, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 300, y + 150);
    ctx.lineTo(x + 100, y + 100);
    ctx.closePath()
    ctx.lineWidth = 5;
    // ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.stroke();
    ctx.fill()

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