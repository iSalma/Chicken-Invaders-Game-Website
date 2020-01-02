// var boxLeft = 0;
var boxBottom = 0;
var bulletBottom = 0;
var box = document.getElementById("box");
var bullet = document.getElementById("bullet");


let chickenArray = [
    { left: 0, top: 5 },
    { left: 10, top: 5 },
    { left: 20, top: 5 },
    { left: 30, top: 5 },
    { left: 40, top: 5 },

    { left: 50, top: 5 },
    { left: 60, top: 5 },
    { left: 70, top: 5 },
    { left: 80, top: 5 },
    { left: 90, top: 5 },


    { left: 0, top: 20 },
    { left: 10, top: 20 },
    { left: 20, top: 20 },
    { left: 30, top: 20 },
    { left: 40, top: 20 },

    { left: 50, top: 20 },
    { left: 60, top: 20 },
    { left: 70, top: 20 },
    { left: 80, top: 20 },
    { left: 90, top: 20 }
]

function chickenRow() {
    let temp = ``;
    for (let i = 0; i < chickenArray.length; i++) {
        temp += `
        <img class="chick" src="images/BigChicken.png" style="left:${chickenArray[i].left}%; top:${chickenArray[i].top}%;"  alt="chicken">
        `;
    }
    document.getElementById("chicken").innerHTML = temp;
}
chickenRow();

function moveChicken() {
    for (let i = 0; i < chickenArray.length; i++) {
        chickenArray[i].top += 1;
    }
}
var bullets = [];

function bulletsRow() {
    let temp = ``;
    for (let i = 0; i < bullets.length; i++) {

        temp += `
        <img class="bullet" src="images/bullet.png"  style="left:${bullets[i].left}; bottom:${bullets[i].bottom}%;"  alt="bullet">`;
    }
    document.getElementById("bullets").innerHTML = temp;
}
function moveBullet() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].bottom += 20;
    }
}


// && (bullets[k].left >= chickenArray[i].left) && (bullets[k].left <= chickenArray[i].left)&& (bullets[k].bottom <= chickenArray[i].bottom+50)
function hit() {
    let bul, bulTop, bulLeft, chick, chickTop, chickLeft;
    for (let i = chickenArray.length-1; i> 0; i--) {
        for (let k = 0; k < bullets.length; k++) {
            bul = document.querySelectorAll(".bullet");
            bulTop = parseInt(bul[k].getBoundingClientRect().top);
            bulLeft = parseInt(bul[k].getBoundingClientRect().left);

            chick = document.querySelectorAll(".chick");
            chickTop = parseInt(chick[i].getBoundingClientRect().top);
            chickLeft = parseInt(chick[i].getBoundingClientRect().left);

            if ((bulTop >= chickTop) &&
                (bulLeft >= chickLeft)
            ) {
                bullets.splice(k, 1);
                chickenArray.splice(i, 1);
            }
        }
    }
}

function gameLoop() {
    setTimeout(gameLoop, 500);
    moveChicken();
    chickenRow();
    moveBullet();
    bulletsRow();
    hit();
}
gameLoop();

// var h, w;
// boxLeft  = window.innerWidth / 2;
// box.style.left = boxLeft;
// function windowSize() {

//     w = window.innerWidth;
//     h = window.innerHeight;
// }
// window.addEventListener("resize", function(){
//     windowSize();
//     boxLeft = w / 2;
//     box.style.left = boxLeft;
// });

let rocketLeft = 50; //for 50%

document.addEventListener("keydown", function (e) {

    if (e.keyCode == 39) // rightArrow
    {
        rocketLeft += 2;
        box.style.left = rocketLeft + "%";
    }
    else if (e.keyCode == 37) {
        rocketLeft -= 2;
        box.style.left = rocketLeft + "%";
    }
    else if (e.keyCode == 32) // space
    {
        document.getElementById("bulletAudio").play();
        bullets.push({
            left: box.style.left,
            bottom: 0
        })
    }
})

console.log(box.style.top);


// document.addEventListener("keyup", function (e) {

//     if (e.keyCode == 32) {
//         bullet.style.bottom = 0;
//     }
// })