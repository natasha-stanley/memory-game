"use strict";

/*jshint esversion: 6 */

//-------------------------------------------------------------global variables

let paused = false;
let audio = document.getElementById('audio');
let playBTN = document.getElementById('music-ctrl');
let bgMusic = new Audio('static/audio/Sci-fi-Pulse-Loop.mp3');
let muted = false;

//-----------------------------------------------------------------welcome page
function getName() {
    var name = document.getElementById('fname');
    var nameOutput = document.getElementById('fnameOutput');
    var enterBTN = document.getElementById('enter-button');
    var nameOutputVictory = document.getElementById('fnameOutputCongrats');
    enterBTN.addEventListener('click', storeData(), retrieveData(), false);

    $("#get-username").submit(function(e) {
        e.preventDefault(); //stop page refresh
    });
    
    function storeData() {
        localStorage.name = name.value;
    }
    function retrieveData() {
        nameOutput.innerHTML = localStorage.name;
        nameOutputVictory.innerHTML = localStorage.name;
    }
}

let enterBTN = document.getElementById('enter-button');
let welcomeOverlay = document.getElementById('welcome-overlay');
let rulesPage = document.getElementById('rules');
enterBTN.addEventListener('click', () => {
        getName();
        welcomeOverlay.classList.toggle('visible');
        rulesPage.classList.toggle('visible');
});


//----------------------------------------------------------------reset overlay

const resetOverlay = document.getElementById('reset-overlay');
const resetBTN = document.getElementById('reset');
resetBTN.addEventListener('click', () => {
    resetOverlay.classList.toggle('visible');
    paused = !paused;
});

//----------------------------------------------------------------rules overlay

/*
const hideReset = () => {
    if (infoOverlay.style.display === "none") {
        resetBTN.style.display = "flex"
    } else {
        resetBTN.style.display = "none"
    }
}
*/

const infoOverlay = document.getElementById('info-overlay');
const infoButton = document.getElementById('toggle');
infoButton.addEventListener('click', () => {
    infoOverlay.classList.toggle('visible');
    resetBTN.classList.toggle('hidden');
    paused = !paused;
});
//infoButton.addEventListener('click', hideReset);

//---------------------------------------------------------------audio controls
const playMusic = () => {
    if(muted){
        muted = false;
        bgMusic.play();
        bgMusic.volume = 0.05;
        bgMusic.loop = true;
        playBTN.innerHTML = ('<i class="fas fa-volume-up"></i>');
    } else {
        muted = true;
        bgMusic.pause();
        playBTN.innerHTML = ('<i class="fas fa-volume-mute"></i>');
    }
};
playBTN.addEventListener('click', playMusic);


class AudioController {
    constructor() {
        this.flipSound = new Audio('static/audio/card-flip.mp3');
        this.matchSound = new Audio('static/audio/card-match.mp3');
        this.victorySound = new Audio('static/audio/game-win.mp3');
        this.gameOverSound = new Audio('static/audio/game-over.mp3');
        this.flipSound.volume = 0.15;
        this.matchSound.volume = 0.15;
        this.victorySound.volume = 0.15;
        this.gameOverSound.volume = 0.15;
    }
   
    stopMusic() {
        this.flipSound.pause();
        this.matchSound.pause();
    }

    flip() {
        if (!muted) {
        this.flipSound.play();
        }
    }

    match() {
        if (!muted) {
        this.matchSound.play();
        }
    }

    victory() {
        if (!muted) {
        this.stopMusic();
        this.victorySound.play();
        }
    }

    gameOver() {
        if (!muted) {
        this.stopMusic();
        this.gameOverSound.play();
        }
    }
}

//------------------------------------------------------------------game logic
class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.stats = document.getElementById('stats');
        this.audioController = new AudioController();
    }

    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerHTML = this.timeRemaining;
        this.ticker.innerHTML = this.totalClicks;
    }
    
    hideCards() {
        this.cardsArray.forEach(cards => {
            cards.classList.remove('visible');
            cards.classList.remove('matched');
        });
    }

    flipCard(cards) {
        if(this.canFlipCard(cards)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            cards.classList.add('visible');
            if(this.cardToCheck)
                this.checkForCardMatch(cards);
            else
                this.cardToCheck = cards;
        }
    }

    checkForCardMatch(cards) {
        if(this.getCardType(cards) === this.getCardType(this.cardToCheck))
            this.cardMatch(cards, this.cardToCheck);
        else
            this.cardMisMatch(cards, this.cardToCheck);
        this.cardToCheck = null;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }

    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    getCardType(cards) {
        return cards.getElementsByClassName('card-value')[0].src;
    }

    startCountDown() {
         return setInterval(() => {
             if (!paused) {
                this.timeRemaining--;
                this.timer.innerText = this.timeRemaining;
             }
            if(this.timeRemaining === 0)
                this.gameOver();
            }, 1000);
    }

    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }

    victory() {
        clearInterval(this.countDown);
        this.audioController.victory();
        getName();
        document.getElementById('victory-text').classList.add('visible');
        if (this.totalTime >= 70 && this.totalTime <= 90 || this.totalClicks <= 30 && this.totalClicks >= 5) {
            this.stats.innerHTML = 
            `You won in ${this.timeRemaining} seconds and ${this.totalClicks} flips!` + '<br>' + 
            '<i class="fas fa-star"><i class="fas fa-star"><i class="fas fa-star"><i class="fas fa-star"><i class="fas fa-star">';
        } else if (this.totalTime >= 60 && this.totalTime <= 69 || this.totalClicks <= 40 && this.totalClicks >= 31) {
            this.stats.innerHTML = 
            `You won in ${this.timeRemaining} seconds and ${this.totalClicks} flips!` + '<br>' + 
            '<i class="fas fa-star"><i class="fas fa-star"><i class="fas fa-star">';
        } else if (this.totalTime >= 50 && this.totalTime <= 59 || this.totalClicks <= 50 && this.totalClicks >= 41) {
            this.stats.innerHTML = 
            `You won in ${this.timeRemaining} seconds and ${this.totalClicks} flips!` + '<br>' + 
            '<i class="fas fa-star">';
        } else {
            this.stats.innerHTML = 
            `You won in ${this.timeRemaining} seconds and ${this.totalClicks} flips!`;
        }
    }

    reset() {
        clearInterval(this.countDown);
        paused = !paused;
        this.startGame();
    }

    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(cards) {
        return !this.busy && !this.matchedCards.includes(cards) && cards !== this.cardToCheck;
    }
}

//---------------------------------------------------------------readying game
function ready() {

    let rulesPage = document.getElementById('rules');
    let gameOver = document.getElementById('game-over-text');
    let victory = document.getElementById('victory-text');
    let restartGO = document.getElementById('restart-gameover');
    let restartV = document.getElementById('restart-victory');
    let cards = Array.from(document.getElementsByClassName('card'));
    let startGame = document.getElementById('start-game');
    let resetBTN = document.getElementById('reset-game');
    let contGame = document.getElementById('continue-game')
    let game = new MixOrMatch(100, cards);

    startGame.addEventListener('click', () => {
        rulesPage.classList.remove('visible');
        game.startGame();
    });

    restartGO.addEventListener('click', () => {
        gameOver.classList.remove('visible');
        game.startGame();
    });

    restartV.addEventListener('click', () => {
        victory.classList.remove('visible');
        game.startGame();
    });

    resetBTN.addEventListener('click', () => {
        resetOverlay.classList.toggle('visible');
        game.reset();
    });

    contGame.addEventListener('click', () => {
        resetOverlay.classList.toggle('visible');
        paused = !paused;
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}
    
ready();



