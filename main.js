document.addEventListener('DOMContentLoaded', () => {
    startGame();
});

const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [];
let userSequence = [];
let level = 1;
let score = 0;

function startGame() {
    sequence = [];
    userSequence = [];
    level = 1;
    score = 0;
    updateScore();
    nextSequence();
    disableClick(); // Désactiver les clics au début du jeu
}

function nextSequence() {
    userSequence = [];
    addRandomColorToSequence();
    playSequence();
    disableClick(); // Désactiver les clics pendant la lecture de la séquence
}

function addRandomColorToSequence() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
}

function playSequence() {
    let i = 0;
    const intervalId = setInterval(() => {
        if (i >= sequence.length) {
            clearInterval(intervalId);
            enableClick(); // Activer les clics après la lecture de la séquence
            return;
        }
        highlight(sequence[i]);
        i++;
    }, 1000);
}

function highlight(color) {
    const element = document.querySelector(`.${color}`);
    element.classList.add('active');
    setTimeout(() => element.classList.remove('active'), 500);
}

function handleClick(color) {
    if (!userSequence.push(color)) return; // Ne rien faire si les clics sont désactivés
    checkUserInput(color);
}

function checkUserInput(color) {
    const index = userSequence.length - 1;
    if (color === sequence[index]) {
        if (userSequence.length === sequence.length) {
            score++;
            updateScore();
            setTimeout(() => nextSequence(), 1000);
        }
    } else {
        alert(`Perdu. Ton score : ${score}`);
        startGame();
    }
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

function disableClick() {
    colors.forEach(color => {
        const element = document.querySelector(`.${color}`);
        element.onclick = null;
    });
}

function enableClick() {
    colors.forEach(color => {
        const element = document.querySelector(`.${color}`);
        element.onclick = () => handleClick(color);
    });
}

function Equal(arr1, arr2) {
    return arr1.every((value, index) => value === arr2[index]);
}
