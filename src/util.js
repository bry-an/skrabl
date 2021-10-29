export const shuffle = (objs) => objs.map((o) => ({ ...o, rdm: Math.random() })).sort((a, b) => a.rdm - b.rdm);

export const buildGrid = (n, m) => new Array(n).fill(
  new Array(m).fill({}),
);

export const generateGrid = () => {
  const grid = buildGrid(15, 15);
  grid.forEach((_, i) => {
    grid[i] = grid[i].map((__, j) => ({
      placedTile: null,
      occupied: false,
      key: `${i},${j}`,
      top: `${i - 1},${j}`,
      right: `${i},${j + 1}`,
      bottom: `${i + 1},${j}`,
      left: `${i},${j - 1}`,
    }));
  });
  return grid;
};

export const getGridItem = (gridKey, grid) => {
  const [row, col] = gridKey.split(',');
  return grid[row]
    ? grid[row][col] || {}
    : {};
};

const getRow = (tile) => tile.key.split(',')[0];
const getCol = (tile) => tile.key.split(',')[1];

export const getCols = (tiles) => tiles.map(getCol);
export const getRows = (tiles) => tiles.map(getRow);

export const confirmMapper = (item) => {
  item.confirmed = true;
  return item;
};

export const reduceGrid = (reducerFn, init, grid) => grid.reduce((row) => row.reduce(reducerFn, init));

export const mapGrid = (mapper, grid) => grid.map((row) => row.map(mapper));

export const someGrid = (pred, grid) => grid.some((row) => row.some(pred));

export const everyGrid = (pred, grid) => grid.every((row) => row.every(pred));

export const filterGrid = (pred, grid) => grid.reduce((items, row) => items.concat(row.filter(pred)), []);

export const equals = (a) => (b) => a === b;
