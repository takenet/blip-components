Object.defineProperty(Object.prototype, 'getProp', {
    value: function(...args) {
        return args.reduce(
            (pos, curr) => (pos && pos[curr] ? pos[curr] : undefined),
            this,
        );
    },
});
