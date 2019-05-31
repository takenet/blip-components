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

    constructor($scope, PermissionsService, ngToast, $translate) {
        'ngInject';

        this._$scope = $scope;
        this._permissionsService = PermissionsService;
        this._ngToast = ngToast;
        this._$translate = $translate;
        if (!this.manualToggle) this.manualToggle = false;
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
        this.hasPermission = await this._permissionsService.hasPermissions(
            'write',
        );
    }

    toggle(event) {
        event.stopPropagation();

        if (this.disabled) {
            return;
        }

        if (this.ngPermission=="false" && !this.hasPermission) {
            const errorMsg74 = this._$translate.instant('utils.errorMsg.74');
            this._ngToast.danger(errorMsg74);
            return;
        }

        if (this.manualToggle) {
            event.preventDefault();
            this.onToggle();
            return;
        }

        if (!this.ngModel) return;

        this.isChecked = !this.isChecked;
        let setValue = this.isChecked ? this.trueValue : this.falseValue;
        this.ngModel.$setViewValue(setValue);

        this.onToggle({ value: setValue });
    }
}
