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

  // play the game till a winner is decided
  function playGame() {
    // number of rounds in a game
    let rounds = 0;
    // play the game until all rounds or a winner is decided
    while (rounds < 9) {
      // ask player 1 for their choice
      let player1Choice = parseInt(
        prompt(player1.playerName + " please chose a position")
      );
      while (player1Choice === NaN || player1Choice > 8 || player1Choice < 0 || gameboard.getCell(player1Choice) !== "") {
        player1Choice = parseInt(
          prompt(player1.playerName + ", please enter a number from 0 to 8")
        );
      }
      // set the choice of player 1 and check if there is a win
      gameboard.setCell(player1Choice, markX);
      displayGame.setSpot(player1Choice, markX);
      if (checkWinCondition() === markX) {
        console.log(player1.playerName + " Has Won!");
        break;
      }
      // increase the round and end the game if round limit is reached
      rounds++;
      if (rounds === 9) {
        break;
      }

      // ask player 2 for their choice
      let player2Choice = parseInt(
        prompt(player2.playerName + " please choose a position")
      );
      while (player2Choice === NaN || player2Choice > 8 || player2Choice < 0 || gameboard.getCell(player2Choice) !== "") {
        player2Choice = parseInt(
          prompt(player2.playerName + ", please enter a number from 0 to 8")
        );
      }
      // set the choice of the player 2 and check if there is a win
      gameboard.setCell(player2Choice, markO);
      displayGame.setSpot(player2Choice, markO);
      if (checkWinCondition() === markO) {
        console.log(player2.playerName + " Has Won!");
        break;
      }
      // increase the round
      rounds++;
    }

    // if all rounds are played then and there is no winner the game is a draw
    if (rounds === 9) {
      console.log("It is a draw between " + player1.playerName + " and " + player2.playerName);
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

  return { playGame };
}

// display logic/dom object
const displayGame = (function() {
  const spots = document.querySelectorAll(".game-button");

  // sets the content of the grid and makes it unclickable
  function setSpot(playerChoice, marker) {
    spots[playerChoice].textContent = marker+"";
    spots[playerChoice].setAttribute("disabled", true);
  }

  // clear the dom grid and sets the buttons to be clickable
  function clearBoard() {
    spots.forEach((_, index, array) => {
      array[index].textContent = "";
      array[index].removeAttribute("disabled");
    });
  }

  return { setSpot, clearBoard }
})();