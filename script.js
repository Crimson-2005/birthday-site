AOS.init({ duration: 800, once: true });

const countdownEl = document.getElementById('countdown');
const enterBtn = document.getElementById('enterBtn');
const loading = document.getElementById('loading');
const mainContent = document.getElementById('mainContent');
const music = document.getElementById('birthdayMusic');
const heartContainer = document.querySelector('.hearts');
const balloonArea = document.getElementById('balloons');

let count = 5;
const interval = setInterval(() => {
  count--;
  countdownEl.innerText = count;
  if (count <= 0) {
    clearInterval(interval);
    enterBtn.classList.remove('hidden');
  }
}, 1000);

enterBtn.onclick = () => {
  loading.style.display = 'none';
  mainContent.classList.remove('hidden');
  music.volume = 0.5;
  music.play();

  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

  startHeartGame();
};

setInterval(() => {
  const heart = document.createElement('span');
  heart.textContent = '💖';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = Math.random() * 10 + 15 + 'px';
  heart.style.animationDuration = Math.random() * 3 + 4 + 's';
  heartContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);

  const b = document.createElement('span');
  b.textContent = '🎈';
  b.style.left = Math.random() * 100 + 'vw';
  b.style.fontSize = Math.random() * 30 + 30 + 'px';
  balloonArea.appendChild(b);
  setTimeout(() => b.remove(), 13000);
}, 500);

/* ---------------- GAMES ---------------- */
let heartScore = 0;
let heartInterval;

function startHeartGame() {
  mainContent.innerHTML = `<div class="card"><h2>Game 1: Catch 7 Hearts 💖</h2><div id="gameBox"></div><p id="gameMessage">Click the hearts!</p></div>`;
  const gameBox = document.getElementById('gameBox');

  heartScore = 0;
  heartInterval = setInterval(() => {
    const heart = document.createElement('span');
    heart.innerText = '💖';
    heart.classList.add('click-heart');
    heart.style.left = Math.random() * 85 + "%";
    heart.style.top = Math.random() * 75 + "%";
    heart.onclick = function () {
      heart.remove();
      heartScore++;
      document.getElementById("gameMessage").innerText = `Score: ${heartScore} / 7`;
      if (heartScore >= 7) {
        clearInterval(heartInterval);
        setTimeout(startBalloonGame, 600);
      }
    };
    gameBox.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }, 900);
}

function startBalloonGame() {
  mainContent.innerHTML = `<div class="card"><h2>Game 2: Find the Lucky Balloon 🎈</h2><div id="gameBox"></div><p id="gameMessage">Choose wisely 😏</p></div>`;
  const box = document.getElementById('gameBox');
  const lucky = Math.floor(Math.random() * 3);

  for (let i = 0; i < 3; i++) {
    const balloon = document.createElement('div');
    balloon.classList.add('choice-box');
    balloon.innerText = '🎈';
    balloon.onclick = function () {
      if (i === lucky) startFallingGame();
      else document.getElementById('gameMessage').innerText = "Oops 😜 Try Again!";
    };
    box.appendChild(balloon);
  }
}

function startFallingGame() {
  mainContent.innerHTML = `<div class="card"><h2>Game 3: Catch the Compliments 💖</h2><div id="gameBox"></div><p id="gameMessage">Click good words!</p></div>`;
  const box = document.getElementById('gameBox');
  const scoreDisplay = document.createElement('div');
  scoreDisplay.id = 'scoreDisplay';
  scoreDisplay.innerText = 'Score: 0';
  box.appendChild(scoreDisplay);

  const gameArea = document.createElement('div');
  gameArea.id = 'catchGameArea';
  box.appendChild(gameArea);

  let score = 0;
  let gameActive = true;
  const goodWords = ["Lovely 💐","Awesome 😎","Star 🌟","Cutie 🫶"];
  const badWords = ["Sleepy 😴","Grumpy 😠","Lazy 🐌"];

  const createFallingWord = () => {
    if (!gameActive) return;
    const word = document.createElement('div');
    word.classList.add('falling-word');
    const isGood = Math.random() > 0.4;
    word.innerText = isGood ? goodWords[Math.floor(Math.random() * goodWords.length)]
                            : badWords[Math.floor(Math.random() * badWords.length)];
    word.dataset.good = isGood;
    word.style.left = Math.random() * 280 + 'px';
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
      else score = Math.max(0, score-1);
      scoreDisplay.innerText = `Score: ${score}`;
      word.remove();
      clearInterval(fallInterval);
      if (score >= 10) {
        gameActive = false;
        setTimeout(showFinalMessage, 800);
      }
    };
  };

  setInterval(createFallingWord, 1000);
}

function showFinalMessage() {
  mainContent.innerHTML = `
    <div class="card" data-aos="zoom-in">
      <h2>Happy Birthday Somya 🎂✨</h2>
      <p>Wishing you a day full of laughter, love, and endless magic! 💖🎉</p>
    </div>
    <div class="card" data-aos="fade-up">
      <p>May all your dreams twinkle like stars 🌟 and your heart be as happy as today 🫶</p>
    </div>
  `;
  AOS.refresh();
}
