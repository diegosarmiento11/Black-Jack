/**
 * 2C = Two of clubs
 * 2D = Two of diamonds
 * 2H = Two of hearts
 * 2S = Two of shapes
 */

(() => {
  // Local variables scope

  let deck = [],
    tipos = ["C", "D", "H", "S"],
    special = ["J", "A", "Q", "K"],
    playersScore = [];

  // HTML references

  const requestCard = document.querySelector("#getCard"),
    stopCard = document.querySelector("#stop"),
    newGame = document.querySelector("#newGame"),
    updateScore = document.querySelectorAll("small");

  let divCards = document.querySelectorAll(".divCards");

  const startGame = (numPlayers = 2) => {
    deck = createDeck();
    playersScore = [];
    for (let i = 0; i < numPlayers; i++) {
      playersScore.push(0);
    }
  };

  // Create, get and summ Card values

  const createDeck = () => {
    deck = [];
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

    return _.shuffle(deck);
  };

  const getShuffleDeck = () => {
    if (deck.length === 0) {
      throw "Ya no hay más cartas";
    }
    return deck.pop();
  };

  const getCardValue = (card) => {
    let cardValue = card.substring(0, card.length - 1);
    return isNaN(cardValue) ? (cardValue === "A" ? 11 : 10) : cardValue * 1;
  };

  // 0 computer turn, 1 player turn

  const collectPlayersScore = (card, playerTurn) => {
    playersScore[playerTurn] = playersScore[playerTurn] + getCardValue(card);
    updateScore[playerTurn].innerText = playersScore[playerTurn];

    return playersScore[playerTurn];
  };

  const createCard = (card, turn) => {
    const cardImage = document.createElement("img");
    cardImage.src = `assets/cartas/${card}.png`;
    cardImage.classList.add("cartas");
    divCards[turn].append(cardImage);
  };

  const setWinner = () => {
    const [puntosMinimos, puntosComputadora] = playersScore;

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie gana :(");
      } else if (puntosMinimos > 21) {
        alert("Computadora gana");
      } else if (puntosComputadora > 21) {
        alert("Jugador Gana");
      } else {
        alert("Computadora Gana");
      }
    }, 100);
  };

  const computerTurn = (minPoints) => {
    let computerScore = 0;

    do {
      const card = getShuffleDeck();

      computerScore = collectPlayersScore(card, playersScore.length - 1);
      createCard(card, playersScore.length - 1);
    } while (computerScore < minPoints && minPoints <= 21);
    setWinner();
  };

  // Click events

  requestCard.addEventListener("click", () => {
    const card = getShuffleDeck();

    let playerScore = collectPlayersScore(card, 0);

    createCard(card, 0);

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
    computerTurn(playersScore[0]);
  });

  newGame.addEventListener("click", () => {
    startGame();
  });
  // Events

  return {
    nuevoJuego: startGame,
  };
})();
