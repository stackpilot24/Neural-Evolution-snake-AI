// src/ai/population.js

class Population {
    constructor(size, gridSize) {
        this.size = size;
        this.gridSize = gridSize;
        // Initialize 50 snakes
        this.snakes = Array.from({ length: size }, () => new Snake(gridSize));
        this.generation = 1;
        
        // TUNING PARAMETERS
        this.mutationRate = 0.05;   // 5% chance to change a weight
        this.mutationStrength = 0.2; // How much to change it (-0.2 to +0.2)
    }

    isFinished() {
        return this.snakes.every(s => s.dead);
    }
    // Add these inside class Population { ... }

    saveBest() {
    // The first snake in the sorted list is always the best
    const bestBrain = this.snakes[0].brain.weights;
    localStorage.setItem('best_snake_weights', JSON.stringify(bestBrain));
    alert("Best Brain Saved to Browser!");
    }

    loadBest() {
        const savedData = localStorage.getItem('best_snake_weights');
        if (savedData) {
            const weights = JSON.parse(savedData);
        // Replace current population with children of the legend
            this.snakes = this.snakes.map(() => new Snake(this.gridSize, new NeuralNetwork(weights)));
            this.generation = 1;
            alert("Best Brain Loaded!");
        } else {
            alert("No saved brain found.");
        }
    }

    evolve() {
        // 1. Sort by fitness (Best performers first)
        this.snakes.sort((a, b) => b.fitness - a.fitness);
        
        const nextGen = [];

        // 2. ELITISM: Keep the top 2 snakes exactly as they are.
        // This ensures we never lose our "Best Record".
        nextGen.push(new Snake(this.gridSize, this.snakes[0].brain));
        nextGen.push(new Snake(this.gridSize, this.snakes[1].brain));

        // 3. REPRODUCTION: Fill the rest of the population
        while (nextGen.length < this.size) {
            // Pick a parent from the top 10% (the "Winners")
            let parentBrain = this.snakes[Math.floor(Math.random() * (this.size * 0.1))].brain;
            
            // Create a child with mutated weights
            let childWeights = parentBrain.weights.map(w => {
                if (Math.random() < this.mutationRate) {
                    // Add a small random nudge to the existing weight
                    return w + (Math.random() * (this.mutationStrength * 2) - this.mutationStrength);
                }
                return w; // Keep original weight
            });

            nextGen.push(new Snake(this.gridSize, new NeuralNetwork(childWeights)));
        }

        this.snakes = nextGen;
        this.generation++;
    }
    
}