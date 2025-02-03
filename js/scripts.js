const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameBtn = document.getElementById("newGameBtn");

let score = 0;
let colors = [];

// Generate a random color in hex format
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

// Function to start the game
function startGame() {
  gameStatus.textContent = "";
  colors = Array.from({ length: 6 }, getRandomColor);
  let correctColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = correctColor;

  // Reset color options
  colorOptionsContainer.innerHTML = "";
  colors.forEach((color) => {
    let btn = document.createElement("button");
    btn.classList.add("color-btn");
    btn.style.backgroundColor = color;
    btn.setAttribute("data-testid", "colorOption");
    btn.addEventListener("click", () => checkGuess(color, correctColor));
    colorOptionsContainer.appendChild(btn);
  });
}

// Function to check the user's guess
function checkGuess(selectedColor, correctColor) {
  if (selectedColor === correctColor) {
    score++;
    gameStatus.textContent = "You are correct! 🎉";
    gameStatus.className = "correct";
  } else {
    gameStatus.textContent = "Wrong! 😢 Try again...";
    gameStatus.className = "wrong";
    score = 0;
    scoreDisplay.textContent = score;
  }

  scoreDisplay.textContent = score;
  setTimeout(startGame, 1000);
}

newGameBtn.addEventListener("click", () => {
  score = 0;
  scoreDisplay.textContent = score;
  startGame();
});

// Start game on page load
startGame();