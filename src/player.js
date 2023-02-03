import Gameboard from './gameboard';

export default () => {
    const gameboard = Gameboard();
    const attackArray = [];
    for (let i = 0; i < 10; i+=1) {
        for (let j = 0; j < 10; j+=1) {
            attackArray.push([i, j]);
        }
    }

    const attackRandomCoordinate = () => {
        const random = Math.floor(Math.random() * attackArray.length);
        const targetCoordinate = attackArray.splice(random, 1)[0];
        return targetCoordinate;
    };

    return { gameboard, attackRandomCoordinate }
};