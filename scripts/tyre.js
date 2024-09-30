let score = 0;
const scoreDisplay = document.getElementById('score');

const crosshair = document.querySelector('.crosshair');
document.addEventListener('mousemove', function (e) {
    crosshair.style.left = e.pageX - 20 + 'px'; 
    crosshair.style.top = e.pageY - 20 + 'px';  
});

function moveGhostRandomly(ghost) {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    ghost.style.left = x + 'px';
    ghost.style.top = y + 'px';
}

function moveGhostCircular(ghost, radius, centerX, centerY, angle) {
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    ghost.style.left = x + 'px';
    ghost.style.top = y + 'px';
}

function moveGhostSinusoidal(ghost, amplitude, speed, offsetX) {
    const x = offsetX + (Date.now() * speed) % window.innerWidth;
    const y = window.innerHeight / 2 + amplitude * Math.sin(x / 100);
    ghost.style.left = x + 'px';
    ghost.style.top = y + 'px';
}

const ghost1 = document.getElementById('ghost1');
const ghost2 = document.getElementById('ghost2');
const ghost3 = document.getElementById('ghost3');

let angle = 0;

function updateGhostPositions() {
    moveGhostRandomly(ghost1);
    
    const radius = 150;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    angle += 0.05;
    moveGhostCircular(ghost2, radius, centerX, centerY, angle);
    
    moveGhostSinusoidal(ghost3, 100, 0.3, 0);
}

ghost1.addEventListener('click', function () {
    score++;
    scoreDisplay.textContent = score;
    moveGhostRandomly(ghost1);
});

ghost2.addEventListener('click', function () {
    score++;
    scoreDisplay.textContent = score;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    moveGhostCircular(ghost2, 150, centerX, centerY, angle);
});

ghost3.addEventListener('click', function () {
    score++;
    scoreDisplay.textContent = score;
    moveGhostSinusoidal(ghost3, 100, 0.3, 0); 
});

setInterval(updateGhostPositions, 2000);

function goToMainScreen() {
    window.location.href = 'index.html';
}
