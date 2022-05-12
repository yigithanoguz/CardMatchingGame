const game = {
  numberOfCards: 20,
  matchedCardCount: 0,
  count: 3,
  card: document.querySelectorAll('.game__card'),
  clickedCard: null,
  clickedCard2: null,
  flipCount: 2,
  init: () => {
    Array.from(game.card).forEach((value) => {
      value.addEventListener('click', () => {
        if(game.flipCount == 1) {
          game.clickedCard2 = game.clickedCard;
        }
        game.clickedCard = value;
        game.rotate();
      });
    });
  },
  rotate: () => {
    game.clickedCard.classList.add('flipped');
    game.flipCount--;
    if(game.flipCount === 0) {
      game.flipCount = 2;
      game.control();
      setTimeout(() => {
        game.clickedCard.classList.remove('flipped');
        game.clickedCard2.classList.remove('flipped');
      },1000);
    }
  },
  control: () => {
    if(game.clickedCard.getAttribute('data-animal') === game.clickedCard2.getAttribute('data-animal')) {
      return game.correct();
    }
    game.count --;
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
  },
  over: () => {
    document.querySelector('.game__cards').classList.add('no-event');
    setTimeout(() => {
      alert('Game over!');
    },1000);
  }
}
document.addEventListener('DOMContentLoaded', game.init());
