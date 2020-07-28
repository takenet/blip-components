import angular from 'core/angular';

class OnError {
    constructor() {}

    get scope() {
        return {
            onError: '&onError',
        };
    }

    link(scope, element, attrs) {
        element.bind('error', () => {
            scope.onError();
        });
    }

    static factory() {
        'ngInject';
        return new OnError();
    }
}

export const OnErrorDirective = angular
    .module('blipComponents.onErrorDirective', [])
    .directive('onError', OnError.factory).name;
