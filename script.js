// gameboard object
// make it an IIFE since the gameboard only needs to be made/used once
const gameboard = (function () {
    // empty gameboard at start
    const board = ["", "", "", "", "", "", "", "", ""]

    // function to set the marker at a specific cell
    const setCell = (position, marker) => board[position] = "" + marker;
    // function to return the value of a cell in the board
    const getCell = (position) => board[position];

    return { setCell, getCell };
})();

// player object
function createPlayer (name, marker) {

    // set player name and marker
    const playerName = "" + name;
    const playerMarker = "" + marker;

    // set base score value, return score, and score increment function
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;

    return {playerName, playerMarker, getScore, increaseScore};
}

// gameflow object
function gameflow () {

}