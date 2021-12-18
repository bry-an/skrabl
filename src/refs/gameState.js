import { ref, computed } from 'vue';
import {
    confirmMapper,
    generateGrid,
    getGridItem,
    isEmpty,
    mapGrid,
} from '../util.js';
import {
    generateLetters, validateTurn,
} from '../game.js';
import { shuffle } from '../functions.js';

export const skrablSack = ref(generateLetters());

export const selectedTile = ref({});

export const tileDeck = ref([]);

export const grid = ref(generateGrid());

export const isValidTurn = computed(() => validateTurn(grid.value));

const removeTileFromDeck = (tile) => {
    tileDeck.value = tileDeck.value.filter((tileDeckTile) => tileDeckTile.key !== tile.key);
    selectedTile.value = {};
};

const removeTileFromGrid = (gridKey) => {
    const [row, col] = gridKey.split(',');
    grid.value[row][col].placedTile = null;
    grid.value[row][col].occupied = false;
    selectedTile.value = {};
};

export const addTileToDeck = (tile) => {
    tileDeck.value = tileDeck.value.concat({ ...tile });
};

export const assignTile = (gridKey) => {
    const clickedGridSpace = getGridItem(gridKey, grid.value);
    if (clickedGridSpace.placedTile && clickedGridSpace.confirmed === true) {
    // a confirmed tile is already here
        return;
    }
    if (clickedGridSpace.placedTile && clickedGridSpace.confirmed === false) {
    // undo placement
        addTileToDeck(clickedGridSpace.placedTile);
        removeTileFromGrid(gridKey);
        return;
    }
    if (isEmpty(selectedTile.value)) {
        return;
    }
    clickedGridSpace.placedTile = selectedTile.value;
    clickedGridSpace.confirmed = false;
    clickedGridSpace.occupied = true;
    removeTileFromDeck(selectedTile.value);
};

export const setSelectedTile = (newTile) => {
    if (newTile.key === selectedTile.value.key) {
        selectedTile.value = {};
    } else {
        selectedTile.value = newTile;
    }
};

export const shuffleSkrablSack = () => {
    skrablSack.value = shuffle(skrablSack.value);
};

export const draw = (tiles) => {
    const newTiles = [...tiles];
    while (newTiles.length < 7 && skrablSack.value.length) {
        const newTile = skrablSack.value[0];
        newTiles.push(newTile);
        skrablSack.value = skrablSack.value.slice(1);
    }
    return newTiles;
};

export const initializeDeck = () => {
    shuffleSkrablSack();
    tileDeck.value = draw(tileDeck.value);
};

export const submitTurn = () => {
    console.log('validate turn', validateTurn(grid.value));
    // get words here
    tileDeck.value = draw(tileDeck.value);
    // game state mutation
    grid.value = mapGrid(confirmMapper, grid.value);
    selectedTile.value = {};
};
