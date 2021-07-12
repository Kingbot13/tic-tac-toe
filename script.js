/* 
    add gameboard object
        add array to store x's and o's
            store each "box" as an object in array
    add game object to control game flow
        
    add player object (use factory funtion)
*/

const log = console.log;

const Gameboard = (() => {

    let arr = ["", "", "", "", "", "", "", "", ""]; // store contents
    const arrSlice = arr.slice();
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
    // control turns between player
    // push player selection to array
    // add counter to track turns... odd numbers means player1, even means player2
    let counter = 0;

    const boxes = document.querySelectorAll(".box");
    const play = () => {
        boxes.forEach((box) => {
            box.addEventListener("click", (e) => {
                let mark;
                if (counter % 2 === 0){
                    mark = "x";
                } else {
                    mark = "o"
                };

                log(e.target);
                let key = parseInt(e.target.dataset.key);
                log(key);
                log(typeof(key));
                log(mark);
                log(Gameboard.arr);
                Gameboard.arr.splice(key, 1, mark);
                Gameboard.renderContents();
                counter++
                log(counter);
                // log(playerSelection);
            });  
        });
        // Gameboard.reset();
    };

    return {play};
})();

Game.play();
Gameboard.reset();
