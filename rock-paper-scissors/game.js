const options = ["rock", "paper", "scissors"];

const startBtn = document.getElementById("start-btn");
const optionsImages = document.querySelectorAll(".options img");
const playerOptionImage = document.querySelector(".user-player .option-image");
const computerOptionImage = document.querySelector(".computer .option-image");
const displayPlayersOptions = document.querySelectorAll(".disappear");
const resultText = document.querySelector(".result");
const descriptionSection = document.querySelector(".description");
const gameplay = document.querySelector(".gameplay");
const roundDiv = document.querySelector(".round");
let playerSelection, player2Selection;
let roundsLeft = 5;

function playRound(event) {
  playerSelection = event.target.getAttribute("data-option");
  playerOptionImage.src = `./assets/images/${playerSelection}.png`;

  player2Selection = options[Math.floor(Math.random() * options.length)];
  computerOptionImage.src = `./assets/images/${player2Selection}.png`;

  displayPlayersOptions.forEach((option) => {
    option.classList.remove("disappear");
  });

  if (playerSelection === player2Selection) {
    resultText.innerHTML = "<h1>It's a Tie!</h1>";
  } else if (
    (playerSelection === "rock" && player2Selection === "scissors") ||
    (playerSelection === "paper" && player2Selection === "rock") ||
    (playerSelection === "scissors" && player2Selection === "paper")
  ) {
    resultText.innerHTML = "<h1>You Win!</h1>";
  } else {
    resultText.innerHTML = "<h1>You Lose!</h1>";
  }

  roundsLeft--;

  if (roundsLeft === 0) {
    optionsImages.forEach((image) => (image.style.pointerEvents = "none"));
    resultText.innerHTML += `<p>Game Over! Click the button below to play again.</p><button class="restart-btn">Play Again</button>`;
    resultText.style.display = "block";
    const restartBtn = document.querySelector(".restart-btn");
    gameplay.classList.remove("play");
    restartBtn.addEventListener("click", resetGame);
  }
  roundDiv.textContent = `You got ${roundsLeft} shots only!`;
}

function resetGame() {
  roundsLeft = 5;
  playerSelection = null;
  player2Selection = null;
  playerOptionImage.src = "";
  computerOptionImage.src = "";
  resultText.style.display = "none";
  gameplay.classList.add("play");
  displayPlayersOptions.forEach((option) => option.classList.add("disappear"));
  optionsImages.forEach((image) => (image.style.pointerEvents = "auto"));
}

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  descriptionSection.style.display = "none";
  resultText.style.display = "block";
  gameplay.classList.add("play");
});

optionsImages.forEach((image) => {
  image.addEventListener("click", playRound);
});
