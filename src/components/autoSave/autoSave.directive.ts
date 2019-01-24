import { IRootScopeService, ITimeoutService, IPromise } from 'angular';
export const AutoSaveEvent = 'AutoSaveEvent';
const DELAY = 2000;
const SKIP_MARGIN = 1000;

export class AutoSaveDirective {
    currentTimeout: IPromise<void>;
    currentTimeoutTimestamp: number;
    scope = { model: '=ngModel' };

    constructor(
        private $rootScope: IRootScopeService,
        private $timeout: ITimeoutService,
    ) {}

    link(scope) {
        scope.$watch('model', (value) => {
            let now = Date.now();

            if (
                this.currentTimeoutTimestamp &&
                this.currentTimeoutTimestamp + SKIP_MARGIN > now
            ) {
                return;
            }

            if (this.currentTimeout) {
                this.$timeout.cancel(this.currentTimeout);
            }

            this.currentTimeout = this.$timeout(() => {
                this.$rootScope.$emit(AutoSaveEvent, { value });
            }, DELAY);

            this.currentTimeoutTimestamp = now;
        });
    }

    static factory($rootScope, $timeout) {
        return new AutoSaveDirective($rootScope, $timeout);
    }
}
