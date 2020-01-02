/* PLAY FUNCTION */
var gameNumber = 0;
function play() {
    gameNumber++;
    var box = document.getElementById("box");
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
        { left: 90, top: 5 }

        // { left: 0, top: 20 },
        // { left: 10, top: 20 },
        // { left: 20, top: 20 },
        // { left: 30, top: 20 },
        // { left: 40, top: 20 },

        // { left: 50, top: 20 },
        // { left: 60, top: 20 },
        // { left: 70, top: 20 },
        // { left: 80, top: 20 },
        // { left: 90, top: 20 }
    ]

    /**CHICKEN ROW */
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
    /**END CHICKEN ROW */

    /**CHICKEN MOTION AND GAME OVER CONDITION */
    function moveChicken() {
        var rock = document.querySelector("#rocket");
        var rockTop = parseInt(rock.getBoundingClientRect().top);
        var rockH = $("#rocket").height();
        var chick, chickTop;
        for (let i = 0; i < chickenArray.length; i++) {
            chickenArray[i].top += 1;
            chick = document.querySelectorAll(".chick");
            chickTop = parseInt(chick[i].getBoundingClientRect().top);

            if (chickTop >= rockTop - rockH) {
                clearTimeout(gOver);
                document.getElementById("gameOver").classList.remove("d-none");
                document.getElementById("gameOver").classList.add("d-flex", "justify-content-center", "align-items-center");
            }
        }
    }
    /**CHICKEN MOTION */

    /* BULLETS ROW */
    var bullets = [];
    function bulletsRow() {
        let temp = ``;
        for (let i = 0; i < bullets.length; i++) {

            temp += `
        <img class="bullet" src="images/bullet.png"  style="left:${bullets[i].left}; bottom:${bullets[i].bottom}%;"  alt="bullet">`;
        }
        document.getElementById("bullets").innerHTML = temp;
    }
    /* END BULLETS ROW */

    /**BULLET MOTION */
    function moveBullet() {
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].bottom += 20;
        }
    }
    /** END BULLET MOTION */

    /* BULLET HIT  AND WIN CONDITION*/
    var score = 0;
    function hit() {
        let bul, bulTop, bulLeft, chick, chickTop, chickLeft, chickW;
        chickW = $(".chick").width();

        for (let i = chickenArray.length - 1; i >= 0; i--) {
            for (let k = 0; k < bullets.length; k++) {
                bul = document.querySelectorAll(".bullet");
                bulTop = parseInt(bul[k].getBoundingClientRect().top);
                bulLeft = parseInt(bul[k].getBoundingClientRect().left);

                chick = document.querySelectorAll(".chick");
                chickTop = parseInt(chick[i].getBoundingClientRect().top);
                chickLeft = parseInt(chick[i].getBoundingClientRect().left);

                if ((bulTop >= chickTop) &&
                    (bulLeft >= chickLeft) &&
                    (bulLeft <= chickLeft + chickW)
                ) {
                    bullets.splice(k, 1);
                    chickenArray.splice(i, 1);
                    score++;
                    document.getElementById("score").innerHTML = "Score:" + score;
                    if (score == 10 && gameNumber == 1) {
                        chickenArray.push(
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
                        );
                        gameLoop();
                    }
                    else if (score == 30) {
                        clearTimeout(gOver);
                        document.getElementById("winner").classList.remove("d-none");
                        document.getElementById("winner").classList.add("d-flex", "justify-content-center", "align-items-center");
                    }
                }
            }
        }
    }

    /* END BULLET HIT  */

    /* GAME LOOP */
    var gOver;
    function gameLoop() {
        gOver = setTimeout(gameLoop, 700);
        chickenRow();
        moveChicken();
        bulletsRow();
        moveBullet();
        hit();
    }
    gameLoop();
    /* END GAME LOOP */

    /* KEYBOARD ACTIONS */
    let rocketLeft = 50; //for 50%
    document.addEventListener("keydown", function (e) {
        // rightArrow
        if (e.keyCode == 39) {
            rocketLeft += 2;
            box.style.left = rocketLeft + "%";
            if (box.style.left == "100%") {
                box.style.left = "0%";
                rocketLeft = 0;
            }
        }
        else if (e.keyCode == 37) {
            rocketLeft -= 2;
            box.style.left = rocketLeft + "%";
            if (box.style.left == "-4%") {
                box.style.left = "100%";
                rocketLeft = 100;
            }
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
    /* END KEYBOARD ACTIONS */
}

/* END PLAY FUNCTION */
play();

/**PLAY AGAIN */
function playAgain() {
    play();
    gameNumber = 0;
    document.getElementById("score").innerHTML = "Score: 0";
    document.getElementById("gameOver").classList.add("d-none");
    document.getElementById("gameOver").classList.remove("d-flex", "justify-content-center", "align-items-center");
    document.getElementById("winner").classList.add("d-none");
    document.getElementById("winner").classList.remove("d-flex", "justify-content-center", "align-items-center");
}
/**END PLAY AGAIN */


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