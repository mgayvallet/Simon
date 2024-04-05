const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = []; 
let userSequence = []; 

function startGame() {
    sequence = [];
    userSequence = [];
    nextSequence();
}

function nextSequence() {
    userSequence = [];
    addRandomColorToSequence();
    playSequence();
}

function addRandomColorToSequence() {
    const randomColor = colors[Math.floor(Math.random() * 4)];
}

function playSequence() {
    let i = 0;
    const intervalId = setInterval(function () {
        highlight(sequence[i]); 
        i++;
        if (i >= sequence.length) {
            clearInterval(intervalId);
            enableClick();
        }
    }, 1000);
}

function highlight(color) {
    const element = document.querySelector(`.${color}`);
    element.style.opacity = 0.5; 
    setTimeout(function () {
        element.style.opacity = 1; 
    }, 500);
}

function handleClick(color) {
    userSequence.push(color); 
    checkUserInput();
}

function checkUserInput() {
    if (userSequence.length === sequence.length) {
        if (Equal(userSequence, sequence)) { 
            setTimeout(nextSequence, 1000); 
        } else {
            alert('Perdu');
            startGame();
        }
    }
}

function Equal(arr1, arr2) {
    return arr1.every((value, index) => value === arr2[index]);
}


window.onload = startGame;
