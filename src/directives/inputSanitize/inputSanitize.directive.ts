import angular from 'core/angular';
import { ISCEService } from 'angular';
import he from 'he';

class InputSanitize {
    public restrict: string;
    public require: string;
    private typesToSanitize = ['text', 'password', 'email', 'search', 'url', 'textarea'];

    constructor(private $sce: ISCEService) {
        this.restrict = 'E';
        this.require = '?ngModel';
    }

    link(scope, element, attrs, ngModel) {
        if (ngModel) {
            ngModel.$parsers.push((value) => {
                if (this.typesToSanitize.includes(element[0].type)) {
                    return he.decode(this.$sce.getTrustedHtml(value));
                }
                return value;
            });
        }
    }

    static factory($sce) {
        return new InputSanitize($sce);
    }
}

export const InputSanitizeDirective = angular
    .module('blipComponents.InputSanitize', [])
    .directive('input', InputSanitize.factory)
    .directive('textarea', InputSanitize.factory)
    .name;
