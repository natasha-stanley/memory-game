"use strict";

//const { faMicrochip } = require("@fortawesome/free-solid-svg-icons");

/*jshint esversion: 6 */


//for welcome page and level selection
function getName() {

    var name = document.getElementById('fname');
    var nameOutput = document.getElementById('fnameOutput');
    var enterBTN = document.getElementById('enter-button');
    var nameOutputVictory = document.getElementById('fnameOutputCongrats');

    enterBTN.addEventListener('click', storeData(), retrieveData(), false);

    $("#get-username").submit(function(e) {
        e.preventDefault(); //stop page refresh
    });
    

    /*enterBTN.addEventListener('click', () => {
        storeData();
        retrieveData();
        
    });*/
    

    function storeData() {
        localStorage.name = name.value;
    }

    function retrieveData() {
        nameOutput.innerHTML = localStorage.name;
        nameOutputVictory.innerHTML = localStorage.name;
    }
}

var enterBTN = document.getElementById('enter-button');
var welcomeOverlay = document.getElementById('welcome-overlay');
var rulesPage = document.getElementById('rules');

enterBTN.addEventListener('click', () => {
        getName();
        welcomeOverlay.classList.toggle('visible');
        rulesPage.classList.toggle('visible');

});



/*var bgMusic = {
    scfiMusic: new Howl ({
        src: ['static/audio/Sci-fi-Pulse-Loop.mp3']
    })
}*/


//for audio controls
class AudioController {
    constructor() {
        //this.bgMusic = new Audio('static/audio/Sci-fi-Pulse-Loop.mp3');
        this.flipSound = new Audio('static/audio/card-flip.mp3');
        this.matchSound = new Audio('static/audio/card-match.mp3');
        this.victorySound = new Audio('static/audio/game-win.mp3');
        this.gameOverSound = new Audio('static/audio/game-over.mp3');
        //this.gameConfirm = new Audio('static/audio/confirmation.mp3');
        //this.musicToggle = document.getElementById('music-toggle');
        //this.playBTN = document.getElementById('music-toggle');
        //this.audio = document.getElementById('audio');
        this.musicCTRL = document.getElementById('music-ctrl');
        this.count = 0;
        //this.bgMusic.volume = 0.05;
        this.flipSound.volume = 0.15;
        this.matchSound.volume = 0.15;
        this.victorySound.volume = 0.15;
        this.gameOverSound.volume = 0.15;
    }

    /*startMusic() {
        this.bgMusic.play();
    }*/

    stopMusic() {
        //this.bgMusic.pause();
        this.flipSound.pause();
        this.matchSound.pause();
    }

    flip() {
        this.flipSound.play();
        /*if(this.musicToggle.innerHTML = ('<i class="fas fa-volume-mute"></i>')){
            this.flipSound.pause();
        } else {
            this.flipSound.play();
        }*/
    }

    match() {
        this.matchSound.play();
    }

    victory() {
        this.stopMusic();
        this.victorySound.play();
    }

    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

/*
let musicMute = document.getElementById('music-mute');
    let musicPlay = document.getElementById('music-play');
function musicToggle() {
    

    musicPlay.addEventListener('click', () => {
        musicPlay.classList.toggle('visible');
        musicMute.classList.toggle('hidden');
    });
}*/


/*
//howler audio here

var bgMusic = {
    music = new Howl ({
        src: 'static/audio/Sci-fi-Pulse-Loop.mp3'
    })
}

var playBTN = document.getElementById('music-toggle');*/

//for bgMusic toggle

let audio = document.getElementById('audio');
let playBTN = document.getElementById('music-ctrl');
//let muteBTN = document.getElementById('music-mute');
let bgMusic = new Audio('static/audio/Sci-fi-Pulse-Loop.mp3');
let count = 0;

function playMusic() {

    playBTN.addEventListener('click', () => {
        //muteBTN.classList.toggle('visible');
        //playBTN.classList.toggle('visible');
        if(count == 0){
            count = 1;
            bgMusic.play();
            bgMusic.volume = 0.05;
            bgMusic.loop = true;
            playBTN.innerHTML = ('<i class="fas fa-volume-up"></i>');
        } else {
            count = 0;
            bgMusic.pause();
            playBTN.innerHTML = ('<i class="fas fa-volume-mute"></i>');
        };
    });
}



/*
function playMusic() {
    var playBTN = document.getElementById('music-play');
    var muteBTN = document.getElementById('music-mute');

    

    muteBTN.addEventListener('click', () => {
        muteBTN.classList.toggle('visible');
        playBTN.classList.toggle('visible');
        music.bgMusic.play();
    })

}
*/


//for game logic
class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        //this.totalClicks = totalClicks;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.infoToggle = document.getElementById('toggle');
        this.musicToggle = document.getElementById('music-toggle');
        this.audioController = new AudioController();
        this.paused = false;
        //this.myInterval = -1;
    }

    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            //this.audioController.startMusic();
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
             if (!this.paused) {
                this.timeRemaining--;
                this.timer.innerText = this.timeRemaining;
             }
            
            this.infoToggle.addEventListener('click', () => {
                if (this.paused) {
                    console.log('paused = false');
                    this.paused = false;
                    
                } else {
                    console.log('paused = true');
                    this.paused = true;
                }
            });


            if(this.timeRemaining === 0)
                this.gameOver();
            }, 1000);
    }

    /*startCountDown() {
        this.infoToggle.addEventListener('click', (e) => {
            e.preventDefault();
            if(this.myInterval == -1) {
                this.myInterval = setInterval(() => {
                    this.myInterval = 0;
                    this.timeRemaining--;
                    this.timer.innerText = this.timeRemaining;
                }, 1000);
            } else {
                clearInterval(this.countDown);
                this.myInterval = -1;
            }
        });
   }*/


    /*restartCountdown() {
        if(this.infoToggle.classList === ('visible')){
            clearInterval(this.countDown);
        } else {
            return setInterval(() => {
                this.timeRemaining--;
                this.timer.innerText = this.timeRemaining;
            
            if(this.timeRemaining === 0)
                this.gameOver();
            }, 1000);
        }

        this.timeRemaining = setInterval(() => {
            this.timeRemaining++;
            this.timer.innerText = this.timeRemaining;
        });
    }*/

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
        if (this.totalTime >= 70 && this.totalTime <= 90 || this.totalClicks <= 30 && this.totalClicks >= 10) {
            document.getElementById('stats').innerHTML = 
            `You won in ${this.timeRemaining} seconds and ${this.totalClicks} flips!` + '<br>' + 
            '<i class="fas fa-star"><i class="fas fa-star"><i class="fas fa-star"><i class="fas fa-star"><i class="fas fa-star">';
        } else if (this.totalTime >= 50 && this.totalTime <= 70 && this.totalClicks <= 40 && this.totalClicks >= 30) {
            document.getElementById('stats').innerHTML = 
            `You won in ${this.timeRemaining} seconds and ${this.totalClicks} flips!` + '<br>' + 
            '<i class="fas fa-star"><i class="fas fa-star"><i class="fas fa-star">';
        } else if (this.totalTime >= 50 && this.totalTime <= 70 && this.totalClicks <= 50 && this.totalClicks >= 40) {
            document.getElementById('stats').innerHTML = 
            `You won in ${this.timeRemaining} seconds and ${this.totalClicks} flips!` + '<br>' + 
            '<i class="fas fa-star">';
        } else {
            document.getElementById('stats').innerHTML = 
            `You won in ${this.timeRemaining} seconds and ${this.totalClicks} flips!`;
        }
    }

    /*reset() {
        clearInterval(this.countDown);
        this.timeRemaining = 100;
        this.startGame();
    }*/

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


/*
//for info overlay toggle
let infoOverlay = document.getElementById('info-overlay');
let infoButton = document.getElementById('toggle');
infoButton.addEventListener('click', () => {
    infoOverlay.classList.toggle('visible');
});
*/

/*
//for reset game
let resetBTN = document.getElementById('reset');
let cards = Array.from(document.getElementsByClassName('card'));
let newGame = new MixOrMatch(100, cards);

resetBTN.addEventListener('click', () => {
    newGame.reset();
});
*/





function ready() {

    //let gameCard = document.getElementById('standard-game');
    let rulesPage = document.getElementById('rules');
    let gameOver = document.getElementById('game-over-text');
    let victory = document.getElementById('victory-text');
    let restartGO = document.getElementById('restart-gameover');
    let restartV = document.getElementById('restart-victory');
    let cards = Array.from(document.getElementsByClassName('card'));
    let startGame = document.getElementById('start-game');
    let resetBTN = document.getElementById('reset');
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
        game.reset();
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });

}
    
ready();
