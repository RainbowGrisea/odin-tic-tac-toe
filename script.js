// Start button clicked
// Player object created based on player names

const game = (function () {
  const table = [];
  const restartButton = document.querySelector('#restart-button');
  const playButton = document.querySelector('#play-button');
  const gameBoard = document.querySelector('.gameboard');
  let playerOne = {};
  let playerTwo = {};
  let activePlayer = {};

  function createPlayer(name) {
    const playerName = document.getElementById(`${name}`).value;
    const marker = name === 'playerOne' ? 'X' : '0';
    return { playerName, marker };
  }

  // Draw board
  function drawBoard() {
    for (let row = 0; row < 3; row++) {
      table[row] = [];
      for (let column = 0; column < 3; column++) {
        drawSquare(row, column);
      }
    }
  }
  // Draw each square
  function drawSquare(row, column) {
    const square = document.createElement('div');
    square.classList = 'square';
    square.id = `${row}-${column}`;
    gameBoard.appendChild(square);
  }

  // Add marker to array
  function drawMarker() {
    const [row, column] = this.id.split('-');
    table[row][column] = activePlayer.marker;
    draw.call(this);
    this.removeEventListener('click', drawMarker);
    // changePlayer();
  }

  // Draw the markers
  function draw() {
    this.textContent = activePlayer.marker;
  }

  function startGame() {
    playerOne = createPlayer('playerOne');
    playerTwo = createPlayer('playerTwo');
    activePlayer = playerOne;
    for (let row = 0; row < 3; row++) {
      table[row] = [];
      for (let column = 0; column < 3; column++) {
        addListener(row, column);
      }
    }
  }

  function restartGame() {}

  function addListener(row, column) {
    document
      .getElementById(`${row}-${column}`)
      .addEventListener('click', drawMarker);
  }

  (function initialise() {
    drawBoard();
    playButton.addEventListener('click', startGame);
    // restartButton.addEventListener('click', restartGame);
  })();

  return {
    table,
    startGame,
    createPlayer,
    playerOne,
    playerTwo,
    // restartGame,
  };
})();
