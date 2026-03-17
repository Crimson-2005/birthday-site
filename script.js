// ==================== AUDIO ====================
const birthdayBgm = document.getElementById("birthdayBgm");
const batmanBgm = document.getElementById("batmanBgm");
const meowSfx = document.getElementById("meowSfx");

// ==================== INTRO COUNTDOWN ====================
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

// ==================== FIRST SURPRISE ====================
function revealSurprise() {
  document.getElementById("loading").style.display = "none";

  const main = document.getElementById("main");
  main.classList.remove("hidden");
  setTimeout(() => main.classList.add("show"), 100);

  spawnBats();

  // Play birthday music (allowed because user clicked)
  birthdayBgm.currentTime = 0;
  birthdayBgm.volume = 0.3;
  birthdayBgm.play();
}

// ==================== SECOND SURPRISE ====================
function showCheesySurprise() {
  document.getElementById("gameContainer").classList.remove("hidden");
}
// ==================== BATS ====================
function spawnBats() {
  const container = document.getElementById("bats");

  for (let i = 0; i < 10; i++) {
    let bat = document.createElement("div");
    bat.className = "bat";
    container.appendChild(bat);

    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let sx = (Math.random() - 0.5) * 2;
    let sy = (Math.random() - 0.5) * 2;

    function move() {
      x += sx;
      y += sy;

      if (x < 0 || x > innerWidth) sx *= -1;
      if (y < 0 || y > innerHeight) sy *= -1;

      bat.style.left = x + "px";
      bat.style.top = y + "px";

      requestAnimationFrame(move);
    }

    move();
  }
}

// ==================== GAME LOGIC ====================
let score = 0;
let gameInterval;

function startGame() {
  const gameArea = document.getElementById("gameArea");
  if (!gameArea) return;

  score = 0;
  document.getElementById("score").innerText = score;

  clearInterval(gameInterval);

  // Stop birthday music
  birthdayBgm.pause();

  // 🔥 Play Batman music ONLY now
  batmanBgm.currentTime = 0;
  batmanBgm.volume = 0.3;
  batmanBgm.play();

  gameInterval = setInterval(dropCheese, 800);
}


// ==================== DROP CHEESE ====================
function dropCheese() {
  const gameArea = document.getElementById("gameArea");
  if (!gameArea) return;

  const cheese = document.createElement("div");
  cheese.className = "cheese";
  cheese.innerText = "🧀";

  cheese.style.left =
    Math.random() * (gameArea.clientWidth - 40) + "px";

  cheese.onclick = () => {
    score++;
    document.getElementById("score").innerText = score;
    cheese.remove();

    if (score >= 7) {
      unlockSecret();
    }
  };

  gameArea.appendChild(cheese);

  setTimeout(() => {
    cheese.remove();
  }, 5000);
}

// ==================== SECRET UNLOCK ====================
function unlockSecret() {
  clearInterval(gameInterval);

  batmanBgm.pause();
  meowSfx.currentTime = 0;
  meowSfx.play();

  const secret = document.getElementById("secret");
  secret.classList.add("show-secret");

  confetti({
    particleCount: 250,
    spread: 140,
    origin: { y: 0.6 }
  });

  setTimeout(() => {
    confetti({
      particleCount: 180,
      spread: 160,
      origin: { y: 0.3 }
    });
  }, 700);
}

// ==================== CERTIFICATE ====================
function showCertificate() {
  confetti({ particleCount: 300, spread: 160 });

  setTimeout(() => {
    const link = document.createElement("a");
    link.href = "certificate.png";
    link.download = "Mozarella_Master_Certificate.png";
    link.click();
  }, 2000);
}

// ==================== CLOSE SECRET ====================
function closeSecret() {
  document
    .getElementById("secret")
    .classList.remove("show-secret");
}

