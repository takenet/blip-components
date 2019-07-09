import angular from 'core/angular';
import { IRepeatScope, ITimeoutService } from 'angular';

class OnFinishRender {

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

        return new OnFinishRender($timeout);
    }
}

export const OnFinishRenderDirective = angular
    .module('blipComponents.onFinishRenderDirective', [])
    .directive('onFinishRender', OnFinishRender.factory)
    .name;
