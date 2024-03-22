const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = []; // Séquence de couleurs générée par l'ordinateur
let userSequence = []; // Séquence de couleurs entrée par l'utilisateur


// function btn1() {
//     location.reload();
//     allBtn.disabled = false
//     allBtn()
// }

// let start = document.querySelector('#start'); 
// start.addEventListener("click", btn1);

// function bnt2(){
//     allBtn.disabled = true
// }

// let stop = document.querySelector("#stop")
// stop.addEventListener("click", bnt2)

// let allBtn = function allBtn (){

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
    const randomColor = colors[Math.floor(Math.random() * 4)]; // Sélectionne une couleur aléatoire parmi les couleurs disponibles
    sequence.push(randomColor); // Ajoute la couleur à la séquence
}

function playSequence() {
    let i = 0;
    const intervalId = setInterval(function () {
        highlight(sequence[i]); // Met en évidence la couleur de la séquence actuelle
        i++;
        if (i >= sequence.length) {
            clearInterval(intervalId);
            enableClick();
        }
    }, 1000);
}

function highlight(color) {
    const element = document.querySelector(`.${color}`);
    element.style.opacity = 0.5; // Réduit l'opacité de l'élément pour le mettre en évidence
    setTimeout(function () {
        element.style.opacity = 1; // Rétablit l'opacité de l'élément après un certain délai
    }, 500);
}

function handleClick(color) {
    userSequence.push(color); // Ajoute la couleur sélectionnée par l'utilisateur à sa séquence
    checkUserInput();
}

function checkUserInput() {
    if (userSequence.length === sequence.length) { // Vérifie si l'utilisateur a entré la séquence complète
        if (Equal(userSequence, sequence)) { // Vérifie si la séquence de l'utilisateur correspond à la séquence générée par l'ordinateur
            setTimeout(nextSequence, 1000); // Passe à la séquence suivante après un certain délai
        } else {
            alert('Perdu'); // Affiche un message d'alerte en cas d'erreur de l'utilisateur
            startGame(); // Recommence le jeu
        }
    }
}

function Equal(arr1, arr2) {
    return arr1.every((value, index) => value === arr2[index]); // Vérifie si deux tableaux sont égaux en comparant chaque élément
}

// }



window.onload = startGame; // Démarre le jeu lorsque la page est chargée