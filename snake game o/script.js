const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const difficulty = document.getElementsByName("difficulty");

const cellSize = 20;
const cellCount = canvas.width / cellSize;
let snake;
let food;
let score = 0;
let gameSpeed;

class Snake {
    constructor() {
        this.body = [
            { x: 5, y: 5 },
            { x: 4, y: 5 },
            { x: 3, y: 5 },
        ];
        this.direction = { x: 1, y: 0 };
    }

    draw() {
        this.body.forEach(segment => {
            ctx.fillStyle = "#4caf50";
            ctx.beginPath();
            ctx.arc((segment.x * cellSize) + (cellSize / 2), (segment.y * cellSize) + (cellSize / 2), cellSize / 2, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    update() {
        const head = { x: this.body[0].x + this.direction.x, y: this.body[0].y + this.direction.y };
        this.body.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            createFood();
        } else {
            this.body.pop();
        }
    }

    changeDirection(direction) {
        switch (direction) {
            case "Up":
                if (this.direction.y !== 1) {
                    this.direction = { x: 0, y: -1 };
                }
                break;
            case "Down":
                if (this.direction.y !== -1) {
                    this.direction = { x: 0, y: 1 };
                }
                break;
            case "Left":
                if (this.direction.x !== 1) {
                    this.direction = { x: -1, y: 0 };
                }
                break;
            case "Right":
                if (this.direction.x !== -1) {
                    this.direction = { x: 1, y: 0 };
                }
                break;
        }
    }

    checkCollision() {
        const head = this.body[0];
        if (head.x < 0 || head.x >= cellCount || head.y < 0 || head.y >= cellCount) {
            return true;
        }
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * cellCount),
        y: Math.floor(Math.random() * cellCount)
    };

    snake.body.forEach(segment => {
        if (food.x === segment.x && food.y === segment.y) {
            createFood();
        }
    });
}

function drawFood() {
    ctx.fillStyle = "#f44336";
    ctx.beginPath();
    ctx.arc((food.x * cellSize) + (cellSize / 2), (food.y * cellSize) + (cellSize / 2), cellSize / 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawScore() {
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.draw();
    drawFood();
    drawScore();

    if (snake.checkCollision()) {
        clearInterval(gameSpeed);
        alert(`Game Over! Your score is ${score}.`);
        startBtn.style.display = "block";
        return;
    }

    snake.update();
}

function startGame() {
    snake = new Snake();
    createFood();
    score = 0;
    let selectedDifficulty = [...difficulty].find(d => d.checked).value;
    gameSpeed = setInterval(draw, selectedDifficulty === "easy" ? 100 : selectedDifficulty === "medium" ? 80 : 60);
    startBtn.style.display = "none";
    canvas.style.display = "block";
}

startBtn.addEventListener("click", startGame);

document.addEventListener("keydown", event => {
    const direction = event.key.replace("Arrow", "");
    snake.changeDirection(direction);
});
