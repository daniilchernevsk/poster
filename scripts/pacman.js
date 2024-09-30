const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('pacman-score');
let score = 0;
let totalPoints = 0;

// Лабиринт (1 - стена, 0 - свободное пространство, 2 - точка)
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 2, 0, 1, 0, 2, 0, 2, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 2, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 2, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 2, 0, 0, 0, 2, 0, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const pacmanElement = document.getElementById('pacman');
const ghostElement = document.getElementById('ghost');

let pacmanPosition = generateRandomPosition();
let ghostPosition = generateRandomPosition();

function generateRandomPosition() {
    let x, y;
    do {
        x = Math.floor(Math.random() * maze.length);
        y = Math.floor(Math.random() * maze[0].length);
    } while (maze[x][y] !== 0);
    return { x, y };
}

function createBoard() {
    gameBoard.innerHTML = '';
    totalPoints = 0;
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            const cell = document.createElement('div');
            if (maze[row][col] === 1) {
                cell.classList.add('wall');
            } else if (maze[row][col] === 2) {
                const point = document.createElement('div');
                point.classList.add('point');
                point.id = `point-${row}-${col}`;
                cell.appendChild(point);
                totalPoints++;
            }
            gameBoard.appendChild(cell);
        }
    }
    updatePacmanPosition();
    updateGhostPosition();
}

function placeElement(element, x, y) {
    const gridSize = 40;
    element.style.left = `${y * gridSize}px`;
    element.style.top = `${x * gridSize}px`;
}

function updatePacmanPosition() {
    placeElement(pacmanElement, pacmanPosition.x, pacmanPosition.y);
}

function updateGhostPosition() {
    placeElement(ghostElement, ghostPosition.x, ghostPosition.y);
    
    checkGameOver(); 
}

document.addEventListener('keydown', (event) => {
    let newX = pacmanPosition.x;
    let newY = pacmanPosition.y;

    switch (event.key) {
        case 'ArrowUp':
            newX -= 1;
            break;
        case 'ArrowDown':
            newX += 1;
            break;
        case 'ArrowLeft':
            newY -= 1;
            break;
        case 'ArrowRight':
            newY += 1;
            break;
    }

    if (newX >= 0 && newX < maze.length && newY >= 0 && newY < maze[0].length && maze[newX][newY] !== 1) {
        pacmanPosition = { x: newX, y: newY };
        collectPoint(newX, newY);
        updatePacmanPosition(); 
        checkGameOver(); 
    }
});

function collectPoint(x, y) {
    if (maze[x][y] === 2) {
        maze[x][y] = 0;
        score++;
        scoreDisplay.textContent = score;

        const pointElement = document.getElementById(`point-${x}-${y}`);
        if (pointElement) {
            pointElement.remove();
        }

        if (score === totalPoints) {
            endGame('Вы победили! Все точки собраны.');
        }
    }
}

function moveGhost() {
    let bestMove = ghostPosition;
    let shortestDistance = Number.MAX_VALUE;

    const possibleMoves = [
        { x: ghostPosition.x - 1, y: ghostPosition.y }, 
        { x: ghostPosition.x + 1, y: ghostPosition.y }, 
        { x: ghostPosition.x, y: ghostPosition.y - 1 }, 
        { x: ghostPosition.x, y: ghostPosition.y + 1 }, 
    ];

    possibleMoves.forEach((move) => {
        if (move.x >= 0 && move.x < maze.length && move.y >= 0 && move.y < maze[0].length && maze[move.x][move.y] !== 1) {
            const distance = Math.sqrt((move.x - pacmanPosition.x) ** 2 + (move.y - pacmanPosition.y) ** 2);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                bestMove = move;
            }
        }
    });

    ghostPosition = bestMove;
    updateGhostPosition();
}

function checkGameOver() {
    if (pacmanPosition.x === ghostPosition.x && pacmanPosition.y === ghostPosition.y) {
        endGame('Игра окончена! Призрак поймал Пэкмена.');
    }
}

function endGame(message) {
    score = 0;
    goToMainScreen();
}

function goToMainScreen() {
    window.location.href = 'index.html';
}


// Начало игры
createBoard();

setInterval(moveGhost, 500);
