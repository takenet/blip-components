import { getService } from 'data/function';

/**
 * Switch component
 *
 * Usage:
 * import switchComponent from './switch';
 * angular.module('x', []).component('switch', switchComponent)
 *
 * Ex.:
 * <switch on-toggle="$ctrl.onToggleAction(value)" ng-model="$ctrl.isActive"></switch>
 */
export default class {

    constructor($scope, $state) {

        this._$scope = $scope;
        this._$state = $state;

        if (this.manualToggle) {
            this.manualToggle = this.manualToggle === "true";
        } else {
            this.manualToggle = false;
        }

        this.onToggle = this.onToggle ? this.onToggle : () => {};

        this.trueValue =
            this.ngTrueValue !== undefined ? this.ngTrueValue : true;
        this.falseValue =
            this.ngFalseValue !== undefined ? this.ngFalseValue : false;

        $scope.$watch('$ctrl.ngChecked', (ngChecked) => {
            if (ngChecked !== undefined) {
                this.isChecked = ngChecked;
            }
        });

        $scope.$watch('$ctrl.ngModel', (ngModel) => {
            if (!ngModel) return;

            ngModel.$render = () => {
                this.isChecked = ngModel.$viewValue === this.trueValue;
            };

            ngModel.$render();
        });

        this.init();
    }

    async init() {
        const area = this._$state.params.area;
        this.hasPermission = await this.PermissionsService.hasPermissions('write', area);
    }

    get PermissionsService() {
        return getService('PermissionsService');
    }

    get ToastService() {
        return getService('ToastService');
    }

    toggle(event) {
        event.stopPropagation();

        if (this.disabled) {
            return;
        }

        if (this.ngDisabled) {
            return;
        }

        if (this.manualToggle) {
            event.preventDefault();
            this.onToggle();
            return;
        }

        if ((this.ngPermission || this.ngPermission == "true") && !this.hasPermission) {
            this.ToastService.toast('danger', 'utils.errorMsg.74');
            return;
        }

        if (!this.ngModel) return;

        this.isChecked = !this.isChecked;
        let setValue = this.isChecked ? this.trueValue : this.falseValue;
        this.ngModel.$setViewValue(setValue);

        this.onToggle({ value: setValue });
    }
}
