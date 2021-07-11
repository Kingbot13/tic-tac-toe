/* 
    add gameboard object
        add array to store x's and o's
    add game object to control game flow
        IIFE
    add player object (use factory funtion)
*/

const Gameboard = (() => {
    let arr = []; // store contents
    const _renderContents = () => {
        for (let i = 0; i < arr.length; i++){
            // check for content and render in appropriate div
        };
    };
    return {arr};
})();

const Player = (name) => {
    return {name};
};

const player1 = Player("Player1");
const player2 = Player("player2");

const Game = (() => {
    // control turns between player
    // push player selection to array
})