const game = {
  numberOfCards: 20,
  matchedCardCount: 0,
  count: 3,
  main: document.querySelector('main'),
  cards: document.querySelector('.game__cards'),
  card: document.querySelectorAll('.game__card'),
  clickedCard: null,
  clickedCard2: null,
  flipCount: 2,
  rand: null,
  init: () => {
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
    },1000);
    game.finish();
  },
  over: () => {
    setTimeout(() => {
      alert('Game over!');
      game.cards.classList.add('no-event');
    },1001);
    game.finish();
  },
  finish: () => {
    // const footer = document.createElement('footer');
    // const a = document.createElement('a');
    // a.innerText = 'Try again';
    // game.main.appendChild(footer);
    // footer.classList.add('footer');
    // footer.appendChild(a);
  }
}
document.addEventListener('DOMContentLoaded', game.init());
