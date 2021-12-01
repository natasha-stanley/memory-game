"use strict";

/*jshint esversion: 6 */


//for welcome page and level selection
function getName() {

    var name = document.getElementById('fname');
    var nameOutput = document.getElementById('fnameOutput');
    var enterBTN = document.getElementById('enter-button');
    var nameOutputVictory = document.getElementById('fnameOutputCongrats');
    enterBTN.addEventListener('click', storeData(), retrieveData(), false);

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
var levelSelection = document.getElementById('level-selection');

enterBTN.addEventListener('click', () => {
        welcomeOverlay.classList.toggle('visible');
        getName();
        levelSelection.classList.toggle('visible');

});



//for audio controls
class AudioController {
    constructor() {
        this.bgMusic = new Audio('static/audio/Sci-fi-Pulse-Loop.mp3');
        this.flipSound = new Audio('static/audio/card-flip.mp3');
        this.matchSound = new Audio('static/audio/card-match.mp3');
        this.victorySound = new Audio('static/audio/game-win.mp3');
        this.gameOverSound = new Audio('static/audio/game-over.mp3');
        this.flipSound.volume = 0.15;
        this.matchSound.volume = 0.15;
        this.victorySound.volume = 0.15;
        this.gameOverSound.volume = 0.15;
        //this.flipSound = flipSound;
    }

    stopMusic() {
        this.flipSound.pause();
        this.matchSound.pause();
        this.victorySound.pause();
        this.gameOverSound.pause();
    }

    flip() {
        this.flipSound.play();
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

//for bgMusic toggle
var audio = document.getElementById('audio');
var playPauseBTN = document.getElementById('playPauseBTN');
var count = 0;

function playPause() {

    if(count == 0){
        count = 1;
        audio.play();
        audio.volume = 0.08;
        audio.loop = true;
        playPauseBTN.innerHTML = ('<i class="fas fa-volume-up"></i>');
    } else {
        count = 0;
        audio.pause();
        playPauseBTN.innerHTML = ('<i class="fas fa-volume-mute"></i>');
    }
}


//for standard game logic
class MixOrMatchStandard {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    startGameStandard() {
        this.cardToCheck = null;
        this.totalClicks = 50;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    hideCards() {
        this.cardsArray.forEach(cards => {
            cards.classList.remove('visible');
            cards.classList.remove('matched');
        });
    }

    flipCard(cards) {
        if(this.canFlipCardStandard(cards)) {
            this.audioController.flip();
            this.totalClicks--;
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
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;

            if(this.totalClicks=== 0)
                this.gameOver();

            if(this.timeRemaining === 0)
                this.gameOver();
            }, 1000);
    }

    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-text-standard').classList.add('visible');
    }

    victory() {
        clearInterval(this.countDown);
        this.audioController.victory();
        document.getElementById('victory-text-standard').classList.add('visible');
    }

    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCardStandard() {
        return this.busy !== this.cardToCheck;
    }

    /*canFlipCard(cards) {
        return !this.busy && !this.matchedCards.includes(cards) && cards !== this.cardToCheck;
    }*/

}

//for hard game logic
class MixOrMatchHard {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    startGameHard() {
        this.cardToCheck = null;
        this.totalClicks = 40;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    hideCards() {
        this.cardsArray.forEach(cards => {
            cards.classList.remove('visible');
            cards.classList.remove('matched');
        });
    }

    flipCard(cards) {
        if(this.canFlipCardHard(cards)) {
            this.audioController.flip();
            this.totalClicks--;
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
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;

            if(this.totalClicks=== 0)
                this.gameOver();

            if(this.timeRemaining === 0)
                this.gameOver();
            }, 1000);
    }

    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-text-hard').classList.add('visible');
    }

    victory() {
        clearInterval(this.countDown);
        this.audioController.victory();
        document.getElementById('victory-text-hard').classList.add('visible');
    }

    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCardHard() {
        return this.busy !== this.cardToCheck;
    }

    /*canFlipCard(cards) {
        return !this.busy && !this.matchedCards.includes(cards) && cards !== this.cardToCheck;
    }*/

}

//for nightmare game logic
class MixOrMatchNightmare {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    startGameNightmare() {
        this.cardToCheck = null;
        this.totalClicks = 30;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    hideCards() {
        this.cardsArray.forEach(cards => {
            cards.classList.remove('visible');
            cards.classList.remove('matched');
        });
    }

    flipCard(cards) {
        if(this.canFlipCardNightmare(cards)) {
            this.audioController.flip();
            this.totalClicks--;
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
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;

            if(this.totalClicks=== 0)
                this.gameOver();

            if(this.timeRemaining === 0)
                this.gameOver();
            }, 1000);
    }

    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-text-nightmare').classList.add('visible');
    }

    victory() {
        clearInterval(this.countDown);
        this.audioController.victory();
        document.getElementById('victory-text-nightmare').classList.add('visible');
    }

    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCardNightmare() {
        return this.busy !== this.cardToCheck;
    }

    /*canFlipCard(cards) {
        return !this.busy && !this.matchedCards.includes(cards) && cards !== this.cardToCheck;
    }*/
}


//for starting standard game
function standGame() {
    let sGame = document.getElementById('standard-game');
    let levelOverlay = document.getElementById('level-selection');
    let gameOverOverlay = document.getElementById('game-over-text-standard');
    let victoryOverlay = document.getElementById('victory-text-standard');
    let restartStandardGameOver = document.getElementById('restart-gameover-standard');
    let restartStandardVictory = document.getElementById('restart-victory-standard');
    let returnLevelGameOver = document.getElementById('return-level-gameover-standard');
    let returnLevelVictory = document.getElementById('return-level-victory-standard');
    let cards = Array.from(document.getElementsByClassName('card'));
    let standardGame = new MixOrMatchStandard(5, cards);

    sGame.addEventListener('click', () => {
        levelOverlay.classList.toggle('visible');
        standardGame.startGameStandard();
    });

    cards.forEach((cards => {
        cards.addEventListener('click', () => {
            standardGame.flipCard(cards);
        });
    }));

    restartStandardVictory.addEventListener('click', () => {
        victoryOverlay.classList.toggle('visible');
        standardGame.startGameStandard();
    });

    restartStandardGameOver.addEventListener('click', () => {
        gameOverOverlay.classList.toggle('visible');
        standardGame.startGameStandard();
    });

    returnLevelGameOver.addEventListener('click', () => {
        gameOverOverlay.classList.toggle('visible');
        levelOverlay.classList.toggle('visible');
    });

    returnLevelVictory.addEventListener('click', () => {
        victoryOverlay.classList.toggle('visible');
        levelOverlay.classList.toggle('visible');
    });
}

//for starting hard game
function hardGame() {
    let hGame = document.getElementById('hard-game');
    let levelOverlay = document.getElementById('level-selection');
    let gameOverOverlay = document.getElementById('game-over-text-hard');
    let victoryOverlay = document.getElementById('victory-text-hard');
    let restartHardGameOver = document.getElementById('restart-gameover-hard');
    let restartHardVictory = document.getElementById('restart-victory-hard');
    let returnLevelGameOver = document.getElementById('return-level-gameover-hard');
    let returnLevelVictory = document.getElementById('return-level-victory-hard');
    let cards = Array.from(document.getElementsByClassName('card'));
    let hardGame = new MixOrMatchHard(6, cards);

    hGame.addEventListener('click', () => {
        levelOverlay.classList.toggle('visible');
        hardGame.startGameHard();
    });

    cards.forEach(cards => {
        cards.addEventListener('click', () => {
            hardGame.flipCard(cards);
        });
    });

    restartHardVictory.addEventListener('click', () => {
        victoryOverlay.classList.toggle('visible');
        hardGame.startGameHard();
    });

    restartHardGameOver.addEventListener('click', () => {
        gameOverOverlay.classList.toggle('visible');
        hardGame.startGameHard();
    });

    returnLevelGameOver.addEventListener('click', () => {
        gameOverOverlay.classList.toggle('visible');
        levelOverlay.classList.toggle('visible');
    });

    returnLevelVictory.addEventListener('click', () => {
        victoryOverlay.classList.toggle('visible');
        levelOverlay.classList.toggle('visible');
    });
}

//for starting nightmare game
function nightmareGame() {
    let nGame = document.getElementById('nightmare-game');
    let levelOverlay = document.getElementById('level-selection');
    let gameOverOverlay = document.getElementById('game-over-text-nightmare');
    let victoryOverlay = document.getElementById('victory-text-nightmare');
    let restartNightmareGameOver = document.getElementById('restart-gameover-nightmare');
    let restartNightmareVictory = document.getElementById('restart-victory-nightmare');
    let returnLevelGameOver = document.getElementById('return-level-gameover-nightmare');
    let returnLevelVictory = document.getElementById('return-level-victory-nightmare');
    let cards = Array.from(document.getElementsByClassName('card'));
    let nightmareG = new MixOrMatchNightmare(7, cards);

    nGame.addEventListener('click', () => {
        levelOverlay.classList.toggle('visible');
        nightmareG.startGameNightmare();
    });

    cards.forEach(cards => {
        cards.addEventListener('click', () => {
            nightmareG.flipCard(cards);
        });
    });

    restartNightmareVictory.addEventListener('click', () => {
        victoryOverlay.classList.toggle('visible');
        nightmareG.startGameNightmare();
    });

    restartNightmareGameOver.addEventListener('click', () => {
        gameOverOverlay.classList.toggle('visible');
        nightmareG.startGameNightmare();
    });

    returnLevelGameOver.addEventListener('click', () => {
        gameOverOverlay.classList.toggle('visible');
        levelOverlay.classList.toggle('visible');
    });

    returnLevelVictory.addEventListener('click', () => {
        victoryOverlay.classList.toggle('visible');
        levelOverlay.classList.toggle('visible');
    });
}

/*function levelPageStandard(){
    var levelPage = document.getElementById('level-selection');
    var gameOverOverlay = document.getElementById('game-over-text-standard');
    var cards = Array.from(document.getElementsByClassName('card'));
    var clearGame = new MixOrMatchStandard(80, cards);

    levelPage.classList.toggle('visible');
    gameOverOverlay.classList.toggle('visible');
    clearGame.startGame();
}*/

/*function resetStandardGame() {
    var restartBTNGameOver = document.getElementById('restart-gameover-standard');
    var restartBTNVictory = document.getElementById('restart-victory-standard');
    let gameOverOverlay = document.getElementById('game-over-text');
    var cards = Array.from(document.getElementsByClassName('card'))
    var standardGame = new MixOrMatch(80, cards);

    restartBTNVictory.addEventListener('click', () => {
        gameOverOverlay.classList.toggle('visible');
        standardGame.startGame();
    });

    restartBTNGameOver.addEventListener('click', () => {
        standardGame.startGame();
    });
}*/

/*function levelPageHard(){
    var levelPage = document.getElementById('level-selection');
    var gameOverOverlay = document.getElementById('game-over-text');
    var cards = Array.from(document.getElementsByClassName('card'))
    var clearGameH = new MixOrMatch(80, cards);

    levelPage.classList.toggle('visible');
    gameOverOverlay.classList.toggle('visible');
    clearGameH.startGameHard();
}*/

/*function resetHardGame() {
    var restartBTNGameOver = document.getElementById('restart-gameover-hard');
    var restartBTNVictory = document.getElementById('restart-victory-hard');
    let gameOverOverlay = document.getElementById('game-over-text');
    var cards = Array.from(document.getElementsByClassName('card'))
    var hardGame = new MixOrMatch(80, cards);

    restartBTNVictory.addEventListener('click', () => {
        gameOverOverlay.classList.toggle('visible');
        hardGame.startGameHard();
    });

    restartBTNGameOver.addEventListener('click', () => {
        hardGame.startGameHard();
    });
}*/

/*function levelPageNightmare(){
    var levelPage = document.getElementById('level-selection');
    var gameOverOverlay = document.getElementById('game-over-text-nightmare');
    var cards = Array.from(document.getElementsByClassName('card'))
    var clearGameN = new MixOrMatchNightmare(5, cards);

    levelPage.classList.toggle('visible');
    gameOverOverlay.classList.toggle('visible');
    clearGameN.startGameNightmare();
}*/

/*function resetNightmareGame() {
    var restartBTNGameOver = document.getElementById('restart-gameover-nightmare');
    var restartBTNVictory = document.getElementById('restart-victory-nightmare');
    let gameOverOverlay = document.getElementById('game-over-text-nightmare');
    var cards = Array.from(document.getElementsByClassName('card'))
    var nightmareGame = new MixOrMatchNightmare(5, cards);

    restartBTNVictory.addEventListener('click', () => {
        gameOverOverlay.classList.toggle('visible');
        nightmareGame.startGameNightmare();
    })

    restartBTNGameOver.addEventListener('click', () => {
        nightmareGame.startGameNightmare();
    });
}*/



//for info overlay toggle
let infoOverlay = document.getElementById('info-overlay');
let infoButton = document.getElementById('toggle');
infoButton.addEventListener('click', () => {
    infoOverlay.classList.toggle('visible');
});



//for readying document
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', standGame(), hardGame(), nightmareGame());
} else {
    standGame();
    hardGame();
    nightmareGame();
}



/*
//for game logic
class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 50;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    startGameHard() {
        this.cardToCheck = null;
        this.totalClicks = 40;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    startGameNightmare() {
        this.cardToCheck = null;
        this.totalClicks = 30;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
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
            this.totalClicks--;
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
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;

            if(this.totalClicks=== 0)
                this.gameOver();

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
        document.getElementById('victory-text').classList.add('visible');
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
*/



/*
//for startGame
function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}*/

//for starting game
/*function ready() {
    var standardGame = (document.getElementById('standard-game'));
    var levelOverlay = (document.getElementById('level-selection'));
    var cards = Array.from(document.getElementsByClassName('card'));
    var game = new MixOrMatch(100, cards);
    standardGame.addEventListener('click', startStandardGame(), false)

            function startStandardGame() {
                levelOverlay.classList.remove('visible');
                game.startGame();

            };

            cards.forEach(card => {
                card.addEventListener('click', () => {
                    game.flipCard(card);
                });
            });
};*/

/*function restartGame() {
    let restartGameOverBTN = document.getElementById('restart-gameover');
    let restartVictoryBTN = document.getElementById('restart-victory');
    let levelSelection = document.getElementById('level-selection');
    let overlay = document.getElementById('overlay-text');

    restartGameOverBTN.addEventListener('click', () => {
        overlay.classList.toggle('visible');
    });

    restartGameOverBTN.addEventListener('click', () => {
        levelSelection.classList.toggle('visible');
    })
}*/

/*class standGame {
    constructor() {
        this.sGame = document.getElementById('standard-game');
        this.levelOverlay = document.getElementById('level-selection');
        this.victoryOverlay = document.getElementById('victory-text');
        this.gameOverOverlay = document.getElementById('game-over-text');
        this.restartVictory = document.getElementById('restart-victory');
        this.restartGameOver = document.getElementById('restart-gameover');
        //let returnLevelVictory = document.getElementById('return-level-victory');
        this.cards = document.getElementsByClassName('card');
        this.standardGame = new MixOrMatch(5, this.cards);
    }

    newSGame() {
        sGame.addEventListener('click', () => {
            levelOverlay.classList.toggle('visible');
            standardGame.startGame();
        });
    }

    card() {
        cards.forEach(card => {
            card.addEventListener('click', () => {
                standardGame.flipCard(card);
            });
        });
    }

    restartVictory(){
        restartVictory.addEventListener('click', () => {
            victoryOverlay.classList.toggle('visible');
            new standardGame.startGame();
        });
    }

    restartGameOver() {
        restartGameOver.addEventListener('click', () => {
            gameOverOverlay.classList.toggle('visible');
            return standardGame.startGame();
        });
    }

    returnLevelVictory.addEventListener('click', () => {
        levelOverlay.classList.toggle('visible');
    });
}*/

