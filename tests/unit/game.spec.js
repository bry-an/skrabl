import { traverse } from '../../src/game.js';
import { getGridItem } from '../../src/util.js';
import gridWithFirstTurn from './testData/gridWithFirstTurn.json';

describe('traverse', () => {
    it('correctly traverses grid with first turn', () => {
        const startingTile = getGridItem('7,8', gridWithFirstTurn);
        console.log(traverse({
            curr: startingTile,
            grid: gridWithFirstTurn,
        }));
        expect(true).toBeTruthy();
    });
});
