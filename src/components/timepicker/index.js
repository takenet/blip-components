import angular from 'core/angular';
import TimepickerView from './TimepickerView.html';
import TimepickerController from './TimepickerController';

export const TimepickerComponent = angular
    .module('blipComponents.timePicker', [])
    .component('timepicker', {
        template: TimepickerView,
        controllerAs: '$ctrl',
        controller: TimepickerController,
        transclude: true,
        require: {
            ngModel: 'ngModel',
        },
        bindings: {
            minTime: '@',
            maxTime: '@',
            step: '@',
            type: '@',
        },
    })
    .name;

