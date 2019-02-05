export class AsyncTranslationLoader {
    constructor(ctxsFn?) {
        return (options) => {
            const { key: locale } = options;

            if (!ctxsFn) {
                return import(`./translationLoaders/${locale}.js`)
                    .then(module => module.default);
            }

            return new Promise(r => r(ctxsFn(locale)));
        };
    }
}
