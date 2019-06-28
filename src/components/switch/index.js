import angular from 'core/angular';
import './switch.scss';
import controller from './SwitchController';
import template from './SwitchView.html';

export const SwitchComponent = angular
    .module('blipComponents.switch', [])
    .component('switch', {
        template,
        controller,
        controllerAs: '$ctrl',
        transclude: true,
        require: {
            ngModel: '?ngModel',
        },
        bindings: {
            ngChecked: '=?',
            ngTrueValue: '=?',
            ngFalseValue: '=?',
            ngPermission: '@',
            onToggle: '&?',
            manualToggle: '@?',
        }
    })
    .name;
