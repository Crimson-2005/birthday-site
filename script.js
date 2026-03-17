const birthdayBgm = document.getElementById("birthdayBgm");
const meowSfx = document.getElementById("meowSfx");
const timerEl = document.getElementById("intro-timer");
const revealBtn = document.getElementById("revealBtn");
const main = document.getElementById("main");
const startButton = document.getElementById("startButton");
const heartsContainer = document.getElementById("heartsContainer");
const bubblesContainer = document.getElementById("bubblesContainer");
const secret = document.getElementById("secret");

let time = 5;
let timer = setInterval(()=>{
  time--;
  timerEl.innerText = time;
  if(time<=0){
    clearInterval(timer);
    revealBtn.classList.remove("hidden");
  }
},1000);

// ===== FIRST SURPRISE (SECRET POPUP) =====
function revealSurprise(){
  document.getElementById("loading").style.display="none";
  main.classList.remove("hidden");
  main.style.opacity=0;
  main.style.transform="scale(0.5)";
  setTimeout(()=>{
    main.style.transition="all 1s ease";
    main.style.opacity=1;
    main.style.transform="scale(1)";
  },50);

  birthdayBgm.currentTime=0;
  birthdayBgm.volume=0.3;
  birthdayBgm.play();

  startHearts();
  startBubbles();
}

// ===== START BUTTON =====
startButton.addEventListener("click",()=>{
  startButton.style.display="none";
  document.getElementById("celebrationBox").classList.remove("hidden");
});

// ===== FLOATING HEARTS =====
function startHearts(){
  const hearts=[];
  function createHeart(){
    const heart=document.createElement("div");
    const size=Math.random()*20+10;
    heart.style.width=size+"px";
    heart.style.height=size+"px";
    heart.style.background="pink";
    heart.style.left=Math.random()*window.innerWidth+"px";
    heart.style.bottom="-50px";
    heartsContainer.appendChild(heart);

    hearts.push({el:heart,y:parseFloat(heart.style.bottom),speed:Math.random()*1.5+0.5});
  }
  setInterval(createHeart,300);

  function animateHearts(){
    hearts.forEach((h,i)=>{
      h.y+=h.speed;
      h.el.style.bottom=h.y+"px";
      h.el.style.transform=`translateX(${Math.sin(h.y/20)*10}px)`;
      if(h.y>window.innerHeight+50){ h.el.remove(); hearts.splice(i,1);}
    });
    requestAnimationFrame(animateHearts);
  }
  animateHearts();
}

// ===== BUBBLES =====
function startBubbles(){
  const bubbles=[];
  for(let i=0;i<20;i++){
    const bubble=document.createElement("div");
    const size=Math.random()*20+10;
    bubble.style.width=size+"px";
    bubble.style.height=size+"px";
    bubble.style.background=["#ffb6c1","#d8bfd8","#ffff99","#dda0dd"][Math.floor(Math.random()*4)];
    bubble.style.left=Math.random()*window.innerWidth+"px";
    bubble.style.bottom="-50px";
    bubblesContainer.appendChild(bubble);
    bubbles.push({el:bubble,y:parseFloat(bubble.style.bottom),speed:Math.random()*1.2+0.5});
  }

  function animateBubbles(){
    bubbles.forEach(b=>{
      b.y+=b.speed;
      b.el.style.bottom=b.y+"px";
      if(b.y>window.innerHeight+50){ b.y=-50; b.el.style.left=Math.random()*window.innerWidth+"px";}
    });
    requestAnimationFrame(animateBubbles);
  }
  animateBubbles();
}

// ===== SECRET MODE =====
function unlockSecret(){
  meowSfx.currentTime=0;
  meowSfx.play();
  secret.classList.add("show-secret");
}

function closeSecret(){
  secret.classList.remove("show-secret");
}
