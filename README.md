# 🐍 Neuro-Evolution Snake AI

An autonomous Snake agent that learns to play through **Evolutionary Computing**. This project implements a **Genetic Algorithm (GA)** to train a **Feedforward Neural Network** (the snake's "brain") without any manual coding of movement rules.

## 🚀 Live Demo
[→ View the AI in Action here!](https://stackpilot24.github.io/Neural-Evolution-snake-AI/)
<img width="1409" height="882" alt="image" src="https://github.com/user-attachments/assets/4b4c29f4-f46f-42b6-81a2-65fdd6548036" />

## 🧠 How the AI Works

### 1. The Brain (Neural Network)
Each snake has a 3-layer neural network that acts as its decision-making engine:
* **Inputs (8):** Distance to walls (N, S, E, W) and relative position of food.
* **Hidden Layer (12 neurons):** Processes spatial data using the `tanh` activation function.
* **Outputs (4):** The probability of moving Up, Down, Left, or Right.



### 2. The Evolution (Genetic Algorithm)
The population starts with 50 snakes with completely random weights. 
* **Selection:** At the end of a generation, the "fittest" snakes (those that lived longest and ate the most) are selected.
* **Elitism:** The top 2 performers are carried over to the next generation unchanged.
* **Mutation:** New snakes are created by "cloning" the winners and adding small random variations (5% mutation rate) to their weights to explore new strategies.



## 🛠️ Project Structure
```text
/snake-ai
├── /src
│   ├── /ai          # Neural Network & Population logic
│   ├── /game        # Snake physics & Food mechanics
│   └── /ui          # Dashboard & Rendering engine
├── index.html       # Entry point
└── style.css        # Dashboard styling
```


🕹️ Features
1. Training Mode: High-speed toggle to accelerate the learning process.
2. Persistence: Save the "Best Brain" to localStorage so the AI remembers its progress after a page refresh.
3. Live Stats: Real-time tracking of Generations, High Scores, and Active Population.

🛠️ Tech Stack
1. Language: Vanilla JavaScript (ES6+)
2. Rendering: HTML5 Canvas API
3. Styling: CSS3 (Modern Dark Theme)
