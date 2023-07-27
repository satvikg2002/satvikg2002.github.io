const cellElements = document.querySelectorAll('[data-cell]')
const X_CLASS = "x"
const O_CLASS = "o"
const board = document.getElementById('board')
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
const winningMessageElement = document.getElementById('winning-message')
const winningMessageText = document.getElementsByClassName('winning-text')[0]
const restartButton = document.getElementById('restart')

let circleTurn

startGame()
restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()

    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? O_CLASS : X_CLASS

    // place
    placeMark(cell, currentClass)

    // check for Win
    if (checkWin(currentClass)) {
        endGame(false)
    }

    else if (isDraw()) {
        endGame(true)
    }

    else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw)
        winningMessageText.innerText = 'Draw'
    else
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`

    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(O_CLASS) || cell.classList.contains(X_CLASS)
    })
}

function placeMark(cell, currClass) {
    cell.classList.add(currClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)

    if (circleTurn)
        board.classList.add(O_CLASS)
    else
        board.classList.add(X_CLASS)
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}