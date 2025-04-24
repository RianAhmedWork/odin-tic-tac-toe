// gameboard object
// make it an IIFE since the gameboard only needs to be made/used once
const gameboard = (function () {
  // empty gameboard at start
  const board = ["", "", "", "", "", "", "", "", ""];

  // function to set the marker at a specific cell
  const setCell = (position, marker) => (board[position] = "" + marker);
  // function to return the value of a cell in the board
  const getCell = (position) => board[position];
  // function to clear the board
  const clearBoard = () => {
    board.forEach((_, index, array) => {
      array[index] = "";
    });
  };
  // function to get the whole board
  const getBoard = () => board + "";

  return { setCell, getCell, clearBoard, getBoard };
})();

// player object
function createPlayer(name, marker) {
  // set player name and marker
  const playerName = "" + name;
  const playerMarker = "" + marker;

  // set base score value, return score, and score increment function
  let score = 0;
  const getScore = () => score;
  const increaseScore = () => score++;

  return { playerName, playerMarker, getScore, increaseScore };
}

// gameflow object
function gameflow(name1, name2) {
  // create the x and o markers
  const markX = "X";
  const markO = "O";

  // create the player objects with the markers
  const player1 = createPlayer(name1, markX);
  const player2 = createPlayer(name2, markO);

  // initialize the number of rounds
  let rounds = 0;

  function nextRound() {
    rounds++;
  }

  function returnRounds() {
    return rounds;
  }

  function resetRounds() {
    rounds = 0;
  }

  function startGame() {
    displayGame.setSpot(this);
  }

  // play the game till a winner is decided
  function playGame() {
    // play the game until all rounds or a winner is decided
    if (rounds % 2 === 0) {
      displayGame.showGameText(player1.playerName, 0);
    } else if (rounds % 2 === 1) {
      displayGame.showGameText(player2.playerName, 0);
    }
    if (checkWinCondition() === markX) {
      displayGame.disableSpots();
      displayGame.showGameText(player1.playerName, 1);
    } else if (checkWinCondition() === markO) {
      displayGame.disableSpots();
      displayGame.showGameText(player2.playerName, 1);
    } else if (rounds === 9) {
      displayGame.disableSpots();
      displayGame.showGameText(player1.playerName, 2);
    }
  }

  // function to check if a player has won
  function checkWinCondition() {
    if (
      (gameboard.getCell(0) === markX &&
        gameboard.getCell(1) === markX &&
        gameboard.getCell(2) === markX) ||
      (gameboard.getCell(0) === markX &&
        gameboard.getCell(3) === markX &&
        gameboard.getCell(6) === markX) ||
      (gameboard.getCell(6) === markX &&
        gameboard.getCell(7) === markX &&
        gameboard.getCell(8) === markX) ||
      (gameboard.getCell(8) === markX &&
        gameboard.getCell(5) === markX &&
        gameboard.getCell(2) === markX) ||
      (gameboard.getCell(0) === markX &&
        gameboard.getCell(4) === markX &&
        gameboard.getCell(8) === markX) ||
      (gameboard.getCell(2) === markX &&
        gameboard.getCell(4) === markX &&
        gameboard.getCell(6) === markX) ||
      (gameboard.getCell(1) === markX &&
        gameboard.getCell(4) === markX &&
        gameboard.getCell(7) === markX) ||
      (gameboard.getCell(3) === markX &&
        gameboard.getCell(4) === markX &&
        gameboard.getCell(5) === markX)
    ) {
      return "X";
    } else if (
      (gameboard.getCell(0) === markO &&
        gameboard.getCell(1) === markO &&
        gameboard.getCell(2) === markO) ||
      (gameboard.getCell(0) === markO &&
        gameboard.getCell(3) === markO &&
        gameboard.getCell(6) === markO) ||
      (gameboard.getCell(6) === markO &&
        gameboard.getCell(7) === markO &&
        gameboard.getCell(8) === markO) ||
      (gameboard.getCell(8) === markO &&
        gameboard.getCell(5) === markO &&
        gameboard.getCell(2) === markO) ||
      (gameboard.getCell(0) === markO &&
        gameboard.getCell(4) === markO &&
        gameboard.getCell(8) === markO) ||
      (gameboard.getCell(2) === markO &&
        gameboard.getCell(4) === markO &&
        gameboard.getCell(6) === markO) ||
      (gameboard.getCell(1) === markO &&
        gameboard.getCell(4) === markO &&
        gameboard.getCell(7) === markO) ||
      (gameboard.getCell(3) === markO &&
        gameboard.getCell(4) === markO &&
        gameboard.getCell(5) === markO)
    ) {
      return "O";
    }
  }

  return { playGame, nextRound, startGame, rounds, returnRounds, resetRounds };
}

// display logic/dom object
const displayGame = (function () {
  const spots = document.querySelectorAll(".game-button");
  const nameDialog = document.getElementById("name-dialog");
  const submitButton = document.getElementById("submit-button");
  const playerOneName = document.getElementById("player-one-name");
  const playerTwoName = document.getElementById("player-two-name");
  const endDialog = document.getElementById("endgame-dialog");
  const gameResult = document.getElementById("game-result-text");
  const restartButton = document.getElementById("restart-button");

  restartButton.addEventListener("click", function () {
    location.reload();
  });

  submitButton.addEventListener("click", function () {
    if (playerOneName.value === "" || playerTwoName.value === "") {
      alert("please fill in both the boxes");
    } else if (playerOneName.value === playerTwoName.value) {
      alert("both players cannot have the same name");
    } else {
      nameDialog.remove();
      const newGame = gameflow(playerOneName.value, playerTwoName.value);
      newGame.startGame();
      newGame.playGame();
    }
  });

  function showNameDialog() {
    nameDialog.showModal();
  }

  function showEndDialog() {
    endDialog.showModal();
  }

  // sets the content of the grid and makes it unclickable
  function setSpot(game) {
    spots.forEach((spot, index) => {
      spot.addEventListener("click", function () {
        if (game.returnRounds() % 2 === 0) {
          spot.textContent = "X";
          gameboard.setCell(index, "X");
          game.nextRound();
          game.playGame();
        } else if (game.returnRounds() % 2 === 1) {
          spot.textContent = "O";
          gameboard.setCell(index, "O");
          game.nextRound();
          game.playGame();
        }
        spot.setAttribute("disabled", true);
      });
    });
  }

  // clear the dom grid and sets the buttons to be clickable
  function clearBoard() {
    spots.forEach((spot) => {
      spot.textContent = "";
      spot.removeAttribute("disabled");
    });
    gameboard.clearBoard();
  }

  // show who's turn it is or the winner of the game
  function showGameText(playerName, num) {
    const gameText = document.getElementById("game-text");
    if (num === 0) {
      gameText.textContent = playerName + "'s turn";
    } else if (num === 1) {
      gameResult.textContent = playerName + " has won";
      showEndDialog();
      gameText.textContent = playerName + " has won";
    } else if (num === 2) {
      gameResult.textContent = "It is a draw";
      showEndDialog();
      gameText.textContent = "It is a draw";
    }
  }

  // disable all buttons from being clickable
  function disableSpots() {
    spots.forEach((spot) => {
      spot.setAttribute("disabled", true);
    });
  }

  return { setSpot, clearBoard, showGameText, disableSpots, showNameDialog };
})();

displayGame.showNameDialog();
