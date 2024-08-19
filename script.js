/*----- constants -----*/
const COLORS = {
    '0': 'White',
    '1' : 'Red',
    '-1': 'Blue'
}

/*----- state variables -----*/
let board // array of column arrays 
let turn // 1 or -1
let winner // null = no winner; 1 or -1 winner; 'T' = tie game

/*----- cached elements  -----*/
const messageEl = document.querySelector('h1')
const playAgainBtn = document.querySelector('button')
const markerEls = document.querySelectorAll('#markers > div')

/*----- event listeners -----*/


/*----- functions -----*/
init();

//Initialize all state, then call render()
function init() {
    // To visualize the board's mapping to the DOM,
    //rotate the board array 90 degrees counter-clockwise
    board = [
        [0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 0, 0, 0, 0], // col 1
        [0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 0, 0, 0, 0], // col 3
        [0, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0], // col 5
        [0, 0, 0, 0, 0, 0], // col 6
]
turn = 1
winner = null
render()
}

// visualize all state in the DOM
function render() {
    renderBoard()
    renderMessage()
    //hide/show UI elements (controls)
    renderControls()
}

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        // iterate over the cells in the current column(colArr)
        colArr.forEach(function(cellVal, rowIdx) {
            const cellId = `c${colIdx}r${rowIdx}`
            const cellEl = document.getElementById(cellId)
            cellEl.style.backgroundColor = COLORS[cellVal]
        })
    })
}

function renderMessage() {
    if(winner === 'T') {
        messageEl.innerText = "It's a tie!"        
    } else if (winner) {
        messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner]}</span> Wins! `
    } else {
        //Game is in play
        messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn]}'s</span> Turn`
    }
}

function renderControls () {
// Ternary expression is the go to when you want 1 of 2 returned
//< cond expression> ? <truthy exp> : <falsey exp>
playAgainBtn.style.visibility = winner ? 'visible' : 'hidden'
// itereate over the marker elements to hide/show 
//according to the column being full (no 0's) or not
markerEls.forEach(function (markerEl, colIdx) {
    const hideMarker = !board[colIdx].includes(0) || winner
    markerEl.style.visibility = hideMarker ? 'hidden' : 'visible'
})


}