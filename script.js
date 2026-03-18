AOS.init({
  duration: 800,
  once: true
});

window.onload = function() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
};

let time = 5;
const timerEl = document.getElementById("intro-timer");
const revealBtn = document.getElementById("revealBtn");
const loadingScreen = document.getElementById("loading");
const music = document.getElementById("birthdayMusic"); // Make sure your <audio> has this ID

// Countdown
const countdown = setInterval(() => {
  time--;
  timerEl.innerText = time;

  if (time <= 0) {
    clearInterval(countdown);
    revealBtn.classList.remove("hidden"); // Show button
  }
}, 1000);

// Button click: hide loading & play music
revealBtn.addEventListener("click", () => {
  // Fade out loading screen
  loadingScreen.style.transition = "opacity 0.8s";
  loadingScreen.style.opacity = "0";
  setTimeout(() => { loadingScreen.style.display = "none"; }, 800);

  // Play music
  music.volume = 0.5;
  music.play();
});

const heartContainer = document.querySelector('.hearts');
const balloonArea = document.getElementById('balloons');

setInterval(() => {
  // HEART
  const heart = document.createElement('span');
  heart.textContent = '💖';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = Math.random() * 10 + 15 + 'px';
  heart.style.animationDuration = Math.random() * 3 + 4 + 's';
  heartContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);

  // BALLOON
  const b = document.createElement('span');
  b.textContent = '🎈';
  b.style.left = Math.random() * 100 + 'vw';
  b.style.fontSize = Math.random() * 30 + 30 + 'px';
  balloonArea.appendChild(b);
  setTimeout(() => b.remove(), 13000);

}, 500);

let heartScore = 0;
let heartInterval;

function startHeartGame() {
  const music = document.getElementById("birthdayMusic");
  music.volume = 0.5;
  music.play();
  
  document.getElementById("gameIntro").style.display = "none";
  document.getElementById("gameArea").style.display = "block";

  document.getElementById("gameTitle").innerText = "Game 1: Catch 7 Hearts 💖";
  document.getElementById("gameMessage").innerText = "";

  heartScore = 0;

  const box = document.getElementById("gameBox");
  box.innerHTML = `<div id="gameScore">Score: 0 / 7</div>`;

  clearInterval(heartInterval);
  heartInterval = setInterval(spawnHeart, 900);
}

function spawnHeart() {
  const box = document.getElementById("gameBox");

  const heart = document.createElement("span");
  heart.innerText = "💖";
  heart.classList.add("click-heart");

  heart.style.left = Math.random() * 85 + "%";
  heart.style.top = Math.random() * 75 + "%";

  heart.onclick = function () {
    heart.remove();
    heartScore++;
    document.getElementById("gameScore").innerText = "Score: " + heartScore + " / 7";

    if (heartScore >= 7) {
      clearInterval(heartInterval);
      setTimeout(() => startBalloonGame(), 600);
    }
  };

  box.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
}

function startBalloonGame() {
  document.getElementById("gameTitle").innerText = "Game 2: Find the Lucky Balloon 🎈";
  document.getElementById("gameBox").innerHTML = "";
  document.getElementById("gameMessage").innerText = "Choose wisely 😏";

  const lucky = Math.floor(Math.random() * 3);

  for (let i = 0; i < 3; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("choice-box");
    balloon.innerText = "🎈";

    balloon.onclick = function () {
      if (i === lucky) startBoxGame();
      else document.getElementById("gameMessage").innerText = "Oops 😜 Try Again!";
    };

    document.getElementById("gameBox").appendChild(balloon);
  }
}

function startBoxGame() {
  document.getElementById("gameTitle").innerText = "Game 3: Catch the Compliments 💖";
  const box = document.getElementById("gameBox");
  box.innerHTML = "";
  document.getElementById("gameMessage").innerText = "Good words click karo! Wrong pe mat click karna 😌";

  let score = 0;
  let gameActive = true;

  const goodWords = ["Choco Puff 🍫", "Gulabo 💐", "Cutie Patootie 🫧", "Bestie 🫶", "Paglu 😜"];
  const badWords = ["Drama Frog 🐸", "Sleepy Potato 🥔", "Ziddi Zombie 🧟", "Manjulika 👻"];

  const scoreDisplay = document.createElement("div");
  scoreDisplay.id = "scoreDisplay";
  scoreDisplay.innerText = "Score: 0";

  const gameArea = document.createElement("div");
  gameArea.id = "catchGameArea";

  box.appendChild(scoreDisplay);
  box.appendChild(gameArea);

  function createFallingWord() {
    if (!gameActive) return;

    const word = document.createElement("div");
    word.classList.add("falling-word");

    const isGood = Math.random() > 0.4;
    word.innerText = isGood
      ? goodWords[Math.floor(Math.random() * goodWords.length)]
      : badWords[Math.floor(Math.random() * badWords.length)];

    word.dataset.good = isGood;
    word.style.left = Math.random() * 280 + "px";
    gameArea.appendChild(word);

    let topPosition = 0;
    const fallInterval = setInterval(() => {
      if (!gameActive) { clearInterval(fallInterval); return; }
      topPosition += 0.5;
      word.style.top = topPosition + "px";
      if (topPosition > 260) { word.remove(); clearInterval(fallInterval); }
    }, 30);

    word.onclick = function () {
      if (!gameActive) return;
      if (word.dataset.good === "true") score++;
      else score = Math.max(0, score - 1);

      scoreDisplay.innerText = "Score: " + score;
      word.remove();
      clearInterval(fallInterval);

      if (score >= 10) {
        gameActive = false;
        setTimeout(() => unlockMainContent(), 800);
      }
    };
  }

  setInterval(createFallingWord, 1000);
}

function unlockMainContent() {
  const mainContent = document.getElementById("mainContent");
  const gameAreaCard = document.getElementById("gameArea");
  const gameIntroCard = document.getElementById("gameIntro");

  // Hide the game completely
  if (gameAreaCard) gameAreaCard.style.display = "none";
  if (gameIntroCard) gameIntroCard.style.display = "none";

  // Reveal the post-game content
  mainContent.style.display = "block";  
  setTimeout(() => {
    mainContent.style.opacity = "1"; // fade-in container
    mainContent.style.pointerEvents = "auto";
  }, 100);

  // Scroll reveal for post-game cards
  const cards = mainContent.querySelectorAll(".card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.2 }
  );
  cards.forEach((card) => observer.observe(card));
}

