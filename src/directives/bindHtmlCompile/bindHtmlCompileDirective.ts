import angular from 'core/angular';

class BindHtmlCompile {
    restrict = 'A';

    constructor(private $compile: angular.ICompileService) {
    }

    link(scope, element, attrs) {
        scope.$watch(
            (scope) => {
                return scope.$eval(attrs.bindHtmlCompile);
            }, (value) => {
                element.html(value && value.toString());
                this.$compile(element.contents())(scope);
            });
    }

    static factory($compile) {
        'ngInject';

        return new BindHtmlCompile($compile);
    }
}

export const BindHtmlCompileDirective = angular
    .module('blipComponents.bindHtmlCompile.fileModel', [])
    .directive('bindHtmlCompile', BindHtmlCompile.factory)
    .name;
