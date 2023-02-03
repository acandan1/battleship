import Ship from './ship';

export default () => {

    const map = new Map();

    const createBoard = () => {
        const row = 10;
        const col = 10;
        for (let i = 0; i < row; i += 1) {
            for (let j = 0; j < col; j += 1) {
                map.set([i, j], false);
            }
        }
    };

    const shipMap = new Map();
    const occupiedCoordinates = [];

    const placeShip = (xCoor, yCoor, shipLength) => {
        if (xCoor + shipLength < 10) {
            const coordinateArray = [];
            for (let i = 0; i < shipLength; i += 1) {
                coordinateArray.push([xCoor + i, yCoor]);
                occupiedCoordinates.push([xCoor + i, yCoor]);
            }
            const ship = Ship(shipLength);
            shipMap.set(ship, coordinateArray);
        }
    };

    const allShipsSunk = () => {
        if (occupiedCoordinates.length === 0) {
            return true;
        }
        return false;
    };

    const removeOccupiedCoordinates = (xCoor, yCoor) => {
        for (let i = 0; i < occupiedCoordinates.length; i+=1) {
            if (occupiedCoordinates[i] === [xCoor, yCoor]) {
                occupiedCoordinates.splice(i, 1);
            }
        }
    };

    const receiveAttack = (xCoor, yCoor) => {
        const keys = [...map.keys()]
        keys.forEach(coordinate => {
            if (coordinate[0] === xCoor && coordinate[1] ===yCoor) {
                map.set(coordinate, true);
                console.log("hasdaasd");
            }
        });

        const values = [...shipMap.values()];
        let keyIndex = 0;
        values.forEach(coordinateArray => {
            for (let i = 0; i < coordinateArray.length; i +=1 ) {
                if (coordinateArray[i] === [xCoor, yCoor]) {
                    const key = keys[keyIndex];
                    key.hit();
                    removeOccupiedCoordinates(xCoor, yCoor);
                }
            }
            keyIndex += 1;
        });
        return allShipsSunk();
    };

    createBoard();
    return { map, placeShip, receiveAttack }
}