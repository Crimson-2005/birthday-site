// ---------- LOADING ----------
let time = 5;
const timerEl = document.getElementById("timer");
const enterBtn = document.getElementById("enterBtn");
const loading = document.getElementById("loading");
const main = document.getElementById("main");

const countdown = setInterval(()=>{
  time--;
  timerEl.innerText = time;
  if(time<=0){ clearInterval(countdown); enterBtn.classList.remove("hidden"); }
},1000);

enterBtn.onclick = () => {
  loading.style.display="none";
  main.classList.remove("hidden");
};

// ---------- LETTER OPEN & RIBBON ----------
const letter = document.getElementById("letter");
const ribbon = letter.querySelector(".ribbon");
const folded = letter.querySelector(".letter-folded");
const opened = letter.querySelector(".letter-opened");

letter.onclick = ()=>{
  folded.classList.add("hidden");
  opened.classList.remove("hidden");
  ribbon.style.transform="translateY(-200%)";
};

// ---------- BALLOONS & EMOJIS ----------
const emojis = ["🌸","✨","💖","🎀","🕊️"];
for(let i=0;i<20;i++){
  const e=document.createElement("div");
  e.className="floating";
  e.innerText=emojis[Math.floor(Math.random()*emojis.length)];
  e.style.left=Math.random()*100+"vw";
  e.style.fontSize=18+Math.random()*22+"px";
  e.style.animationDuration=8+Math.random()*6+"s";
  document.body.appendChild(e);
}

// BALLOONS
for(let i=0;i<10;i++){
  const b=document.createElement("div");
  b.className="balloon";
  b.innerText="🎈";
  b.style.left=Math.random()*100+"vw";
  b.style.fontSize=24+Math.random()*20+"px";
  b.style.animationDuration=6+Math.random()*5+"s";
  document.body.appendChild(b);
}

// ---------- GAME ----------
const gameContainer=document.getElementById("gameContainer");
const startBtn=document.getElementById("startGame");
const scoreEl=document.getElementById("score");
const gameArea=document.getElementById("gameArea");
let score=0, gameInterval;

document.getElementById("gameBtn").onclick=()=>{
  gameContainer.classList.remove("hidden");
}

startBtn.onclick=()=>{
  score=0; scoreEl.innerText=score;
  gameInterval=setInterval(dropHeart,800);
}

function dropHeart(){
  const heart=document.createElement("div");
  heart.className="heart"; heart.innerText="💖";
  heart.style.left=Math.random()*(gameArea.clientWidth-30)+"px";
  heart.onclick=()=>{ score++; scoreEl.innerText=score; heart.remove(); if(score>=5) unlockSecret();}
  gameArea.appendChild(heart);
  setTimeout(()=>heart.remove(),5000);
}

// ---------- SECRET ----------
const secret=document.getElementById("secret");
function unlockSecret(){ clearInterval(gameInterval); secret.classList.add("show"); }
function closeSecret(){ secret.classList.remove("show"); }

// ---------- SPARKLES ----------
const sparkleContainer=document.getElementById("sparkleContainer");
document.addEventListener("mousemove",e=>{
  const s=document.createElement("div");
  s.className="sparkle"; s.style.left=e.clientX+"px"; s.style.top=e.clientY+"px";
  sparkleContainer.appendChild(s);
  setTimeout(()=>s.remove(),1000);
});
