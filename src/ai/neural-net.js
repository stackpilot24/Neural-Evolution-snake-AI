class NeuralNetwork {
    constructor(weights = null) {
        this.inputNodes = 8;
        this.hiddenNodes = 12;
        this.outputNodes = 4;

        if (weights) {
            this.weights = weights;
        } else {
            // Randomly initialize weights between -1 and 1
            let totalWeights = (this.inputNodes * this.hiddenNodes) + (this.hiddenNodes * this.outputNodes);
            this.weights = Array.from({ length: totalWeights }, () => Math.random() * 2 - 1);
        }
    }

    predict(inputs) {
        // Hidden Layer Calculation
        let hidden = [];
        for (let i = 0; i < this.hiddenNodes; i++) {
            let sum = 0;
            for (let j = 0; j < this.inputNodes; j++) {
                sum += inputs[j] * this.weights[i * this.inputNodes + j];
            }
            hidden.push(Math.tanh(sum));
        }

        // Output Layer Calculation
        let outputs = [];
        let offset = this.inputNodes * this.hiddenNodes;
        for (let i = 0; i < this.outputNodes; i++) {
            let sum = 0;
            for (let j = 0; j < this.hiddenNodes; j++) {
                sum += hidden[j] * this.weights[offset + (i * this.hiddenNodes) + j];
            }
            outputs.push(Math.tanh(sum));
        }
        // Return index of max value (0:Up, 1:Down, 2:Left, 3:Right)
        return outputs.indexOf(Math.max(...outputs));
    }
}