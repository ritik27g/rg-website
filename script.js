document.addEventListener("DOMContentLoaded", function () {

let scenes = document.querySelectorAll(".scene");
let current = 0;
let musicStarted = false;
let fireworksRunning = false;

// Expose functions
window.startStory = startStory;
window.nextScene = nextScene;
window.celebrate = celebrate;

/* START STORY */
function startStory() {
  if (!musicStarted) {
    const music = document.getElementById("bgMusic");
    music.play().catch(() => {});
    musicStarted = true;
  }
  goNext();
}

function nextScene() {
  goNext();
}

function goNext() {
  if (current >= scenes.length - 1) return;

  scenes[current].classList.remove("active");
  current++;
  scenes[current].classList.add("active");

  if (current === scenes.length - 1) {
    startCountdown();
  }
}

/* COUNTDOWN */
function startCountdown() {
  const text = document.getElementById("countdownText");
  let count = 3;

  let interval = setInterval(() => {
    text.innerHTML = count;
    count--;

    if (count < 0) {
      clearInterval(interval);
      showProposal();
    }
  }, 1000);
}

/* PROPOSAL */
function showProposal() {
  const scene = scenes[current];
  scene.querySelector(".content").innerHTML = `
    <h1>Will You Marry Me? 💍</h1>
    <button onclick="celebrate()">YES 💖</button>
  `;
}

/* FIREWORKS SYSTEM */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let particles = [];

function celebrate() {
  if (!fireworksRunning) {
    fireworksRunning = true;
    startFireworks();
    animate();
  }

  setTimeout(() => {
    alert("Take a screenshot 📸 This moment is ours forever ❤️");
  }, 1500);
}

function startFireworks() {
  setInterval(() => {
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 4 + 1,
        life: 100
      });
    }
  }, 800);
}

function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "gold";
    ctx.fill();

    if (p.life <= 0) {
      particles.splice(index, 1);
    }
  });
}

});

