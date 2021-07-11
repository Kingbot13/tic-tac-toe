/* 
    add gameboard object
        add array to store x's and o's
            store each "box" as an object in array
    add game object to control game flow
        IIFE
    add player object (use factory funtion)
*/

const Gameboard = (() => {
    // let _boxes = document.querySelectorAll(".box");

    // const _boxObj = () => {

    // }

    let arr = ["x", "o", "o", "x", "x", "o", "x", "o", "o"]; // store contents

    const renderContents = () => {
        for (let i = 0; i < arr.length; i++){
            // check for content and render in appropriate div
            let box = document.querySelector(`[data-key="${i.toString()}"]`);
            box.textContent = `${arr[i]}`;
        };
    };
    return {arr, renderContents};
})();

Gameboard.renderContents();

const Player = (name) => {
    return {name};
};

const player1 = Player("Player1");
const player2 = Player("player2");

const Game = (() => {
    // control turns between player
    // push player selection to array
})();