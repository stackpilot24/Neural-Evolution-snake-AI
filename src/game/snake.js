class Snake {
    constructor(gridSize, brain = null) {
        this.gridSize = gridSize;
        this.brain = brain || new NeuralNetwork();
        this.reset();
    }

    reset() {
        this.pos = { x: 10, y: 10 };
        this.tail = [{ x: 10, y: 10 }];
        this.dir = { x: 1, y: 0 };
        this.score = 0;
        this.health = 200; // Lives for 200 steps without food
        this.dead = false;
        this.lifetime = 0;
        this.fitness = 0;
        this.food = new Food(this.gridSize);
    }

    getVision() {
        const dx = (this.food.x - this.pos.x) / this.gridSize;
        const dy = (this.food.y - this.pos.y) / this.gridSize;
        return [
            this.pos.x / this.gridSize, (this.gridSize - this.pos.x) / this.gridSize,
            this.pos.y / this.gridSize, (this.gridSize - this.pos.y) / this.gridSize,
            dx > 0 ? 1 : 0, dx < 0 ? 1 : 0,
            dy > 0 ? 1 : 0, dy < 0 ? 1 : 0
        ];
    }

    update() {
        if (this.dead) return;
        this.lifetime++;
        this.health--;

        const decision = this.brain.predict(this.getVision());
        if (decision === 0) this.dir = { x: 0, y: -1 };
        if (decision === 1) this.dir = { x: 0, y: 1 };
        if (decision === 2) this.dir = { x: -1, y: 0 };
        if (decision === 3) this.dir = { x: 1, y: 0 };

        this.pos.x += this.dir.x;
        this.pos.y += this.dir.y;

        // Collision Check
        if (this.pos.x < 0 || this.pos.x >= this.gridSize || this.pos.y < 0 || this.pos.y >= this.gridSize || this.health <= 0) {
            this.dead = true;
            this.fitness = (this.score * 100) + this.lifetime;
            return;
        }

        // Food Check
        if (this.pos.x === this.food.x && this.pos.y === this.food.y) {
            this.score++;
            this.health += 100;
            this.food.spawn();
        }

        this.tail.push({ ...this.pos });
        if (this.tail.length > this.score + 1) this.tail.shift();
    }
}