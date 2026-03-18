// ====== COUNTDOWN ======
let time = 5;
const timerEl = document.getElementById("intro-timer");
const revealBtn = document.getElementById("revealBtn");
const loading = document.getElementById("loading");
const main = document.getElementById("main");

const countdown = setInterval(()=>{
  timerEl.innerText = time;
  time--;
  if(time<0){ clearInterval(countdown); revealBtn.classList.remove("hidden"); }
},1000);

revealBtn.onclick = ()=>{
  loading.style.display="none";
  main.classList.remove("hidden");
};

// ====== FLOATING HEARTS & BALLOONS ======
const heartContainer=document.querySelector(".hearts");
const balloonArea=document.getElementById("balloons");
const emojis=["💖","✨","🌸","🎀"];

setInterval(()=>{
  const h=document.createElement("span");
  h.textContent=emojis[Math.floor(Math.random()*emojis.length)];
  h.style.left=Math.random()*100+"vw";
  h.style.fontSize=15+Math.random()*15+"px";
  h.style.animationDuration=4+Math.random()*3+"s";
  heartContainer.appendChild(h);
  setTimeout(()=>h.remove(),7000);

  const b=document.createElement("span");
  b.textContent="🎈";
  b.style.left=Math.random()*100+"vw";
  b.style.fontSize=30+Math.random()*20+"px";
  balloonArea.appendChild(b);
  setTimeout(()=>b.remove(),10000);
},500);

// ====== SPARKLES ======
const sparkleContainer=document.getElementById("sparkleContainer");
document.addEventListener("mousemove",e=>{
  const s=document.createElement("div");
  s.className="sparkle";
  s.style.left=e.clientX+"px";
  s.style.top=e.clientY+"px";
  sparkleContainer.appendChild(s);
  setTimeout(()=>s.remove(),1000);
});

// ====== MINI HEART GAME ======
const gameBtn=document.getElementById("gameBtn");
const gameContainer=document.getElementById("gameContainer");
let heartScore=0, heartInterval;

gameBtn.onclick=()=>{ gameContainer.classList.remove("hidden"); startHeartGame(); }

function startHeartGame(){
  heartScore=0;
  const box=document.getElementById("gameBox");
  box.innerHTML="";
  heartInterval=setInterval(()=>{
    const heart=document.createElement("span");
    heart.innerText="💖"; heart.classList.add("click-heart");
    heart.style.left=Math.random()*85+"%";
    heart.style.top=Math.random()*75+"%";
    heart.onclick=()=>{
      heart.remove();
      heartScore++;
      if(heartScore>=7){ clearInterval(heartInterval); unlockSecret(); }
    };
    box.appendChild(heart);
    setTimeout(()=>heart.remove(),3000);
  },900);
}

// ====== SECRET ======
const secret=document.getElementById("secret");
function unlockSecret(){ secret.classList.add("show"); }
function closeSecret(){ secret.classList.remove("show"); }
