// original script by Achraf Boujjou hosted on codepen
// https://codepen.io/AchrafBoujjou/pen/RxjWXB

//------------------------------------------------------------------global variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var matrix = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!£$%^&*()_-+=/*|/?><#~@:;[]{}¬'; //string
var font_size = 15;

//----------------------------------------fullscreen canvas
canvas.height = window.innerHeight; 
canvas.width = window.innerWidth;

//-----------convert string into array of single characters
matrix = matrix.split('');

//----------------------------------------number of columns
var columns = canvas.width/font_size;

//------------------------------------------array for drops
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
    drops[x] = 1; 

//---------------------------------------------------------------drawing characters
function draw() {

    "use strict";

    //--------------------------------background for canvas
    ctx.fillStyle = '#0000000a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //-------------------------------------------font color
    ctx.fillStyle = '#510264';

    //------------------------------------------font family
    ctx.font = font_size + 'Syne Mono';
    
    //-------------------looping and randomizing characters
    for(var i = 0; i < drops.length; i++) {
        var text = matrix[Math.floor(Math.random()*matrix.length)];
        ctx.fillText(text, i*font_size, drops[i]*font_size);
        if(drops[i]*font_size > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

//----------------------------------------------resizes canvas on window size change
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw();
});

//-----------------------------------------------------calls function and sets speed
setInterval(draw, 35);
