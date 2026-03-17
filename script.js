// LOADING TIMER
let time = 5;
const timerEl = document.getElementById("timer");
const enterBtn = document.getElementById("enterBtn");

const countdown = setInterval(() => {
  time--;
  timerEl.innerText = time;

  if (time <= 0) {
    clearInterval(countdown);
    enterBtn.classList.remove("hidden");
  }
}, 1000);

// ENTER SITE
enterBtn.onclick = () => {
  document.getElementById("loading").style.display = "none";
  document.getElementById("main").classList.remove("hidden");
};

// FLOATING EMOJIS
const emojis = ["🌸","✨","💖","🫧","🎀"];
for(let i=0;i<25;i++){
  const e = document.createElement("div");
  e.className = "floating";
  e.innerText = emojis[Math.floor(Math.random()*emojis.length)];
  e.style.left = Math.random()*100 + "vw";
  e.style.fontSize = 20 + Math.random()*20 + "px";
  e.style.animationDuration = 8 + Math.random()*5 + "s";
  document.body.appendChild(e);
}

// BUBBLES
for(let i=0;i<15;i++){
  const b = document.createElement("div");
  b.className = "bubble";
  let size = 10 + Math.random()*20;
  b.style.width = size + "px";
  b.style.height = size + "px";
  b.style.left = Math.random()*100 + "vw";
  b.style.animationDuration = 10 + Math.random()*10 + "s";
  document.body.appendChild(b);
}

// SPARKLES
document.addEventListener("mousemove", e => {
  const s = document.createElement("div");
  s.className = "sparkle";
  s.style.left = e.clientX + "px";
  s.style.top = e.clientY + "px";
  document.body.appendChild(s);
  setTimeout(()=>s.remove(), 1000);
});

// SECRET
document.getElementById("revealBtn").onclick = () => {
  document.getElementById("secret").classList.add("show");
};

function closeSecret(){
  document.getElementById("secret").classList.remove("show");
}
