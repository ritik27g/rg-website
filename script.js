let scenes = document.querySelectorAll(".scene");
let current = 0;
function startStory() {
  const music = document.getElementById("bgMusic");
  music.play().catch(() => {});
  nextScene();
}

window.startStory = startStory;

function nextScene() {
  flashEffect();
  scenes[current].classList.remove("active");
  current++;
  scenes[current].classList.add("active");

  revealLines(scenes[current]);

  if (current === scenes.length - 1) {
    startCountdown();
  }
}

function revealLines(scene) {
  let lines = scene.querySelectorAll(".line");
  lines.forEach((line, index) => {
    line.style.opacity = 0;
    setTimeout(() => {
      line.style.transition = "opacity 1s";
      line.style.opacity = 1;
    }, index * 1000);
  });
}

function flashEffect() {
  const flash = document.querySelector(".flash");
  flash.style.opacity = 1;
  setTimeout(() => flash.style.opacity = 0, 200);
}

function startCountdown() {
  const text = document.getElementById("countdownText");
  let count = 3;

  let interval = setInterval(() => {
    text.innerHTML = count;
    count--;
    if (count < 0) {
      clearInterval(interval);
      showRing();
    }
  }, 1000);
}

function showRing() {
  const scene = scenes[current];
  scene.querySelector(".content").innerHTML = `
    <div class="ring-box" id="ringBox">
      <div class="ring-lid"></div>
      <div class="ring"></div>
    </div>
    <h1>Will You Marry Me? 💍</h1>
    <button onclick="celebrate()">YES 💖</button>
  `;

  setTimeout(() => {
    document.getElementById("ringBox").classList.add("open");
    startRoses();
  }, 800);
}

function startRoses() {
  setInterval(() => {
    const rose = document.createElement("div");
    rose.classList.add("rose");
    rose.innerHTML = "🌹";
    rose.style.left = Math.random() * 100 + "vw";
    rose.style.animationDuration = (Math.random() * 3 + 4) + "s";
    document.body.appendChild(rose);
    setTimeout(() => rose.remove(), 7000);
  }, 300);
}

function celebrate() {
  startFireworks();
  setTimeout(() => {
    alert("Take a screenshot 📸 This moment is ours forever ❤️");
  }, 2000);
}

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function startFireworks() {
  setInterval(() => {
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 5,
        radius: 2
      });
    }
  }, 1000);
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "gold";
    ctx.fill();
  });
}

animate();
