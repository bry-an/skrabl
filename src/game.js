import {
    COL,
    ROW,
    initialSkrablLetters,
    letterValueMap,
} from './constants.js';
import {
    equals,
    everyGrid,
    filterGrid,
    getAdjs,
    getCols,
    getGridItem,
    getRows,
    totalPlacedTiles,
} from './util.js';
import {
    allPass,
    complement,
    cond,
    nil,
    notNil,
    or,
} from './functions.js';

const isOccupied = (tile) => tile.occupied === true;
const isConfirmed = (tile) => tile.confirmed === true;
const isNotOccupied = complement(isOccupied);
const isNotConfirmed = complement(isConfirmed);
const isPrevExistingTile = allPass([isOccupied, isConfirmed]);
export const generateLetters = () => initialSkrablLetters.map((letter, i) => ({ letter, val: letterValueMap[letter], key: i }));

export const tileHasAdjConfirmedOccupiedTile = (grid) => (gridItem) => {
    const {
        top, left, bottom, right,
    } = getAdjs(gridItem, grid);
    return or(
        (isOccupied(top) && isConfirmed(top)),
        (isOccupied(bottom) && isConfirmed(bottom)),
        (isOccupied(right) && isConfirmed(right)),
        (isOccupied(left) && isConfirmed(left)),
    );
};

export const tileHasAdjUnconfirmedOccupiedTile = (grid) => (gridItem) => {
    const {
        top, left, bottom, right,
    } = getAdjs(gridItem, grid);
    return or(
        (isOccupied(top) && isNotConfirmed(top)),
        (isOccupied(bottom) && isNotConfirmed(bottom)),
        (isOccupied(right) && isNotConfirmed(right)),
        (isOccupied(left) && isNotConfirmed(left)),
    );
};

export const tileHasAdjOccupiedTile = (grid) => (gridItem) => {
    const {
        top, left, bottom, right,
    } = getAdjs(gridItem, grid);
    return or(
        isOccupied(top),
        isOccupied(bottom),
        isOccupied(right),
        isOccupied(left),
    );
};

const getAttemptedTurn = (grid) => filterGrid((gridItem) => isNotConfirmed(gridItem) && isOccupied(gridItem), grid);

const isInitialTurn = (grid) => everyGrid((gridItem) => (isOccupied(gridItem) ? isNotConfirmed(gridItem) : true), grid);

export const getWord = (tile, direction, grid, word = []) => {
    const nextTile = getAdjs(tile, grid)[direction] || null;
    if (nextTile === null) {
        return word;
    }
    return getWord(nextTile, direction, word.concat(tile.letter));
};

const lettersInOneRowOrCol = (letters) => {
    const cols = getCols(letters);
    const rows = getRows(letters);
    const equalsFirstItem = (line) => equals(line[0]);
    if (cols.every(equalsFirstItem(cols))) return COL;
    if (rows.every(equalsFirstItem(rows))) return ROW;
    return false;
};

export const getPlayedWords = (grid) => {
    const numPlacedTiles = totalPlacedTiles(grid);
    const attemptedTurn = getAttemptedTurn(grid);
    const words = [];
    if (numPlacedTiles > 1) {
        const baseWord = attemptedTurn.map(({ placedTile = {} }) => placedTile.letter || '');
        words.push(baseWord);
    }
    attemptedTurn.forEach((tile) => {
        const neighbors = Object.entries(getAdjs(tile, grid));
        console.log('neighbors', neighbors);
        for (const [dir, neighbor] of neighbors) {
            if (isPrevExistingTile(neighbor)) {
                words.push(getWord(neighbor, dir));
            }
        }
    });
    return words;
};
export const validateTurn = (grid) => {
    const numPlacedTiles = totalPlacedTiles(grid);
    const attemptedTurn = getAttemptedTurn(grid);
    if (numPlacedTiles === 0) {
        return false;
    }
    if (!lettersInOneRowOrCol(attemptedTurn)) {
        return false;
    }
    if (isInitialTurn(grid)) {
        return numPlacedTiles === 1
            ? true
            : attemptedTurn.every(tileHasAdjUnconfirmedOccupiedTile(grid));
    }

    // not connected to main grid
    if (!attemptedTurn.some(tileHasAdjConfirmedOccupiedTile(grid))) return false;
    // contiguous - every tile has an adjacent occupied tile
    if (!attemptedTurn.every(tileHasAdjOccupiedTile(grid)) && attemptedTurn.length > 1) return false;
    if (attemptedTurn.length === 0) return false;

    return true;
};

export const traverse = ({
    curr, dir, grid,
}) => {
    if (or(nil(curr)), isNotOccupied(curr)) {
        console.log('this should not happen');
        return;
    }

    let coll = [];
    const {
        top, bottom, left, right,
    } = getAdjs(curr, grid); // GET ADJS NEEDS REFERENCE TO THE GRID

    if (isConfirmed(curr)) {
        // existing tile, iteration in specific direction
        // only continue if next is confirmed (and thus occupied)
        const next = getAdjs(curr)[dir];
        let coll = [];

        if (isConfirmed(next)) {
            coll = coll.concat(curr, traverse({ curr: next, dir }));
        } else {
            return curr;
        }
        return coll;
    }
    // iterating through new tiles, can traverse in any direction (except to a visited tile)
    curr.visited = true;
    if (notNil(top) && notNil(top.placedTile) && !top.visited) {
        coll = coll.concat(curr, traverse({ curr: top, dir: 'top', grid }));
    }
    if (notNil(right) && notNil(right.placedTile) && !right.visited) {
        coll = coll.concat(curr, traverse({ curr: right, dir: 'right', grid }));
    }
    if (notNil(bottom) && notNil(bottom.placedTile) && !bottom.visited) {
        coll = coll.concat(curr, traverse({ curr: bottom, dir: 'bottom', grid }));
    }
    if (notNil(left) && notNil(left.placedTile) && !left.visited) {
        coll = coll.concat(curr, traverse({ curr: left, dir: 'left', grid }));
    }

    if (coll.length === 0) {
        return curr;
    }
    return coll;
};
