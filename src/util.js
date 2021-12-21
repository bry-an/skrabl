import {
    identity, T, nil, or, notNil,
} from './functions.js';

import { COL, ROW } from './constants.js';

export const buildGrid = (n, m) => new Array(n).fill(
    new Array(m).fill({}),
);

export const generateGrid = () => {
    const grid = buildGrid(15, 15);
    grid.forEach((_, i) => {
        grid[i] = grid[i].map((__, j) => ({
            placedTile: null,
            occupied: false,
            bonusFn: '',
            key: `${i},${j}`,
            top: `${i - 1},${j}`,
            right: `${i},${j + 1}`,
            bottom: `${i + 1},${j}`,
            left: `${i},${j - 1}`,
        }));
    });
    return grid;
};

export const getGridItem = (gridKey, grid = {}) => {
    const [row, col] = gridKey.split(',');
    return grid[row]
        ? grid[row][col] || {}
        : null;
};

const getRow = (tile) => tile.key.split(',')[0];
const getCol = (tile) => tile.key.split(',')[1];

export const getCols = (tiles) => tiles.map(getCol);
export const getRows = (tiles) => tiles.map(getRow);

export const confirmMapper = (item) => ({ ...item, confirmed: true });

export const reduceGrid = (gridReducer, init, grid) => grid.reduce(gridReducer, init);

export const mapGrid = (mapper, grid) => grid.map((row) => row.map(mapper));

export const someGrid = (pred, grid) => grid.some((row) => row.some(pred));

export const everyGrid = (pred, grid) => grid.every((row) => row.every(pred));

/**
 * @returns Array 1-dimensional collection of filtered results
 */
export const filterGrid = (pred, grid) => grid.reduce((items, row) => items.concat(row.filter(pred)), []);

export const getGridCol = (col, grid) => filterGrid((item) => getCol(item) === col, grid);

export const equals = (a) => (b) => a === b;

export const cond = (conds) => (val) => {
    let i = 0;
    while (i < conds.length) {
        if (conds[i][0].call(null, val) === true) {
            return conds[i][1].call(null, val);
        }
        i += 1;
    }
    return undefined;
};

export const isEmpty = cond([
    [Array.isArray, (arr) => arr.length === 0],
    [(ele) => typeof ele === 'object', (obj) => Object.keys(obj).length === 0],
    [(ele) => typeof ele === 'string', (str) => str.length === 0],
    [T, identity],
]);

const placedTilesAdder = (sum, row) => sum + row.reduce((rowSum, tile) => (tile.placedTile
    ? rowSum + 1
    : rowSum), 0);

export const totalPlacedTiles = (grid) => reduceGrid(placedTilesAdder, 0, grid);

export const getAdjs = (gridItem, grid) => ({
    top: getGridItem(gridItem.top, grid),
    right: getGridItem(gridItem.right, grid),
    bottom: getGridItem(gridItem.bottom, grid),
    left: getGridItem(gridItem.left, grid),
});

// maybe delete these missing helpers
export const gridKeyToArrPairNums = (key) => key.split(',').map((char) => parseInt(char.trim(), 10));

export const getMissingKeys = (keysArr) => {
    // ["1,0", "1,1", "1,4"]
    const keyPairs = keysArr.map(gridKeyToArrPairNums);

    const changingIndex = keyPairs[0][0] === keyPairs[1][0] ? 1 : 0;
    const vals = keyPairs.map((pair) => pair[changingIndex]);
    return vals;
};

export const getPlayedWords = (startingGridItem, grid) => {
    const {
        top, bottom, left, right,
    } = getAdjs(startingGridItem);
    const words = [];
    words.push(traverseNewlyPlayed(top, 'top', grid));
    words.push(traverseNewlyPlayed(left, 'left', grid));
    words.push(traverseNewlyPlayed(bottom, 'bottom', grid));
    words.push(traverseNewlyPlayed(right, 'right', grid));

    return words;
};

export const traverseNewlyPlayed = (curr, dir, grid, coll = []) => {
    if (nil(curr)) {
        return coll;
    }
    const next = getAdjs(curr)[dir];
    return traverseNewlyPlayed(next, dir, grid, coll.concat(curr));
};

export const traverseExisting = (curr, dir, grid, coll = []) => {
    if (or(nil(curr[dir]), nil(curr[dir].placedTile))) {
        return coll;
    }
    return traverseExisting(curr[dir], dir, grid, coll.concat(curr));
};
