const timerElement = document.getElementById('timer');
const bestScoreElement = document.getElementById('best-score');
const newGameButton = document.getElementById('new-game');
const gameDiv = document.getElementById('game');
const userGuessInput = document.getElementById('user-guess');
const submitGuessButton = document.getElementById('submit-guess');
const feedbackElement = document.getElementById('feedback');
const movesElement = document.getElementById('moves');

let timer = 0;
let timerInterval;
let computerNumber;
let moves = 0;
let userName;
const database = [];

function startTimer() {
    timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = `Time: ${timer}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function generateNumber() {
    let digits = [];
    while (digits.length < 4) {
        let digit = Math.floor(Math.random() * 10);
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    return digits.join('');
}

function calculateScore(moves, time) {
    return moves + time / 10; // Example scoring formula
}

function updateBestScore() {
    if (database.length > 0) {
        const bestPlayer = database.reduce((best, player) => 
            calculateScore(player.moves, player.time) < calculateScore(best.moves, best.time) ? player : best
        );
        bestScoreElement.textContent = `Best Score: ${bestPlayer.name} (${bestPlayer.moves} moves, ${bestPlayer.time}s)`;
    } else {
        bestScoreElement.textContent = 'Best Score: None';
    }
}

newGameButton.addEventListener('click', () => {
    userName = prompt('Enter your name:');
    if (!userName) return;

    computerNumber = generateNumber();
    console.log(`Computer Number: ${computerNumber}`); // For debugging purposes

    moves = 0;
    feedbackElement.textContent = '';
    movesElement.textContent = 'Moves: 0';

    gameDiv.style.display = 'block';
    startTimer();
});

submitGuessButton.addEventListener('click', () => {
    const userGuess = userGuessInput.value;
    if (userGuess.length !== 4 || isNaN(userGuess)) {
        alert('Please enter a valid 4-digit number.');
        return;
    }

    moves++;
    let feedback = '';
    for (let i = 0; i < 4; i++) {
        if (userGuess[i] === computerNumber[i]) {
            feedback += '+';
        } else if (computerNumber.includes(userGuess[i])) {
            feedback += '-';
        }
    }

    feedbackElement.textContent = feedback;
    movesElement.textContent = `Moves: ${moves}`;

    if (userGuess === computerNumber) {
        stopTimer();
        alert(`Congratulations ${userName}! You guessed the number in ${moves} moves and ${timer} seconds.`);
        database.push({ name: userName, moves, time: timer });
        updateBestScore();
        gameDiv.style.display = 'none';
    }
});

updateBestScore();
