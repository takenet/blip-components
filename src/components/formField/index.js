import './formField.scss';

export default {
    template: `
    <div class="form-group">
        <label class="field-label" ng-if="$ctrl.label !== undefined" ng-bind="$ctrl.label"></label>
        <div ng-class="{ 'small': $ctrl.isSmall }" ng-transclude></div>
    </div>
    `,
    controllerAs: '$ctrl',
    controller: class {
        get isSmall() {
            return typeof this.small === 'string';
        }
    },
    transclude: true,
    bindings: {
        name: '@',
        label: '@',
        small: '@',
    },
};
