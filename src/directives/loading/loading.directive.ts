import angular from 'core/angular';
import template from './LoadingView.html';

/**
 * This directive sets the content of an element to a loading spinner based on
 * a boolean value.
 *
 * @param {Boolean} loading when this value is true the contents of the element
 * are replaced by a loading spinner. When it's false, the contents are set back
 * to what they were originally.
 *
 * @ngdoc directive
 */
class Loading {
    //Directive properties
    $compile: any;
    $timeout: any;
    restrict: string = 'A';
    template: any = template;

    constructor($timeout, $compile) {
        this.$timeout = $timeout;
        this.$compile = $compile;
    }

    get scope() {
        return {
            loading: '=',
            buttonValue: '@',
        };
    }

    link(scope, element) {
        const html = element.html();

        scope.$watch('buttonValue', (buttonValue) => {
            if (buttonValue) {
                element.html(scope.buttonValue);
            }
        });

        scope.$watch('loading', (loading) => {
            if (loading) {
                element.addClass('loading');
                element.html(template);
                this.$compile(element.contents())(scope);
            } else {
                this.$timeout(() => {
                    const value = scope.buttonValue
                        ? scope.buttonValue
                        : scope.$eval(html);
                    element.removeClass('loading');
                    element.html(value);
                });
            }
        });
    }

    static factory($timeout, $compile) {
        return new Loading($timeout, $compile);
    }
}

export const LoadingDirective = angular
    .module('blipComponents.loading', [])
    .directive('loading', Loading.factory)
    .name;
