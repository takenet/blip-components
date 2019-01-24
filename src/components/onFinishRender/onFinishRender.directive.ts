import { IRepeatScope, ITimeoutService } from 'angular';

export class OnFinishRenderDirective {
    restrict = 'A';

    constructor(private $timeout: ITimeoutService) {}

    link(scope: IRepeatScope, element, attr) {
        if (scope.$last === true) {
            this.$timeout(() => {
                scope.$eval(attr.onFinishRender);
            });
        }
    }

    static factory($timeout) {
        'ngInject';

        return new OnFinishRenderDirective($timeout);
    }
}
