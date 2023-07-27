const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const score = document.getElementById("score");

let isAlive = setInterval(() => {
    // current dino Y position
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

    // current cactus X position
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // to detect collision
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        alert("Game Over");
        score.textContent = "0";
    }
}, 10);

let addScore = setInterval(() => {
    let currScore = parseInt(score.textContent);
    currScore += 1;
    score.textContent = currScore;
}, 40)

function jump() {
    if (dino.classList != "jump") {
        dino.classList.add("jump");

        setTimeout(function () {
            dino.classList.remove("jump")
        }, 300)
    }
}

document.addEventListener('keydown', (event) => {
    var name = event.code;
    if (name === 'Space') {
        jump();
    }
}, false);

document.addEventListener('click', () => {
    jump();
});

