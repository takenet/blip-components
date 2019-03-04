import angular from 'angular';
import ToggleButtonView from './ToggleButtonView.html';

export const ToggleButtonComponent = angular
    .module('blipComponents.toggleButton', [])
    .component('toggleButton', {
        template: ToggleButtonView,
        controllerAs: '$ctrl',
        transclude: true,
        require: {
            ngModel: 'ngModel',
        },
    })
    .name;
