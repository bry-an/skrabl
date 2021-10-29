import {
  initialSkrablLetters, letterValueMap, ROW, COL,
} from './constants';
import {
  filterGrid, everyGrid, equals, getGridItem, getRows, getCols,
} from './util.js';

export const generateLetters = () => initialSkrablLetters.map((letter, i) => ({ letter, val: letterValueMap[letter], key: i }));

const getAdjacents = (gridKey, grid) => {
  const gridItem = getGridItem(gridKey, grid);
  return {
    top: getGridItem(gridItem.top, grid),
    right: getGridItem(gridItem.right, grid),
    bottom: getGridItem(gridItem.bottom, grid),
    left: getGridItem(gridItem.left, grid),
  };
};

export const tileHasAdjacentConfirmedOccupiedTile = (gridKey, grid) => {
  const {
    top, left, bottom, right,
  } = getAdjacents(gridKey, grid);
  return (top.occupied && top.confirmed)
        || (bottom.occupied && bottom.confirmed)
        || (right.occupied && right.confirmed)
        || (left.occupied && left.confirmed);
};

export const tileHasAdjacentUnconfirmedOccupiedTile = (gridKey, grid) => {
  const {
    top, left, bottom, right,
  } = getAdjacents(gridKey, grid);
  return (top.occupied && top.confirmed === false)
    || (bottom.occupied && bottom.confirmed === false)
    || (right.occupied && right.confirmed === false)
    || (left.occupied && left.confirmed === false);
};

const getAttemptedTurn = (grid) => filterGrid((gridItem) => gridItem.confirmed === false && gridItem.occupied === true, grid);

const isInitialTurn = (grid) => everyGrid((gridItem) => (gridItem.occupied ? gridItem.confirmed === false : true), grid);

export const getWord = (line) => {
  const word = [];
  for (let i = 0; i < line.length; i += 1) {
    if (line[i].occupied === true && line[i].confirmed === false) {
      let idx = i;
      while (line[idx].occupied === true && idx < line.length) {
        word.push(line[idx].placedTile);
        idx += 1;
      }
      return word.join('');
    }
  }
  return '';
};

const lettersInOneRowOrCol = (letters) => {
  const cols = getCols(letters);
  const rows = getRows(letters);
  const equalsFirstItem = (line) => equals(line[0]);
  if (cols.every(equalsFirstItem(cols))) return COL;
  if (rows.every(equalsFirstItem(rows))) return ROW;
  return false;
};

export const validateTurn = (grid) => {
  const attemptedTurn = getAttemptedTurn(grid);
  console.log('row or col?', lettersInOneRowOrCol(attemptedTurn));
  if (!lettersInOneRowOrCol(attemptedTurn)) return false;
  if (isInitialTurn(grid)) return 'initial turn';
  return true;
};
