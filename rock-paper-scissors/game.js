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
let playerSelection, computerSelection;
let roundsLeft = 5;

function playRound(event) {
  playerSelection = event.target.getAttribute("data-option");
  playerOptionImage.src = `./assets/images/${playerSelection}.png`;

  computerSelection = options[Math.floor(Math.random() * options.length)];
  computerOptionImage.src = `./assets/images/${computerSelection}.png`;

  displayPlayersOptions.forEach((option) => {
    option.classList.remove("disappear");
  });

  if (playerSelection === computerSelection) {
    resultText.innerHTML = "<h1>It's a Tie!</h1>";
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
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
  computerSelection = null;
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
