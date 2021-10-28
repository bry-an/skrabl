import { ref } from 'vue';
import { shuffle, mapGrid } from '../util';
import {
  generateLetters, generateGrid, confirmMapper, validateTurn,
} from '../game';

export const skrablSack = ref(generateLetters());

export const clickedTile = ref({});

export const tileDeck = ref([]);

export const grid = ref(generateGrid());

const removeTileFromDeck = (tile) => {
  tileDeck.value = tileDeck.value.filter((tileDeckTile) => tileDeckTile.key !== tile.key);
};

const removeTileFromGrid = (gridKey) => {
  const [row, col] = gridKey.split(',');
  grid.value[row][col].placedTile = null;
  grid.value[row][col].occupied = false;
  clickedTile.value = {};
};

export const addTileToDeck = (tile) => {
  tileDeck.value = tileDeck.value.concat(tile);
};

export const assignTile = (gridKey) => {
  const [row, col] = gridKey.split(',');
  const clickedGridSpace = grid.value[row][col];
  if (clickedGridSpace.placedTile && clickedGridSpace.confirmed === true) {
    // a confirmed tile is here
    return;
  }
  if (clickedGridSpace.placedTile && clickedGridSpace.confirmed === false) {
    // undo placement
    addTileToDeck(clickedGridSpace.placedTile);
    removeTileFromGrid(gridKey);
    return;
  }
  clickedGridSpace.placedTile = clickedTile.value;
  clickedGridSpace.confirmed = false;
  clickedGridSpace.occupied = true;
  removeTileFromDeck(clickedTile.value);
};

export const setClickedTile = (newTile) => {
  if (newTile.key === clickedTile.value.key) {
    clickedTile.value = {};
  } else {
    clickedTile.value = newTile;
  }
};

export const shuffleSkrablSack = () => {
  skrablSack.value = shuffle(skrablSack.value);
};

export const draw = (tiles) => {
  const workingTiles = [...tiles];
  while (workingTiles.length < 7 && skrablSack.value.length) {
    const newTile = skrablSack.value[0];
    workingTiles.push(newTile);
    skrablSack.value = skrablSack.value.slice(1);
  }
  return workingTiles;
};

export const initializeDeck = () => {
  shuffleSkrablSack();
  tileDeck.value = draw(tileDeck.value);
};

export const submitTurn = () => {
  tileDeck.value = draw(tileDeck.value);
  grid.value = mapGrid(confirmMapper, grid.value);
  clickedTile.value = {};
  console.log('validate turn', validateTurn(grid.value));
};
