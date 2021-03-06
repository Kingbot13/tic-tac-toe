
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


const Player = (name) => { // store player objects
    
    return {name};
};

const Game = (() => { // control game flow

    let player1;
    let player2;
    const btn = document.querySelector("#submit");
    btn.addEventListener("click", () => { // grab submitted player names
        let player1Name = document.querySelector("#player1").value;
        let player2Name = document.querySelector("#player2").value;
        player1 = Player(player1Name);
        player2 = Player(player2Name);
        log("player1", player1);
        log("player2", player2);
    });

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
                const winMsg = `${winner} won the game!`;

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
        // log(player1);
        // log(player2);
        // log("winner", winner);
        return gameOver;
    };


    const play = () => {
        document.addEventListener("click", checkWin);
        boxes.forEach((box) => {
            box.addEventListener("click", (e) => {
                if (box.textContent === ""){
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
