const gameArea = document.getElementById("gameArea");
const playerCar = document.getElementById("playerCar");

let game = {
  speed: 5,
  keys: {
    ArrowLeft: false,
    ArrowRight: false
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    game.keys[e.key] = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    game.keys[e.key] = false;
  }
});

function moveCar() {
  let left = parseInt(window.getComputedStyle(playerCar).left);

  if (game.keys.ArrowLeft && left > 0) {
    playerCar.style.left = left - game.speed + "px";
  }

  if (game.keys.ArrowRight && left < 350) {
    playerCar.style.left = left + game.speed + "px";
  }
}

function createObstacle() {
  const obs = document.createElement("div");
  obs.classList.add("obstacle");
  obs.style.left = Math.floor(Math.random() * 350) + "px";
  gameArea.appendChild(obs);
}

function moveObstacles() {
  const obstacles = document.querySelectorAll(".obstacle");

  obstacles.forEach((obs) => {
    let top = parseInt(window.getComputedStyle(obs).top);
    if (top > 600) {
      obs.remove();
    } else {
      obs.style.top = top + game.speed + "px";

      // Collision Detection
      let carRect = playerCar.getBoundingClientRect();
      let obsRect = obs.getBoundingClientRect();
      if (
        carRect.top < obsRect.bottom &&
        carRect.bottom > obsRect.top &&
        carRect.left < obsRect.right &&
        carRect.right > obsRect.left
      ) {
        alert("💥 Game Over!");
        window.location.reload();
      }
    }
  });
}

function gameLoop() {
  moveCar();
  moveObstacles();
  requestAnimationFrame(gameLoop);
}

setInterval(createObstacle, 2000);
gameLoop();
