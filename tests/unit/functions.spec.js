import {
    and, allPass, groupBy, nil, notNil, or, notNilAndNotFalse,
} from '../../src/functions.js';

describe('allPass', () => {
    it('functions as expected', () => {
        const greaterThan4 = (x) => x > 4;
        const lessThanEleven = (x) => x < 11;
        const between5And10 = allPass([greaterThan4, lessThanEleven]);
        expect(between5And10(7)).toBe(true);
        expect(between5And10(12)).toBe(false);
    });
});

describe('groupBy', () => {
    it('functions as expected', () => {
        const groupingFn = (item) => (item.grade < 60 ? 'F' : 'P');
        const students = [{ name: 'winston', grade: 100 }, { name: 'kittens', grade: 40 }];
        expect(groupBy(groupingFn)(students)).toStrictEqual({
            F: [{ name: 'kittens', grade: 40 }],
            P: [{ name: 'winston', grade: 100 }],
        });
    });
});

describe('nil', () => {
    it('functions as expected', () => {
        expect(nil(null)).toBe(true);
        expect(nil(undefined)).toBe(true);
        expect(nil('')).toBe(false);
    });
});

describe('notNil', () => {
    it('functions as expected', () => {
        expect(notNil('kittens')).toBe(true);
        expect(notNil({})).toBe(true);
        expect(notNil(null)).toBe(false);
        expect(notNil(undefined)).toBe(false);
    });
});

describe('notNilAndNotFalse', () => {
    it('functions as expected', () => {
        expect(notNilAndNotFalse({})).toBe(true);
        expect(notNilAndNotFalse(0)).toBe(true);
        expect(notNilAndNotFalse(null)).toBe(false);
        expect(notNilAndNotFalse(false)).toBe(false);
    });
});

describe('or', () => {
    it('functions as expected', () => {
        expect(or(false, false, true)).toBe(true);
        expect(or(false, false)).toBe(false);
        expect(or(false, {})).toBe(true);
        expect(or(null, undefined, false)).toBe(false);
        expect(or(null, undefined, false, 0)).toBe(true); // 0 truthy, on the fence about diverging from how JS handles 0
    });
});

describe('and', () => {
    it('functions as expected', () => {
        expect(and(false, false, true)).toBe(false);
        expect(and(true, true)).toBe(true);
    });
});
