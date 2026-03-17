const birthdayBgm = document.getElementById("birthdayBgm");
const meowSfx = document.getElementById("meowSfx");

let time = 5;
let timerEl = document.getElementById("intro-timer");
let revealBtn = document.getElementById("revealBtn");

let timer = setInterval(() => {
  time--;
  timerEl.innerText = time;

  if (time <= 0) {
    clearInterval(timer);
    revealBtn.classList.remove("hidden");
  }
}, 1000);

function revealSurprise() {
  document.getElementById("loading").style.display = "none";

  const main = document.getElementById("main");
  main.classList.remove("hidden");

  birthdayBgm.volume = 0.3;
  birthdayBgm.play();
}

function showCheesySurprise() {
  document.getElementById("gameContainer").classList.remove("hidden");
}

let score = 0;
let gameInterval;

function startGame() {
  score = 0;
  document.getElementById("score").innerText = score;
  gameInterval = setInterval(dropCheese, 800);
}

function dropCheese() {
  const gameArea = document.getElementById("gameArea");

  const cheese = document.createElement("div");
  cheese.className = "cheese";
  cheese.innerText = "🧀";

  cheese.style.left =
    Math.random() * (gameArea.clientWidth - 40) + "px";

  cheese.onclick = () => {
    score++;
    document.getElementById("score").innerText = score;
    cheese.remove();

    if (score >= 7) unlockSecret();
  };

  gameArea.appendChild(cheese);

  setTimeout(() => cheese.remove(), 5000);
}

function unlockSecret() {
  clearInterval(gameInterval);

  meowSfx.play();

  document.getElementById("secret").classList.add("show-secret");

  confetti({
    particleCount: 200,
    spread: 120
  });
}

function closeSecret() {
  document.getElementById("secret").classList.remove("show-secret");
}
