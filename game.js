const game = {
  numberOfCards: 20,
  matchedCardCount: 0,
  count: 3,
  main: document.querySelector('main'),
  cards: document.querySelector('.game__cards'),
  card: document.querySelectorAll('.game__card'),
  restartButton: document.querySelector('#restart'),
  divCount: document.querySelector('#divCount'),
  clickedCard: null,
  clickedCard2: null,
  flipCount: 2,
  rand: null,
  init: () => {
    game.divCount.innerHTML = `Remaining right: ${game.count}`;
    game.card.forEach((value) => {
      game.shuffle(value);
      value.addEventListener('click', () => {
        if(game.flipCount == 1) {
          game.clickedCard2 = game.clickedCard;
        }
        game.clickedCard = value;
        game.rotate();
      });
    });
  },
  restart: () => {
    game.matchedCardCount = 0;
    game.count = 3;
    game.divCount.innerHTML = `Remaining right: ${game.count}`;
    game.cards.classList.remove('no-event');
    game.cards.classList.remove('d-none');
    game.restartButton.classList.add('d-none');
    game.card.forEach((value) => {
      game.shuffle(value);
      value.classList.remove('has-match');
    })
  },
  shuffle: (value) => {
    game.random();
    value.style.order = game.rand;
  },
  random: () => {
    game.rand = Math.floor(Math.random() * 500);
  },
  rotate: () => {
    game.clickedCard.classList.add('flipped');
    game.flipCount--;
    if(game.flipCount === 0) {
      game.flipCount = 2;
      game.cards.classList.add('no-event');
      game.control();
      setTimeout(() => {
        game.clickedCard.classList.remove('flipped');
        game.clickedCard2.classList.remove('flipped');
        game.cards.classList.remove('no-event');
      },1000);
    }
  },
  control: () => {
    if(game.clickedCard.getAttribute('data-animal') === game.clickedCard2.getAttribute('data-animal')) {
      return game.correct();
    }
    game.count--;
    game.divCount.innerHTML = `Remaining right: ${game.count}`;
    if(game.count === 0) {
      game.over();
    }
  },
  correct: () => {
    game.clickedCard.classList.add('has-match');
    game.clickedCard2.classList.add('has-match');
    game.matchedCardCount += 2;
    if (game.matchedCardCount === game.numberOfCards) {
      game.win();
    }
  },
  win: () => {
    setTimeout(() => {
      alert('Tebrikler!');
      game.finish();
    },1000);
  },
  over: () => {
    setTimeout(() => {
      alert('Game over!');
      game.cards.classList.add('no-event');
      game.finish();
    },1001);
  },
  finish: () => {
    game.cards.classList.add('d-none');
    game.restartButton.classList.remove('d-none');
    if(game.restartButton.addEventListener('click', () => {
      game.restart();
    }));
  }
}
document.addEventListener('DOMContentLoaded', game.init());
