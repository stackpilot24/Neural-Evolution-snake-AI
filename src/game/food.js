class Food {
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.spawn();
    }

    spawn() {
        this.x = Math.floor(Math.random() * this.gridSize);
        this.y = Math.floor(Math.random() * this.gridSize);
    }

    draw(ctx, tileSize) {
        ctx.fillStyle = "#ff4757";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ff4757";
        ctx.fillRect(this.x * tileSize, this.y * tileSize, tileSize - 1, tileSize - 1);
        ctx.shadowBlur = 0;
    }
}