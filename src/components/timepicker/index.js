import TimepickerView from './TimepickerView.html';
import TimepickerController from './TimepickerController';

let TimepickerComponent = {
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
};

export default TimepickerComponent;
