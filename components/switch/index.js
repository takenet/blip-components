import './switch.scss';
import controller from './SwitchController';
import template from './SwitchView.html';
import angular from 'angular';

export const SwitchComponent = {
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
        onToggle: '&?'
    }
};

export const SwitchModule = angular
    .module('blip.components.switch', [])
    .component('switch', SwitchComponent)
    name;
