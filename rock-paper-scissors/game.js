const options = ['rock', 'paper', 'scissors']

const startBtn = document.getElementById('start-btn')
const optionsImages = document.querySelectorAll('.options img')
const playerOptionImage = document.querySelector('.user-player .option-image')
const computerOptionImage = document.querySelector('.computer .option-image')
const displayPlayersOptions = document.querySelectorAll('.disappear')
const result = document.querySelector('.result')
const descriptionSection = document.querySelector('.description')
const gameplay = document.querySelector('.gameplay')
let heading1 = document.createElement('h1')
const roundDiv = document.querySelector('.round')
let playerSelection, computerSelection
let roundsLeft = 5

function playRound(event) {
    playerSelection = event.target.getAttribute('data-option')
    playerOptionImage.src = `./assets/images/${playerSelection}.png`

    computerSelection = options[Math.floor(Math.random() * options.length)]
    computerOptionImage.src = `./assets/images/${computerSelection}.png`

    displayPlayersOptions.forEach((option) => {
        option.classList.remove('disappear')
    })

    if (playerSelection === computerSelection) {
        heading1.textContent = `It's a Tie!`
        result.appendChild(heading1)
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        heading1.textContent = `You Win`
        result.appendChild(heading1)
    } else {
        heading1.textContent = `You Lose!`
        result.appendChild(heading1)
    }

    roundsLeft--

    if (roundsLeft === 0) {
        optionsImages.forEach((image) => (image.style.pointerEvents = 'none'))
        resultText = document.createElement('p')
        restartBtn = document.createElement('button')
        resultText.textContent = `Game Over! Click the button below to play again.`
        restartBtn.textContent = 'Play Again!'
        restartBtn.classList.add('restart-btn')
        result.removeChild(heading1)
        result.appendChild(resultText)
        result.appendChild(restartBtn)
        result.style.display = 'block'
        gameplay.classList.remove('play')
        restartBtn.addEventListener('click', resetGame)
    }
    roundDiv.textContent = `You got ${roundsLeft} shots only!`
}

function resetGame() {
    roundsLeft = 5
    playerSelection = null
    computerSelection = null
    playerOptionImage.src = ''
    computerOptionImage.src = ''
    result.style.display = 'none'
    result.textContent = ''
    roundDiv.textContent = `You got ${roundsLeft} shots only!`
    gameplay.classList.add('play')
    displayPlayersOptions.forEach((option) => option.classList.add('disappear'))
    optionsImages.forEach((image) => (image.style.pointerEvents = 'auto'))
}

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none'
    descriptionSection.style.display = 'none'
    result.style.display = 'block'
    gameplay.classList.add('play')
})

optionsImages.forEach((image) => {
    image.addEventListener('click', playRound)
})
