
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
    return {arr, display, renderContents, reset};
})();


const Player = (name) => {

    return {name};
};

const player1 = Player("Player1");
log("player1", player1.name);
const player2 = Player("Player2");

const Game = (() => {
    // add counter to track turns... even numbers means player1, odd means player2
    let counter = 0;

    const boxes = document.querySelectorAll(".box");
   
    let gameOver = false;
   const checkWin = () => {
       let arr = Gameboard.arr;
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
        let winner;
        const winMsg = `${winner} won the game!`;
        const tieMsg = `It's a tie!`;
        let gameMsg = document.createElement("p");
        for (let i = 0; i < 8; i++){
            let condition = winConditions[i];
            let a = arr[condition[0]];
            let b = arr[condition[1]];
            let c = arr[condition[2]];

            if (a === "" || b === "" || c === ""){
                continue;
            } else if (a === b && b === c){
                if (a === "x"){
                    winner = player1.name;
                } else {
                    winner = player2.name;
                };
                gameOver = true;
                gameMsg.textContent = winMsg;
                break;
            } else if (!Gameboard.arr.includes("")){
                gameOver = true;
                gameMsg.textContent = tieMsg;
                return;
            };
        };
        if (gameOver){
            if (Gameboard.display.childNodes.length === 0){
                Gameboard.display.appendChild(gameMsg);
                return;
            };
        };
        return gameOver;
    };


    const play = () => {
        document.addEventListener("click", checkWin);
        boxes.forEach((box) => {
            box.addEventListener("click", (e) => {
                if (box.textContent === ""){
                    // checkWin();
                    if (!gameOver){
                        let mark;
                        if (counter % 2 === 0){
                            mark = "x";
                        } else {
                            mark = "o"
                        };
        
                        let key = parseInt(e.target.dataset.key);
                        log(Gameboard.arr);
                        Gameboard.arr.splice(key, 1, mark);
                        Gameboard.renderContents();
                        counter++;
                    };

                };
            });  
        });
    };

    return {play, checkWin};
})();

Game.play();

Gameboard.reset();
