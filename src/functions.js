const dissoc = (key) => (obj) => {
    delete obj[key];
    return obj;
};
const notNil = (x) => x !== undefined && x !== null && x !== false;
export const T = () => true;
export const identity = (x) => x;
export const shuffle = (objs) => objs.map((o) => ({ ...o, rdm: Math.random() })).sort((a, b) => a.rdm - b.rdm).map(dissoc('rdm'));
export const complement = (fn) => (...args) => !fn(...args);
export const allPass = (arr) => (arg) => arr.every((fn) => fn(arg));
export const anyPass = (arr) => (arg) => arr.some((fn) => fn(arg));
export const or = (...args) => args.some(notNil);
