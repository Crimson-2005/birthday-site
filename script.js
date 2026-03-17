// ==================== AUDIO ====================
const birthdayBgm = document.getElementById("birthdayBgm");
const sparkleSfx = document.getElementById("sparkleSfx"); // cute sound effect for hearts

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

  // Start floating hearts/bows
  startHearts();

  // Play birthday music
  birthdayBgm.currentTime = 0;
  birthdayBgm.volume = 0.3;
  birthdayBgm.play();
}

// ==================== SECOND SURPRISE (Secret Game) ====================
function showCheesySurprise() {
  const gameContainer = document.getElementById("gameContainer");
  gameContainer.classList.remove("hidden");

  startHeartDropsGame(); // optional interactive hearts game
}

// ==================== HEARTS & BOWS FLOATING ====================
const heartsContainer = document.createElement("div");
heartsContainer.id = "heartsContainer";
document.body.appendChild(heartsContainer);

function startHearts() {
  const hearts = [];

  function createHeart() {
    const heart = document.createElement("div");
    const size = Math.random() * 25 + 15;

    const types = ["💖","🎀","✨","💞"];
    heart.innerText = types[Math.floor(Math.random()*types.length)];
    heart.style.fontSize = size + "px";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "-50px";
    heartsContainer.appendChild(heart);

    hearts.push({el: heart, y: -50, speed: Math.random()*1.5+0.5});
  }

  setInterval(createHeart, 300);

  function animateHearts() {
    hearts.forEach((h,i)=>{
      h.y += h.speed;
      h.el.style.bottom = h.y + "px";
      h.el.style.transform = `translateX(${Math.sin(h.y/20)*10}px) rotate(${h.y}deg)`;
      if(h.y > window.innerHeight + 50){
        h.el.remove();
        hearts.splice(i,1);
      }
    });
    requestAnimationFrame(animateHearts);
  }

  animateHearts();
}

// ==================== SECRET UNLOCK ====================
function unlockSecret() {
  // Stop heart drops game if any
  if(window.heartInterval) clearInterval(window.heartInterval);

  // Play sparkle sound effect
  sparkleSfx.currentTime = 0;
  sparkleSfx.play();

  const secret = document.getElementById("secret");
  secret.classList.add("show-secret");

  // Optional: explode hearts instead of confetti
  explodeHearts();
}

// ==================== HEARTS “EXPLOSION” ====================
function explodeHearts() {
  for(let i=0; i<50; i++){
    const heart = document.createElement("div");
    const size = Math.random()*20 + 15;
    const types = ["💖","🎀","✨","💞"];
    heart.innerText = types[Math.floor(Math.random()*types.length)];
    heart.style.fontSize = size + "px";
    heart.style.position = "fixed";
    heart.style.left = window.innerWidth/2 + "px";
    heart.style.top = window.innerHeight/2 + "px";
    heart.style.opacity = 0.9;
    heart.style.pointerEvents = "none";
    document.body.appendChild(heart);

    let angle = Math.random() * 2*Math.PI;
    let distance = Math.random()*200 + 100;

    heart.animate([
      { transform: `translate(0px,0px) scale(1)` },
      { transform: `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px) scale(1.5)`, opacity:0 }
    ], {
      duration: 1500 + Math.random()*500,
      easing: "ease-out",
    });

    setTimeout(()=> heart.remove(),2000);
  }
}

// ==================== CERTIFICATE ====================
function showCertificate() {
  explodeHearts();
  setTimeout(()=>{
    const link = document.createElement("a");
    link.href = "certificate.png";
    link.download = "Birthday_Certificate.png";
    link.click();
  },2000);
}

// ==================== CLOSE SECRET ====================
function closeSecret() {
  document.getElementById("secret").classList.remove("show-secret");
}
