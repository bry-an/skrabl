import { allPass } from '../../src/functions.js';

describe('allPass', () => {
    it('functions as expected', () => {
        const greaterThan4 = (x) => x > 4;
        const lessThanEleven = (x) => x < 11;
        const between5And10 = allPass([greaterThan4, lessThanEleven]);
        expect(between5And10(7)).toBe(true);
        expect(between5And10(12)).toBe(false);
    });
});
