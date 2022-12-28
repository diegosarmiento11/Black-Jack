/**
 * 2C = Two of clubs
 * 2D = Two of diamonds
 * 2H = Two of hearts
 * 2S = Two of shapes
 */

// Local variables scope

let deck = [];
let tipos = ["C", "D", "H", "S"];
let special = ["J", "A", "Q", "K"];
let maximumNumberOfDeck = 53;
let playerScore = 0;
computerScore = 0;

// HTML references

const requestCard = document.querySelector("#getCard");
const stopCard = document.querySelector("#stop");
const newGame = document.querySelector("#newGame");
const updateScore = document.querySelectorAll("small");
let divPlayerCards = document.querySelector("#cards-player");
let divComputerCards = document.querySelector("#computer-player");

// Create, get and summ Card values

const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let esp of special) {
    for (let tipo of tipos) {
      deck.push(esp + tipo);
    }
  }
  deck = _.shuffle(deck);
  return deck;
};

createDeck();

const getShuffleDeck = () => {
  const card = deck.pop();

  if (deck.length === 0) {
    throw "Ya no hay más cartas";
  }
  return card;
};

const getCardValue = (card) => {
  let cardValue = card.substring(0, card.length - 1);
  let score = 0;
  if (isNaN(cardValue)) {
    score = cardValue === "A" ? 11 : 10;
  } else {
    score = cardValue * 1;
  }
  return score;
};

const computerTurn = (minPoints) => {
  do {
    const card = getShuffleDeck();

    computerScore = computerScore + getCardValue(card);
    updateScore[1].innerText = computerScore;

    const cardImage = document.createElement("img");

    cardImage.src = `assets/cartas/${card}.png`;
    cardImage.classList.add("cartas");
    divComputerCards.append(cardImage);

    if (minPoints > 21) {
      break;
    }
  } while (computerScore < minPoints && minPoints <= 21);

  setTimeout(() => {
    if (computerScore > minPoints && computerScore <= 21) {
      alert("la computadora ganó");
    } else if (computerScore === minPoints) {
      alert("empate");
    } else {
      alert("Jugador uno ganó");
    }
  }, 100);
};

// Click events

requestCard.addEventListener("click", () => {
  const card = getShuffleDeck();

  playerScore = playerScore + getCardValue(card);
  updateScore[0].innerText = playerScore;

  const cardImage = document.createElement("img");
  cardImage.src = `assets/cartas/${card}.png`;
  cardImage.classList.add("cartas");
  divPlayerCards.append(cardImage);

  if (playerScore >= 22) {
    requestCard.disabled = true;
    computerTurn(playerScore);
  } else if (playerScore === 21) {
    requestCard.disabled = true;
    computerTurn(playerScore);
  }
});

stopCard.addEventListener("click", () => {
  requestCard.disabled = true;
  stopCard.disabled = true;
  computerTurn(playerScore);
});

newGame.addEventListener("click", () => {
  deck = [];
  deck = createDeck();

  playerScore = 0;
  computerScore = 0;

  updateScore[0].innerText = 0;
  updateScore[1].innerText = 0;

  divPlayerCards.innerText = "";
  divComputerCards.innerText = "";

  requestCard.disabled = false;
  stopCard.disabled = false;
});
// Events
