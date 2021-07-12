
const log = console.log;

const Gameboard = (() => {

    let arr = ["", "", "", "", "", "", "", "", ""]; // store contents

    const display = document.querySelector(".display");

    const renderContents = () => {
        for (let i = 0; i < arr.length; i++){
            // check for content and render in appropriate div
            let box = document.querySelector(`[data-key="${i.toString()}"]`);
            box.textContent = `${arr[i]}`;
        };
    };

    const reset = () => {
        const resetBtn = document.querySelector(".reset");
        resetBtn.addEventListener("click", () => {
            arr.splice(0, 9, "", "", "", "", "", "", "", "", "");
            renderContents();
        });
    };
    return {arr, renderContents, reset};
})();


const Player = (name) => {

    return {name};
};

const player1 = Player("Player1");
const player2 = Player("Player2");

const Game = (() => {
    // add counter to track turns... even numbers means player1, odd means player2
    let counter = 0;

    const boxes = document.querySelectorAll(".box");

    /* 
        if row 1 cells are the same
        if row 2
        if row 3
        if column 1
        if column 2
        if column 3
        if arr[1], arr[5], arr[9]
        if arr[3], arr[5], arr[7]
    */

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    
    
    const checkWin = () => {
        let winner;
        const winMsg = `${winner} won the game!`;
        const tieMsg = `It's a tie!`;
        let gameMsg = document.createElement("p");
        let gameOver = false;
        for (let i = 0; i < 3; i++){
            let condition = winConditions[i];
            let a = condition[0];
            let b = condition[1];
            let c = condition[2];
            if (a === "" || b === "" || c === ""){
                continue;
            } else if (a === b && b === c){
                if (a === "x"){
                    winner = player1;
                } else {
                    winner = player2;
                };
                gameOver = true;
                gameMsg.textContent = winMsg;
                break;
            } else if (!Gameboard.arr.includes("")){
                gameOver = true
                gameMsg.textContent = tieMsg;
            };
        };
        if (gameOver){
            Gameboard.display.appendChild(gameMsg);
        };
        return gameOver;
    };

    const play = () => {
        boxes.forEach((box) => {
            box.addEventListener("click", (e) => {
                if (box.textContent === ""){
                    log(checkWin());
                    if (!checkWin()){
                        let mark;
                        if (counter % 2 === 0){
                            mark = "x";
                        } else {
                            mark = "o"
                        };
        
                        // log(e.target);
                        let key = parseInt(e.target.dataset.key);
                        // log(key);
                        // log(typeof(key));
                        // log(mark);
                        log(Gameboard.arr);
                        Gameboard.arr.splice(key, 1, mark);
                        Gameboard.renderContents();
                        counter++;
                        log(document.querySelector(`[data-key="8"]`).textContent);
                        // log(counter);
                        // log(playerSelection);

                    };

                };
            });  
        });
    };

    return {play};
})();

Game.play();
Gameboard.reset();
