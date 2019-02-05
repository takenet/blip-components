import { IServiceProvider } from 'angular';
import { AsyncTranslationLoader } from './AsyncTranslationLoader';

export class AsyncTranslationLoaderProvider implements IServiceProvider {
    ctxFn: () => {};

    useContext(ctx) {
        this.ctxFn = ctx;
    }

    $get() {
        const instance = new AsyncTranslationLoader(this.ctxFn);
        return instance;
    }
}
