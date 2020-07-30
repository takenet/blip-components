import angular from 'core/angular';

class OnFailure {
    constructor() {}

    get scope() {
        return {
            onFailure: '&onFailure',
        };
    }

    link(scope, element) {
        element.bind('error', () => {
            scope.onFailure();
        });
    }

    static factory() {
        'ngInject';
        return new OnFailure();
    }
}

export const OnFailureDirective = angular
    .module('blipComponents.onFailureDirective', [])
    .directive('onFailure', OnFailure.factory).name;
