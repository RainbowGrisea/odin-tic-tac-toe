// Start button clicked
// Player object created based on player names

const game = (function () {
  const resetButton = document.querySelector('#reset-button');
  const playButton = document.querySelector('#play-button');
  const gameboard = document.querySelector('.gameboard');
  let indicatorText = document.querySelector('.player-indicator');
  let table = [];
  let playerOne = {};
  let playerTwo = {};
  let activePlayer = {};
  let gameFinished;
  let turnCounter;

  // Player creation factory
  function createPlayer(name) {
    const playerName = document.getElementById(`${name}`).value;
    const marker = name === 'playerOne' ? 'X' : 'O';
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
  // Draw a square
  function drawSquare(row, column) {
    const square = document.createElement('div');
    square.classList = 'square';
    square.id = `${row}-${column}`;
    gameboard.appendChild(square);
  }

  // Making a move
  function makingAMove() {
    const [row, column] = this.id.split('-');
    if (Object.keys(activePlayer).length === 0 || gameFinished) {
      return;
    }
    table[row][column] = activePlayer.marker;
    draw.call(this);
    turnCounter++;
    this.removeEventListener('click', makingAMove);
    checkWinConditions();
    activePlayer =
      activePlayer.playerName === playerOne.playerName ? playerTwo : playerOne;
    if (!gameFinished)
      indicatorText.textContent = `${activePlayer.marker} - ${activePlayer.playerName}'s turn`;
  }

  // Draw the markers
  function draw() {
    this.textContent = activePlayer.marker;
  }

  // Start the game - set players, add event listeners
  function startGame() {
    gameFinished = false;
    playButton.disabled = true;
    document.getElementById('playerOne').disabled = true;
    document.getElementById('playerTwo').disabled = true;
    playerOne = createPlayer('playerOne');
    playerTwo = createPlayer('playerTwo');
    turnCounter = 0;
    activePlayer = playerOne;
    indicatorText.textContent = `${activePlayer.marker} - ${activePlayer.playerName}'s turn`;
    for (let row = 0; row < 3; row++) {
      table[row] = [];
      for (let column = 0; column < 3; column++) {
        addListener(row, column);
      }
    }
  }

  function checkWinConditions() {
    let markersCount = 0;
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (table[row][column] === activePlayer.marker) markersCount++;
      }
      if (markersCount === 3) {
        gameFinished = true;
        indicatorText.textContent = `${activePlayer.playerName} wins!`;
      }
      markersCount = 0;
    }
    for (let column = 0; column < 3; column++) {
      for (let row = 0; row < 3; row++) {
        if (table[row][column] === activePlayer.marker) markersCount++;
      }
      if (markersCount === 3) {
        gameFinished = true;
        indicatorText.textContent = `${activePlayer.playerName} wins!`;
      }
      markersCount = 0;
    }
    if (
      (table[0][0] === activePlayer.marker &&
        table[1][1] === activePlayer.marker &&
        table[2][2] === activePlayer.marker) ||
      (table[0][2] === activePlayer.marker &&
        table[1][1] === activePlayer.marker &&
        table[2][0] === activePlayer.marker)
    ) {
      gameFinished = true;
      indicatorText.textContent = `${activePlayer.playerName} wins!`;
    }
    if (turnCounter === 9 && !gameFinished) {
      gameFinished = true;
      indicatorText.textContent = "It's a draw!";
    }
  }

  // reset the game
  function resetGame() {
    table = [];
    playerOne = {};
    playerTwo = {};
    activePlayer = {};
    gameFinished = false;
    playButton.disabled = false;
    turnCounter = 0;
    document.getElementById('playerOne').disabled = false;
    document.getElementById('playerTwo').disabled = false;
    indicatorText.textContent = 'Press PLAY to start the game';
    for (let i = 0; i < gameboard.children.length; i++) {
      gameboard.children[i].textContent = '';
    }
  }

  function addListener(row, column) {
    document
      .getElementById(`${row}-${column}`)
      .addEventListener('click', makingAMove);
  }

  (function initialise() {
    drawBoard();
    playButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
  })();
})();
