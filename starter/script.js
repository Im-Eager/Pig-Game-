'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`);

//Live results in the rounds
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);
//Buttons in the game interface
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);


let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

// Create a function to change the active player
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling the dice functionality
btnRoll.addEventListener(`click`, function () {

    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        //2. Display the dice
        diceEl.classList.remove(`hidden`);
        diceEl.src = `dice-${dice}.png`;
        //3. check for rolled 1, if true switch to another player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        // In case that the result is 1, switch to another player
        else {
            // Switch to the other player
            switchPlayer();
        }
    }
});

btnHold.addEventListener(`click`, function () {
    if (playing) {
        // 1. Add the current score to the score of the active player
        scores[activePlayer] += currentScore;

        // This is the same as what is above scores[i] = score[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. Check if player´s score is >= 100
        if (scores[activePlayer] >= 20) {
            // 3. If so, player wins the game
            playing = false;
            diceEl.classList.add(`hidden`);

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            // 4. If not, switch to the other player
            switchPlayer();
        }
    }
});


btnNew.addEventListener(`click`, init);


//document.querySelector(`.score--1`).textContent = 0;

// switch (randomNumberAttributionBtw1a6) {
//     case 1 =  ;
//     break;
//     case 2 = ;
//     break;
//     case 3 = ;
//     break;
//     case 4 = ;
//     break;
//     case 5 = ;
//     break;
//     case 6 = ;
//     break;
// }