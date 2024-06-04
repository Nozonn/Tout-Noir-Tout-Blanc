function initialization(isFirst=true) {
    let color;
    boardCase.style.display = "flex";
    endMenu.style.display = "none";
    nbClick = 0; scoreText.textContent = `Number of clicks : ${nbClick}`;
    if (isFirst) {
        for (let i=0; i<rows.length; i++) {
            col = [];
            for (let j = 0; j<nbCol; j++) {
                td = document.createElement("td");
                color = colors[Math.round(Math.random())]
                td.style.backgroundColor = color;
                col.push( [ rows[i].appendChild( td ),  color]);
            }
        
            board.push(col);
        }
    } else {
        for (let i=0; i<rows.length; i++) {
            for (let j=0; j<nbCol; j++) {
                color = colors[Math.round(Math.random())]
                board[i][j][0].style.backgroundColor = color;
                board[i][j][1] = color;
            }
        }
    }

    verif() ? restart() : {};
    
}

function changeColor(item) {
    if (item[0].style.backgroundColor == colors[0]) {
        item[0].style.backgroundColor = colors[1]
        item[1] = colors[1]
    }
    else {
        item[0].style.backgroundColor = colors[0]
        item[1] = colors[0]
    }
}

function verif() {
    listCase = [
        board[0][0][1], board[0][1][1], board[0][2][1],
        board[1][0][1], board[1][1][1], board[1][2][1],
        board[2][0][1], board[2][1][1], board[2][2][1]
    ]
    if( listCase.includes(colors[0]) ) {
        if ( listCase.includes(colors[1]) ) {
            return false
        } else {
            return true
        }
    } else if ( listCase.includes(colors[1]) ) {
        if ( listCase.includes(colors[0]) ) {
            return false
        } else {
            return true
        }
    }
}


function scoreGestion(idText) {
    endMessage.textContent = endMess[idText];
    bestScoreVal = nbClick;
    bestScore.textContent = `Number minimum of clicks : ${bestScoreVal}`;
}

function restart() {
    boardCase.style.display = "none";
    endMenu.style.display = "flex";

    if (bestScoreVal == null) {scoreGestion(0);} 
    else if (nbClick == 0) {scoreGestion(4);} 
    else if (nbClick == 0 && bestScoreVal == 0) {scoreGestion(5);}
    else if (nbClick < bestScoreVal) {scoreGestion(1);} 
    else if (nbClick == bestScoreVal) {scoreGestion(3);} 
    else {endMessage.textContent = endMess[2];}

    isRestart.addEventListener("click", (e) => {
        initialization(false)
    })
}



const boardCase = document.getElementById("board");
const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");
const row3 = document.getElementById("row3");
const scoreText = document.getElementById("scoreText");
const bestScore = document.getElementById("bestScore");
const endMenu = document.getElementById("endMenu");
const endMessage = document.getElementById("endMessage");
const isRestart = document.getElementById("isRestart");


const rows = [row1, row2, row3];
const colors = ["white", "black"];
const endMess = [
    "It's your first attempt. Play Again ! ",
    "You beat your score ! GOOD JOB !!",
    "GAME OVER ! Try Again !",
    "Almost you win !! Try Again to beat your best score !",
    "WHAOU !!! 0 click !! You're lucky !!",
    "You cannot do better !! It's not a big deal !"
]
let board = [];
let nbCol = 3;
let nbClick = 0;
let bestScoreVal = null;

initialization()


for ( let row = 0; row < rows.length; row++ ) {
    for ( let col = 0; col < nbCol; col++ ) {
        board[row][col][0].addEventListener("click", (e) => {
            
            nbClick++
            scoreText.textContent = `Numbers of click : ${nbClick}`
            
            changeColor(board[row][col]);
            if (row+1 <= 2) {changeColor(board[row+1][col])};
            if (row-1 >= 0) {changeColor(board[row-1][col])};
            if (col+1 <= 2) {changeColor(board[row][col+1])};
            if (col-1 >= 0) {changeColor(board[row][col-1])};

            verif() ? restart() : {}

        })
    }
}


