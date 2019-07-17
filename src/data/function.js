/**
 * Function composition, f(g(...)), f of g.
 * @param  {Function} g Function to compose with `this` function.
 * @return {Function} composed function.
 */
Function.prototype.map = function(g) {
    let f = this;
    return function(...args) {
        return f(g(...args));
    };
};

Function.prototype.compose = Function.prototype.map;

Function.prototype.partial = function(...args) {
    let f = this;
    return function(...restArgs) {
        return f(...args, ...restArgs);
    };
};

/**
 * Constant function.
 */
Function.of = function(x) {
    return function() {
        return x;
    };
};

/*
* memoize.js
* by @philogb and @addyosmani
* with further optimizations by @mathias
* and @DmitryBaranovsk
* perf tests: http://bit.ly/q3zpG3
* Released under an MIT license.
*/
export function memoize(fn) {
    if (typeof fn !== 'function')
        throw new Error('memoize must be called with a function as parameter');

    return function(...args) {
        let hash = '';
        let i = args.length;
        let currentArg = undefined;

        while (i--) {
            currentArg = args[i];
            hash +=
                currentArg === Object(currentArg)
                    ? JSON.stringify(currentArg)
                    : currentArg;
        }

        fn.memoize || (fn.memoize = {});

        return hash in fn.memoize
            ? fn.memoize[hash]
            : (fn.memoize[hash] = fn.apply(this, args));
    };
}

export function memoize1(fn) {
    if (typeof fn !== 'function')
        throw new Error('memoize must be called with a function as parameter');

    return function(...args) {
        let hash = '';
        let i = args.length;
        let currentArg = undefined;

        while (i--) {
            currentArg = args[i];
            hash +=
                currentArg === Object(currentArg)
                    ? JSON.stringify(currentArg)
                    : currentArg;
        }

        fn.memoize || (fn.memoize = {});

        if (hash !== fn.memoize.hash) {
            fn.memoize = { hash, value: fn.apply(this, args) };
        }

        return fn.memoize.value;
    };
}

export const getElement = (path, val) =>
    path.reduce((pos, curr) => (pos && pos[curr] ? pos[curr] : undefined), val);

/**
 * Sort attendance tags array
 */
export const sortTags = (a, b) => {
    const textA = a.text.toLowerCase();
    const textB = b.text.toLowerCase();
    if (textA < textB) {
        return -1;
    }
    if (textA > textB) {
        return 1;
    }
    return 0;
};

/**
 * Functions to made a functionl switch case
 */
const executeIfFunction = (f) => (typeof f === 'function' ? f() : f);

export const switchcase = (cases) => (defaultCase) => (key) =>
    cases.hasOwnProperty(key) ? cases[key] : defaultCase;

export const switchcaseF = (cases) => (defaultCase) => (key) =>
    executeIfFunction(switchcase(cases)(defaultCase)(key));


/**
 * Function to sort by string value
 */
export const sortByStringValue = (a, b) => {
    let x = a.value.toLowerCase(),
        y = b.value.toLowerCase();
    return x < y ? -1
        : x > y ? 1
            : 0;
};

/**
 * Runs a function in a separate thread by using a Web Worker, allowing long running functions to not block the UI.
 * @param {Function} fn
 */
export const runAsync = (fn) => {
    const worker = new Worker(
        URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
            type: 'application/javascript; charset=utf-8',
        }),
    );
    return new Promise((res, rej) => {
        worker.onmessage = ({ data }) => {
            res(data), worker.terminate();
        };
        worker.onerror = (err) => {
            rej(err), worker.terminate();
        };
    });
};

/**
 * Creates a debounced function that delays invoking the provided function until at least ms milliseconds have elapsed since the last time it was invoked.
 * @param {Function} fn - function to be invoked
 * @param {Number} ms - delay (in milliseconds)
 */
export const debounce = (fn, ms = 0, immediate = false) => {
    let timeoutId;
    return function(...args) {
        let later = () => {
            timeoutId = null;
            !immediate && fn.apply(this, args);
        };
        const callNow = immediate && !timeoutId;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(later, ms);
        if (callNow) fn.apply(this, args);
    };
};

/**
 * Creates a throttled function that only invokes the provided function at most once per every wait milliseconds
 * @param {Function} fn - function to be invoked
 * @param {Number} wait - delay (in milliseconds)
 */
export const throttle = (fn, wait) => {
    let inThrottle, lastFn, lastTime;
    return function() {
        const context = this,
            args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function() {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, wait - (Date.now() - lastTime));
        }
    };
};

/**
 * Convert String to HTMLElement
 * @param {String} str - string to be converted to dom
 */
export const strToEl = (str) => {
    const tmpEl = document.createElement('div');
    const cleanedInput = str.trim();
    let r;
    tmpEl.innerHTML = cleanedInput;
    r = tmpEl.children[0];

    while (tmpEl.firstChild) {
        tmpEl.removeChild(tmpEl.firstChild);
    }

    return r;
};

/**
 * Get angular service from current application
 * @param {String} serviceName - AngularJs service registered name
 * @returns {IService}
 */
export const getService = (serviceName) => {
    if (!window.angular) {
        throw new Error('AngularJs instance is not available');
    }

    const $injector = window.angular.element(document).injector();

    if ($injector) {
        return $injector.get(serviceName);
    }
};


/**
 * Return new object with all undefined properties' keys filtered out
 */
export const filterUndefinedProperties = (obj) => {
    return obj && Object.keys(obj)
        .filter(key => obj[key] !== undefined)
        .reduce((newObj, key) => {
            newObj[key] = obj[key];
            return newObj;
         }, {});
}
