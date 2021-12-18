import {
    initialSkrablLetters,
    letterValueMap,
    ROW,
    COL,
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
import { allPass, complement, or } from './functions.js';

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

export const getWord = (tile, direction, word = []) => {
    const nextTile = getAdjs(tile)[direction] || null;
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

export const getPlay = (grid) => {
    const attemptedTurn = getAttemptedTurn(grid);
    const words = [];
    attemptedTurn.forEach((tile) => {
        const neighbors = Object.entries(getAdjs(tile));
        for (const [dir, neighbor] of neighbors) {
            if (isPrevExistingTile(neighbor)) {
                // TODO
                // console.log('get play', getWord(neighbor, dir));

            }
        }
    });
};
export const validateTurn = (grid) => {
    console.log('validating turn');
    const numPlacedTiles = totalPlacedTiles(grid);
    const attemptedTurn = getAttemptedTurn(grid);
    console.log('attempted turn', attemptedTurn);
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

const assignTile = ({ selectedTile, gridKey, grid }) => {
    const clickedGridSpace = getGridItem(gridKey, grid);
    if (clickedGridSpace.placedTile && isConfirmed(clickedGridSpace)) {
    // a confirmed tile is already here
        return;
    }
    if (clickedGridSpace.placedTile && isNotConfirmed(clickedGridSpace)) {
    // undo placement
        addTileToDeck(clickedGridSpace.placedTile);
        removeTileFromGrid(gridKey);
        return;
    }
    if (isEmpty(selectedTile)) {
        return;
    }
    clickedGridSpace.placedTile = selectedTile;
    clickedGridSpace.confirmed = false;
    clickedGridSpace.occupied = true;
    removeTileFromDeck(selectedTile);
};
