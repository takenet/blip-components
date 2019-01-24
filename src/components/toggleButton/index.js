import ToggleButtonView from './ToggleButtonView.html';

let ToggleButtonComponent = {
    template: ToggleButtonView,
    controllerAs: '$ctrl',
    transclude: true,
    require: {
        ngModel: 'ngModel',
    },
};

export default ToggleButtonComponent;
