/* eslint-disable no-use-before-define */
import './style.css';
import Player from './player';

const mainHandler =(() => {
    const player = Player();
    const computer = Player();
    const playerBoard = player.gameboard;

    const startGame = () => {
        DOM(player, computer);
    }

    const toggleComputer = () => {
        console.log("hey");
        const attackCoordinate = computer.attackRandomCoordinate();
        const xCoor = attackCoordinate[0];
        const yCoor = attackCoordinate[1];
        changeCoordinateColor(xCoor.toString() + yCoor.toString());
        playerBoard.receiveAttack(xCoor, yCoor);
    }

    return { startGame, toggleComputer }

})();

function DOM(player, computer) {
    const container = document.getElementsByClassName("container")[0];

    const playerBoard = player.gameboard;
    const computerBoard = computer.gameboard;

    const div = document.createElement("div");
    div.className = "main-div";

    const playerDiv = document.createElement("div");
    playerDiv.className = "board player";


    for (let i = 0; i < 10; i+=1) {
        for (let j = 0; j < 10; j+=1) {
            const square = document.createElement("div");
            square.className = "player-coord";
            square.id = i.toString()+j.toString();
            playerDiv.appendChild(square);
        }
    }

    const computerDiv = document.createElement("div");
    computerDiv.className = "board computer";

    for (let i = 0; i < 10; i+=1) {
        for (let j = 0; j < 10; j+=1) {
            const square2 = document.createElement("div");
            square2.className = "computer-coord";
            square2.id = i.toString() + j.toString();
            square2.addEventListener('click', (event) => {
                if (square2.style.backgroundColor !== "red") {
                    square2.style.backgroundColor = "red";
                    computerBoard.receiveAttack(i, j);
                    mainHandler.toggleComputer();
                }
            });
            computerDiv.appendChild(square2);
        }
    }

    div.appendChild(playerDiv);
    div.appendChild(computerDiv);
    container.appendChild(div);
}

function changeCoordinateColor(id) {
    const sq = document.getElementById(id);
    sq.style.backgroundColor = "red";
}

mainHandler.startGame();