import {
    cond, isEmpty, totalPlacedTiles, reduceGrid, traverseExisting,
} from '../../src/util';

describe('cond', () => {
    it('works as expected', () => {
        const isEven = (n) => n % 2 === 0;
        const isGreaterThan4 = (n) => n > 4;
        const printIsEven = (n) => `${n} is even`;
        const printIsGreaterThan4 = (n) => `${n} is greater than 4`;

        const test = cond([
            [isEven, printIsEven],
            [isGreaterThan4, printIsGreaterThan4],
        ]);

        expect(test(2)).toBe('2 is even');
        expect(test(5)).toBe('5 is greater than 4');
        expect(test(1)).toBe(undefined);
    });
});

describe('isEmpty', () => {
    it('functions as expected', () => {
        expect(isEmpty('')).toBe(true);
        expect(isEmpty('kittens')).toBe(false);
        expect(isEmpty([])).toBe(true);
        expect(isEmpty(['kittens'])).toBe(false);
        expect(isEmpty({})).toBe(true);
        expect(isEmpty({ name: 'kittens' })).toBe(false);
    });
    it('handles edges', () => {
        expect(isEmpty(4)).toBe(4);
    });
});

describe('reduceGrid', () => {
    it('works as expected', () => {
        const grid = [[1, 2], [3, 4], [5]];
        const gridAdder = (sum, row) => sum + row.reduce((rowSum, item) => rowSum + item);
        expect(reduceGrid(gridAdder, 0, grid)).toBe(15);
    });
});

describe('totalPlacedTiles', () => {
    it('works as expected', () => {
        const grid = [[{ placedTile: 'tile' }, { placedTile: 'another tile' }]];
        expect(totalPlacedTiles(grid)).toBe(2);
    });
});

describe('traverseExisting', () => {
    it('works as expected', () => {
        const grid = [[{ placedTile: 'tile' }, { placedTile: 'another tile' }]];
        expect(totalPlacedTiles(grid)).toBe(2);
    });
});
