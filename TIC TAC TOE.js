const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restart = document.querySelector("#restart");
const winsChecks = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", clickedCell));
    restart.addEventListener("click", restartGame);
    statusText.textContent = `IT'S ${currentPlayer}'S TURN`;
    running = true;

}


function clickedCell() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    winner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `IT'S ${currentPlayer}'S TURN`;
}

function winner() {
    let win = false;

    for (let i = 0; i < winsChecks.length; i++) {
        const condition = winsChecks[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            win = true;
            break;
        }
    }

    if (win == true) {
        statusText.textContent = `${currentPlayer} WINS!`;
        running = false;
    }

    else if (!options.includes("")) {
        statusText.textContent = "DRAW!";
        running = false;
    }

    else
        changePlayer();
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'S TURN`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
