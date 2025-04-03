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
    board.forEach((_,index, array) => {
        array[index] = "";
    });
  };

  return { setCell, getCell, clearBoard };
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

  let rounds = 0;

  while (rounds < 9) {
      // win conditions
  if (
    (
      gameboard.getCell(0) === markX &&
      gameboard.getCell(1) === markX &&
      gameboard.getCell(2) === markX
    ) || (
      gameboard.getCell(0) === markX &&
        gameboard.getCell(3) === markX &&
        gameboard.getCell(6) === markX
    ) || (
      gameboard.getCell(6) === markX &&
        gameboard.getCell(7) === markX &&
        gameboard.getCell(8) === markX
    ) || (
      gameboard.getCell(8) === markX &&
        gameboard.getCell(5) === markX &&
        gameboard.getCell(2) === markX
    ) || (
      gameboard.getCell(0) === markX &&
        gameboard.getCell(4) === markX &&
        gameboard.getCell(8) === markX
    ) || (
      gameboard.getCell(2) === markX &&
        gameboard.getCell(4) === markX &&
        gameboard.getCell(6) === markX
    ) || (
      gameboard.getCell(1) === markX &&
        gameboard.getCell(4) === markX &&
        gameboard.getCell(7) === markX
    ) || (
      gameboard.getCell(3) === markX &&
        gameboard.getCell(4) === markX &&
        gameboard.getCell(5) === markX
    )
  ) {
    console.log(player1.name + " Wins!");
    break;
  } else if (
    (
        gameboard.getCell(0) === markO &&
        gameboard.getCell(1) === markO &&
        gameboard.getCell(2) === markO
      ) || (
        gameboard.getCell(0) === markO &&
          gameboard.getCell(3) === markO &&
          gameboard.getCell(6) === markO
      ) || (
        gameboard.getCell(6) === markO &&
          gameboard.getCell(7) === markO &&
          gameboard.getCell(8) === markO
      ) || (
        gameboard.getCell(8) === markO &&
          gameboard.getCell(5) === markO &&
          gameboard.getCell(2) === markO
      ) || (
        gameboard.getCell(0) === markO &&
          gameboard.getCell(4) === markO &&
          gameboard.getCell(8) === markO
      ) || (
        gameboard.getCell(2) === markO &&
          gameboard.getCell(4) === markO &&
          gameboard.getCell(6) === markO
      ) || (
        gameboard.getCell(1) === markO &&
          gameboard.getCell(4) === markO &&
          gameboard.getCell(7) === markO
      ) || (
        gameboard.getCell(3) === markO &&
          gameboard.getCell(4) === markO &&
          gameboard.getCell(5) === markO
      )
  ) {
    console.log(player2.name + " Wins!");
    break;
  }
  let player1Choice;
  do {
        let player1Choice = prompt(player1.playerName + " Please choose a position");
        gameboard.setCell(parseInt(player1Choice), markX);
    } while (parseInt(player1Choice) < 0 || parseInt(player1Choice) > 8 || parseInt(player1Choice) === NaN);

    let player2Choice;
    do {
        let player2Choice = prompt(player2.playerName + " Please choose a position");
        gameboard.setCell(parseInt(player2Choice), markO);
    } while (parseInt(player2Choice) < 0 || parseInt(player2Choice) > 8 || parseInt(player2Choice) === NaN);
    
    // increment the round at the end of each round
    rounds++;
  }
  if (rounds = 9) {
    console.log ("It's a draw.");
  }
}
