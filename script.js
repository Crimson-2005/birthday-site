const loader = document.getElementById("loader");
const main = document.getElementById("main");
const countdownEl = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const bgAudio = document.getElementById("bgAudio");
const countdownBox = document.getElementById("countdownBox");
const celebrationBox = document.getElementById("celebrationBox");
const heartsContainer = document.getElementById("heartsContainer");
const bubblesContainer = document.getElementById("bubblesContainer");
const confettiCanvas = document.getElementById("confettiCanvas");

// ===== LOADER =====
setTimeout(() => {
  loader.style.display = "none";
  main.classList.remove("hidden");
}, 1500);

// ===== COUNTDOWN =====
const birthdayDate = new Date("April 28, 2025").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = birthdayDate - now;

  if (diff <= 0) {
    countdownBox.style.display = "none";
    startButton.classList.remove("hidden");
    clearInterval(interval);
    return;
  }

  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff % (1000*60*60*24))/(1000*60*60));
  const mins = Math.floor((diff % (1000*60*60))/(1000*60));
  const secs = Math.floor((diff % (1000*60))/1000);

  countdownEl.innerText = `${days}d ${hours}h ${mins}m ${secs}s`;
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();

// ===== START CELEBRATION =====
startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  celebrationBox.classList.remove("hidden");
  bgAudio.volume = 0.8;
  bgAudio.play().catch(e => console.log("Play blocked:", e));

  startHearts();
  startBubbles();
  startConfetti();
});

// ===== FLOATING HEARTS =====
function startHearts() {
  const hearts = [];
  function createHeart() {
    const heart = document.createElement("div");
    const size = Math.random()*20 + 10;
    heart.style.width = size + "px";
    heart.style.height = size + "px";
    heart.style.background = "pink";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "-50px";
    heartsContainer.appendChild(heart);

    hearts.push({
      el: heart,
      x: parseFloat(heart.style.left),
      y: parseFloat(heart.style.bottom),
      speed: Math.random()*1.5 + 0.5,
    });
  }

  setInterval(createHeart, 300);

  function animateHearts() {
    hearts.forEach((h, i) => {
      h.y += h.speed;
      h.el.style.bottom = h.y + "px";
      h.el.style.transform = `translateX(${Math.sin(h.y/20)*10}px)`;
      if(h.y > window.innerHeight + 50){
        h.el.remove();
        hearts.splice(i,1);
      }
    });
    requestAnimationFrame(animateHearts);
  }
  animateHearts();
}

// ===== BUBBLES =====
function startBubbles() {
  const bubbles = [];
  for(let i=0;i<20;i++){
    const bubble = document.createElement("div");
    const size = Math.random()*20 + 10;
    bubble.style.width = size+"px";
    bubble.style.height = size+"px";
    bubble.style.background = ["#ffb6c1","#d8bfd8","#ffff99","#dda0dd"][Math.floor(Math.random()*4)];
    bubble.style.left = Math.random()*window.innerWidth+"px";
    bubble.style.bottom = "-50px";
    bubblesContainer.appendChild(bubble);

    bubbles.push({
      el: bubble,
      y: parseFloat(bubble.style.bottom),
      speed: Math.random()*1.2 + 0.5
    });
  }

  function animateBubbles() {
    bubbles.forEach(b=>{
      b.y += b.speed;
      b.el.style.bottom = b.y + "px";
      if(b.y > window.innerHeight + 50){
        b.y = -50;
        b.el.style.left = Math.random()*window.innerWidth+"px";
      }
    });
    requestAnimationFrame(animateBubbles);
  }
  animateBubbles();
}

// ===== CONFETTI =====
function startConfetti() {
  const canvas = confettiCanvas;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  const confettis = [];
  for(let i=0;i<150;i++){
    confettis.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: Math.random()*6+4,
      color: ["#ff69b4","#ffb6c1","#8a2be2","#ffd700","#ff4500"][Math.floor(Math.random()*5)],
      dy: Math.random()*3+2
    });
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confettis.forEach(c => {
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.size, c.size);
      c.y += c.dy;
      if(c.y > canvas.height) c.y = -c.size;
    });
    requestAnimationFrame(draw);
  }
  draw();
}
