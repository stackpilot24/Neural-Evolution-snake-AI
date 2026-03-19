const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const TILE = 25; // 500 / 20 = 25
const popSize = 50;
const gridSize = 20;

let population = new Population(popSize, gridSize);
let bestScore = 0;
let isFastForward = false;

function update() {
    // If everyone is dead, evolve the species
    if (population.isFinished()) {
        population.evolve();
        // Update the UI
        document.getElementById('genUI').innerText = population.generation;
    }

    population.snakes.forEach(snake => {
        snake.update();
        if (snake.score > bestScore) {
            bestScore = snake.score;
            document.getElementById('bestUI').innerText = bestScore;
        }
    });

    document.getElementById('aliveUI').innerText = population.snakes.filter(s => !s.dead).length;
}

function draw() {
    // Clear background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snakes
    population.snakes.forEach((snake, index) => {
        if (snake.dead) return;

        // Make the best snake look prominent
        ctx.fillStyle = index === 0 ? "#22c55e" : "rgba(255, 255, 255, 0.15)";
        
        snake.tail.forEach(part => {
            ctx.fillRect(part.x * TILE, part.y * TILE, TILE - 1, TILE - 1);
        });

        // Only draw the food for the best snake to keep the screen clean
        if (index === 0) {
            snake.food.draw(ctx, TILE);
        }
    });
}

function loop() {
    // If Fast Forward is on, we run the logic 10 times per frame
    let iterations = isFastForward ? 15 : 1;
    for (let i = 0; i < iterations; i++) {
        update();
    }
    draw();
    requestAnimationFrame(loop);
}
// Add a "Save" button listener
document.getElementById('saveBtn').onclick = () => {
    population.saveBest();
};

// Add a "Load" button listener
document.getElementById('loadBtn').onclick = () => {
    population.loadBest();
};
// Controls
document.getElementById('speedBtn').onclick = () => {
    isFastForward = !isFastForward;
    document.getElementById('speedBtn').innerText = isFastForward ? "Normal Speed" : "Toggle Training Speed";
};


document.getElementById('resetBtn').onclick = () => location.reload();

// Start the simulation
loop();