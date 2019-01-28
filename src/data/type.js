/**
 * Creates an Algebraic Data Type from a dictionary of constructor names
 * and constructor parameters (array of strings).
 *
 * A type for an optional value can thus be created as:
 *
 * const Maybe = new Type({
 *   Just: ['value'],
 *   Nothing: [],
 * });
 * const { Just, Nothing } = Maybe;
 *
 * let something = Just(1);
 * let nothing = Nothing();
 *
 * something instanceof Maybe === true;
 * something instanceof Just === true;
 * something instanceof Nothing === false;
 *
 * nothing instanceof Maybe === true;
 * nothing instanceof Just === false;
 * nothing instanceof Nothing === true;
 *
 * something.value === 1;
 * nothing.value === undefined;
 *
 * @param  {Object} constructors Dictionary of constructors and constructor parameters.
 * @return {Type} generated data type with created type constructors as object keys.
 */
export default function(constructors) {
    function Type() {}

    for (let name in constructors) {
        eval(`
        var constructorName = name.toString();
        function ${name}() {
            var args = Array.prototype.slice.call(arguments);

            if (!(this instanceof ${name}))
                return new (Function.prototype.bind.apply(${name}, [null].concat(args)))();

            for (var i in args)
                this[constructors[constructorName][i]] = arguments[i];
        };

        inherit(Type, ${name});
        Type[name] = ${name};
        `);
    }

    return Type;
}

function inherit(sup, sub) { // eslint-disable-line no-unused-vars
    let C = function() {};
    C.prototype = sup.prototype;
    sub.prototype = new C();
    sub.prototype.constructor = sub;
    return sub;
}
