export const shuffle = (objs) => objs.map((o) => ({ ...o, rdm: Math.random() })).sort((a, b) => a.rdm - b.rdm);

export const buildGrid = (n, m) => new Array(n).fill(
  new Array(m).fill({}),
);

export const reduceGrid = (reducerFn, init, grid) => grid.reduce((row) => row.reduce(reducerFn, init));

export const mapGrid = (mapper, grid) => grid.map((row) => row.map(mapper));

export const someGrid = (pred, grid) => grid.some((row) => row.some(pred));

export const everyGrid = (pred, grid) => grid.every((row) => row.every(pred));

export const filterGrid = (pred, grid) => grid.reduce((items, row) => items.concat(row.filter(pred)));
