'use strict';
const score0Pl = document.querySelector('#score--0'); //1 maniere de l ecrire
const score1Pl = document.getElementById('score--1'); // l autre maniere, pas besoin de mettre id parceque on cherche un id
const dicePlayer = document.querySelector('.dice');
const current0Pl = document.querySelector('#current--0'); //meme chose que en haut
const current1Pl = document.getElementById('current--1'); //meme chose que en haut
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

function switchPlayer() {
  //compteur a zero
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //switch joueur actif
  activePlayer = activePlayer === 0 ? 1 : 0;
  //switch classe pour indiquer le player actif
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

let currentScore, activePlayer, score, playing;

let init = () => {
  document.getElementById('name--0').textContent = 'PLAYER 1';
  document.getElementById('name--1').textContent = 'PLAYER 2';
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;
  score0Pl.textContent = 0;
  score1Pl.textContent = 0;
  current0Pl.textContent = 0;
  current1Pl.textContent = 0;
  dicePlayer.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

//dicePlayer.classList.add('hidden');       //pour voir le chiffre cacher

btnRoll.addEventListener('click', () => {
  //fonction random chiffre
  //trunc = entier, *6+1 = jusqu'a 6 en partant de 1
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    //dice random
    dicePlayer.classList.remove('hidden');
    dicePlayer.src = `dice-${dice}.png`;

    if (dice !== 1) {
      //si il fait pas 1
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //si il fait 1 (bloc du switch)
      switchPlayer();
    }
  }
});

// quand un joueur utilise hold

btnHold.addEventListener('click', () => {
  if (playing) {
    //selectionner l evenement click sur hold
    score[activePlayer] += currentScore; //additionne le current avec le score du joueur actif
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer]; // save le score du joueur actif

    if (score[activePlayer] >= 100) {
      //check si un joueur >= 100
      document.getElementById(`name--${activePlayer}`).textContent =
        "YOU'RE THE WINNER!";
      playing = false;
      dicePlayer.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //else switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init); //vue que c ets une const on a pas besoin de () pour l appeler
