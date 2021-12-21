const dissoc = (key) => (obj) => {
    delete obj[key];
    return obj;
};
export const complement = (fn) => (...args) => !fn(...args);
export const notNil = (x) => x !== undefined && x !== null;
export const notNilAndNotFalse = (x) => notNil(x) && x !== false;
export const isTrue = (x) => x === true;
export const isFalse = complement(isTrue);
export const nil = complement(notNil);
export const T = () => true;
export const identity = (x) => x;
export const shuffle = (objs) => objs.map((o) => ({ ...o, rdm: Math.random() })).sort((a, b) => a.rdm - b.rdm).map(dissoc('rdm'));
export const allPass = (arr) => (arg) => arr.every((fn) => fn(arg));
export const anyPass = (arr) => (arg) => arr.some((fn) => fn(arg));
export const or = (...args) => args.some(notNilAndNotFalse);
export const and = (...args) => args.every(notNilAndNotFalse);
export const groupBy = (fn) => (arr) => arr.reduce((grouped, item) => {
    const grouping = fn(item);
    const currGroupingVal = grouped[grouping];
    if (!currGroupingVal) {
        grouped[grouping] = [item];
        return grouped;
    }
    grouped[grouping] = currGroupingVal.concat(item);
}, {});
export const prop = (key) => (obj) => (obj ? obj[key] : obj);
export const propOr = (fallback, key, obj) => (prop(key)(obj) !== undefined
    && prop(key)(obj) !== null
    ? prop(key)(obj)
    : fallback);
