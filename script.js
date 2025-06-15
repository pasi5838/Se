
const board = document.getElementById("board");
const playerXScoreEl = document.getElementById("playerXScore");
const playerOScoreEl = document.getElementById("playerOScore");
let currentPlayer = "X";
let cells = [];
let playerXScore = 0;
let playerOScore = 0;

function createBoard() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.addEventListener("click", () => cellClick(cell, i));
    board.appendChild(cell);
    cells.push("");
  }
}

function cellClick(cell, index) {
  if (cells[index] !== "") return;
  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;
  if (checkWinner()) {
    showConfetti();
    setTimeout(hideConfetti, 3000);
    if (currentPlayer === "X") playerXScore++;
    else playerOScore++;
    updateScore();
    setTimeout(restartGame, 3100);
  } else if (!cells.includes("")) {
    alert("Seri!");
    restartGame();
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(([a, b, c]) => 
    cells[a] && cells[a] === cells[b] && cells[b] === cells[c]
  );
}

function updateScore() {
  playerXScoreEl.textContent = "X: " + playerXScore;
  playerOScoreEl.textContent = "O: " + playerOScore;
}

function restartGame() {
  currentPlayer = "X";
  createBoard();
}

function resetScores() {
  playerXScore = 0;
  playerOScore = 0;
  updateScore();
}

createBoard();
