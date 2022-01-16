/*MAIN JS PAGE*/
/*tutorial found on youtube for the initial JS creation of the game can be found here: https://www.youtube.com/watch?v=3uuQ3g92oPQ - author PortEXE */
/*original code pen link for the animated background inspiration can be found here: ttps://codepen.io/AchrafBoujjou/pen/RxjWXB - author Achraf Boujjou*/
/*tutorial for help on if else if errors in victory() of mixormatch class can be found here: https://www.youtube.com/watch?v=EumXak7TyQ0 - author Web Dev Simplified */

"use strict";

/*jshint esversion: 6 */

//-------------------------------------------------------------global variables

let paused = false;
let audio = document.getElementById('audio');
let playBTN = document.getElementById('music-ctrl');
let bgMusic = new Audio('static/audio/sci-fi-pulse-loop.mp3');
let muted = false;
let enterBTN = document.getElementById('enter-button');
const gameContainer = document.getElementById('game-container');


//-----------------------------------------------------------------welcome page
const getName = () => {
    const name = document.getElementById('fname');
    const nameOutput = document.getElementById('fnameOutput');
    const nameOutputVictory = document.getElementById('fnameOutputCongrats');
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

const welcomeOverlay = document.getElementById('welcome-overlay');
const rulesPage = document.getElementById('rules');
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

const infoOverlay = document.getElementById('info-overlay');
const infoButton = document.getElementById('toggle');
const okBTN = document.getElementById('okay-btn');
infoButton.addEventListener('click', () => {
    infoOverlay.classList.toggle('visible');
    paused = !paused;
});
okBTN.addEventListener('click', () => {
    infoOverlay.classList.toggle('visible');
    paused = !paused;
});

//---------------------------------------------------------------audio controls

//-------------------------------bg music and icon controls

bgMusic.volume = 0.05;
bgMusic.loop = true;
enterBTN.addEventListener('click', () => {
    if(!muted) {
        bgMusic.play();
    }
});

const playMusic = () => {
    if(muted){
        muted = false;
        bgMusic.play();
        playBTN.innerHTML = ('<i class="fas fa-volume-up"></i>');
    } else {
        muted = true;
        bgMusic.pause();
        playBTN.innerHTML = ('<i class="fas fa-volume-mute"></i>');
    }
};
playBTN.addEventListener('click', playMusic);

//-------------------------------------------sfx controls
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
    
    //-----------------------------flip card sfx
    flip() {
        if (!muted) {
        this.flipSound.play();
        }
    }
    //---------------------------cards match sfx
    match() {
        if (!muted) {
        this.matchSound.play();
        }
    }
    //-------------------------------victory sfx
    victory() {
        if (!muted) {
        this.victorySound.play();
        }
    }
    //-----------------------------game over sfx
    gameOver() {
        if (!muted) {
        this.gameOverSound.play();
        }
    }
}

//-------------------------------------------------------------------game logic
class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('guesses');
        this.stats = document.getElementById('stats');
        this.stats = stats;
        this.audioController = new AudioController();
    }
    //------------------------------------------------start game
    startGame() {
        this.cardToCheck = null;
        this.totalGuesses = 0;
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
        this.ticker.innerHTML = this.totalGuesses;
    }
    //-----------------------------------------------hide cards 
    hideCards() {
        this.cardsArray.forEach(cards => {
            cards.classList.remove('visible');
            cards.classList.remove('matched');
        });
    }
    //------------------------------------------------flip card
    flipCard(cards) {
        if(this.canFlipCard(cards)) {
            this.audioController.flip();
            cards.classList.add('visible');
            if(this.cardToCheck) {
                this.checkForCardMatch(cards);
            } else {
                this.cardToCheck = cards;
            }
        }
    }
    //-------------------------------------check if cards match
    checkForCardMatch(cards) {
        if(this.getCardType(cards) === this.getCardType(this.cardToCheck)) {
            this.cardMatch(cards, this.cardToCheck);
        } else {
            this.cardMisMatch(cards, this.cardToCheck);
        }
        this.cardToCheck = null;
        this.totalGuesses++;
        this.ticker.innerText = this.totalGuesses;
    }
    //-------------------------------------if cards are matched
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    //----------------------------------if cards are mismatched
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
    //-----------------------------------------starts countdown
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
    //-------------------------------------game over conditions
    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
    //---------------------------------------victory conditions
    victory() {
        clearInterval(this.countDown);
        this.audioController.victory();
        getName();
        document.getElementById('victory-text').classList.add('visible');
        this.stats.innerHTML = this.results();
    }

    results() {
        if (this.timeRemaining <= 49 || this.totalGuesses >= 26) {
            return `You won in ${this.timeRemaining} seconds and ${this.totalGuesses + 1} guesses!`;
        } else if (this.timeRemaining <= 59 || this.totalGuesses >= 21) {
            return `You won in ${this.timeRemaining} seconds and ${this.totalGuesses + 1} guesses!` + '<br>' + '<i class="fas fa-star">';
        } else if (this.timeRemaining <= 69 || this.totalGuesses >= 16) {
            return `You won in ${this.timeRemaining} seconds and ${this.totalGuesses + 1} guesses!` + '<br>' + '<i class="fas fa-star"><i class="fas fa-star"><i class="fas fa-star">';
        } else {
            return `You won in ${this.timeRemaining} seconds and ${this.totalGuesses + 1} guesses!` + '<br>' + '<i class="fas fa-star"><i class="fas fa-star"><i class="fas fa-star"><i class="fas fa-star"><i class="fas fa-star">';
        }
    }
    //----------------------------------------------reset game
    reset() {
        clearInterval(this.countDown);
        paused = !paused;
        this.startGame();
    }
    //----------------------------------------return home reset
    return() {
        clearInterval(this.countDown);
        paused = !paused;
    }
    //------------------------------logic for randomizing cards
    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }
    //------------------------------------------valid card flip
    canFlipCard(cards) {
        return !this.busy && !this.matchedCards.includes(cards) && cards !== this.cardToCheck;
    }
}

//-------------------------------------------------return home and continue game 
let returnHomeBTN = document.getElementById('return');
let returnHomeOverlay = Array.from(document.getElementsByClassName('return-home-overlay'));
const returnHomeVic = document.getElementById('return-home-vic');
const returnHomeGO = document.getElementById('return-home-GO');
const returnOverlay = document.getElementById('return-overlay');
const contGame = document.getElementById('cont-game');
const returnHome = document.getElementById('return-home');

returnHomeBTN.addEventListener('click', () => {
    returnOverlay.classList.toggle('visible');
    paused = !paused;
});
contGame.addEventListener('click', () => {
    returnOverlay.classList.toggle('visible');
    paused = !paused;
});

//---------------------------------------------------------------readying game
const ready = () => {

    const rulesPage = document.getElementById('rules');
    const gameOver = document.getElementById('game-over-text');
    const victory = document.getElementById('victory-text');
    const restartGO = document.getElementById('restart-gameover');
    const restartV = document.getElementById('restart-victory');
    const cards = Array.from(document.getElementsByClassName('card'));
    const startGame = document.getElementById('start-game');
    const resetBTN = document.getElementById('reset-game');
    const contGame = document.getElementById('continue-game');
    const activate = document.querySelectorAll('.inactive');
    const game = new MixOrMatch(100, cards);

    //------------------------------------------start game
    startGame.addEventListener('click', () => {
        rulesPage.classList.remove('visible');
        gameContainer.classList.remove('hidden');
        game.startGame();
    });
    //------------------------------------restart gameover
    restartGO.addEventListener('click', () => {
        gameOver.classList.remove('visible');
        game.startGame();
    });
    //-------------------------------------restart victory
    restartV.addEventListener('click', () => {
        victory.classList.remove('visible');
        game.startGame();
    });
    //------------------------------------------reset game
    resetBTN.addEventListener('click', () => {
        resetOverlay.classList.toggle('visible');
        game.reset();
    });
    //---------------------------------------continue game
    contGame.addEventListener('click', () => {
        resetOverlay.classList.toggle('visible');
        paused = !paused;
    });
    //----------------------------------return to homepage
    returnHome.addEventListener('click', () => {
        returnOverlay.classList.toggle('visible');
        welcomeOverlay.classList.toggle('visible');
        gameContainer.classList.add('hidden');
        game.return();
    });
    returnHomeOverlay.forEach(returnHomeOverlay => {
        returnHomeOverlay.addEventListener('click', () => {
            victory.classList.remove('visible');
            gameOver.classList.remove('visible');
            welcomeOverlay.classList.toggle('visible');
            gameContainer.classList.add('hidden');
            paused = !paused;
            game.return();
            });
    });
    //--------------------------------------activate icons
    activate.forEach(activate => {
        startGame.addEventListener('click', () => {
            activate.classList.remove('inactive');
        });
    });
    //-----------------------------------------flip cards
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}

ready();



