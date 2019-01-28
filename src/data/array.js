// Immutable splice
export const immutableSplice = (arr, start, deleteCount, ...items) => {
    return [
        ...arr.slice(0, start),
        ...items,
        ...arr.slice(start + deleteCount),
    ];
};

export const generateArrayOfNumbers = (n) =>
    Array.from({ length: n }, (v, k) => k);

// Subtract array function
export const subtract = (a) => (b) =>
    a.filter((item) => item.text == b.text).length == 0;

/**
 * Group by helper function
 * @param {Array} xs
 * @param {String} key
 */
export const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);

        return rv;
    }, {});
};

// Mutating remove
Array.prototype.remove = function(x) {
    this.splice(this.indexOf(x), 1);
};

// Immutable remove
Array.prototype.removeItem = function(element) {
    return this.filter((e) => e !== element);
};

/**
 * Remove last element from array and return new array
 */
Array.prototype.removeLast = function() {
    return this.slice(0, this.length - 1);
};

Array.prototype.diff = function(a) {
    return this.filter((x) => a.indexOf(x) < 0);
};

Array.prototype.hasRepeatedItem = function() {
    let buffer = [];
    let i;

    for (i = 0; i < this.length; i++) {
        buffer.concat(this[i]);
        if (buffer.indexOf(this[i]) > -1) return true;
    }

    return false;
};

Object.defineProperty(Array.prototype, 'last', {
    get: function() {
        return this.length > 0 ? this[this.length - 1] : undefined;
    },
});

/**
 * Groups element in an array by a specific grouping function
 * @param  {Function} fn grouping function. Must return the group of an element in the array
 * @return {Object} grouped up array where keys are group names and values are
 * lits of elements in such group
 */
Array.prototype.groupBy = function(fn) {
    return this.reduce(
        (xs, x) => ({
            ...xs,
            [fn(x)]: xs[fn(x)] ? [...xs[fn(x)], x] : [x],
        }),
        {},
    );
};

/**
 * Remove duplicates from states list by sorting it and
 * remaking the list only with elements which are sequentially different
 * @param  {Function} fn grouping function
 * @return {Array<T>} array with duplicates removed/grouped by the specified function
 */
Array.prototype.nubBy = function(fn) {
    return this.map(fn)
        .sort()
        .reduce((xs, x) => (xs[0] === x ? xs : [x, ...xs]), []);
};

/**
 * Remove duplicates from states list by sorting it and
 * remaking the list only with elements which are sequentially different
 * @return {Array<T>} array with duplicates removed
 */
Array.prototype.nub = function() {
    return this.sort().reduce((xs, x) => (xs[0] === x ? xs : [x, ...xs]), []);
};

Array.prototype.getProp = function(...args) {
    return args.reduce(
        (pos, curr) => (pos && pos[curr] ? pos[curr] : undefined),
        this,
    );
};

/**
 * Prototype that makes possible make an async map and return a Promise
 */
Array.prototype.mapAsync = function(fn) {
    const thenables = this.reduce((...args) => args[0].concat(fn.apply(...args)), []);

    return Promise.all(thenables);
};
