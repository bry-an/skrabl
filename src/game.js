import { initialSkrablLetters, letterValueMap } from './constants';
import {
  buildGrid, filterGrid,
} from './util.js';

export const generateLetters = () => initialSkrablLetters.map((letter, i) => ({ letter, val: letterValueMap[letter], key: i }));

export const generateGrid = () => {
  const grid = buildGrid(15, 15);
  grid.forEach((_, i) => {
    grid[i] = grid[i].map((__, j) => ({
      placedTile: null,
      occupied: false,
      key: `${i},${j}`,
      topAdjacent: grid[i - 1] && grid[i - 1][j],
      rightAdjacent: grid[i][j + 1],
      bottomAdjacent: grid[i + 1] && grid[i + 1][j],
      leftAdjacent: grid[i][j - 1],
    }));
  });
  console.log('the grid', grid);
  return grid;
};

export const confirmMapper = (item) => {
  item.confirmed = true;
  return item;
};

export const tileHasAdjacentConfirmedOccupiedTile = (tile) => (tile.topAdjacent?.occupied && tile.topAdjacent?.confirmed)
    || (tile.bottomAdjacent?.occupied && tile.topAdjacent?.confirmed)
    || (tile.rightAdjacent?.occupied && tile.topAdjacent?.confirmed)
    || (tile.leftAdjacent?.occupied && tile.topAdjacent?.confirmed);

export const tileHasAdjacentUnconfirmedOccupiedTile = (tile) => (tile.topAdjacent?.occupied && tile.topAdjacent?.confirmed === false)
    || (tile.bottomAdjacent?.occupied && tile.topAdjacent?.confirmed === false)
    || (tile.rightAdjacent?.occupied && tile.topAdjacent?.confirmed === false)
    || (tile.leftAdjacent?.occupied && tile.topAdjacent?.confirmed === false);

const getAttemptedTurn = (grid) => filterGrid((gridItem) => gridItem.confirmed === false, grid);

export const validateTurn = (grid) => {
  const attemptedTurn = getAttemptedTurn(grid);
  console.log('some adj conf occ tiles', attemptedTurn.some(tileHasAdjacentConfirmedOccupiedTile, grid));
  console.log('every adj unconfirmed', attemptedTurn.every(tileHasAdjacentUnconfirmedOccupiedTile, grid));
  return attemptedTurn.some(tileHasAdjacentConfirmedOccupiedTile, grid)
    && attemptedTurn.every(tileHasAdjacentUnconfirmedOccupiedTile, grid);
};
