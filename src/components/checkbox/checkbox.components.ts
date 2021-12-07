import './checkbox.scss';
import * as uuid from 'uuid';
import angular from 'core/angular';

export class CheckboxComponent {
    uniqueId: string;
    public ngModel: any;
    public refer: string;
    public group: string;
    public checkbox: any;
    public icon: any;
    public disabled: boolean;

    constructor(private $element) {
        'ngInject';
    }

    $onInit() {
        this.uniqueId = uuid.v4();
    }

    set model(value) {
        if (this.ngModel) {
            this.ngModel.$setViewValue(value);
        }
    }

    get model() {
        return this.ngModel ? this.ngModel.$viewValue : undefined;
    }

    get inputId() {
        return this.refer || this.uniqueId;
    }
}

export const Checkbox = angular
    .module('blipComponents.checkbox', [])
    .component('checkbox', {
        controller: CheckboxComponent,
        controllerAs: '$ctrl',
        transclude: true,
        require: {
            ngModel: 'ngModel',
        },
        bindings: {
            group: '@?',
            refer: '@?',
            disabled: '<?',
        },
        template: `<div class="checkbox-wrapper">
                <input type="checkbox"
                    id="{{$ctrl.inputId}}"
                    name="{{$ctrl.group}}"
                    ng-model="$ctrl.model"
                    ng-disabled="$ctrl.disabled"
                    ></input>
                <label for="{{$ctrl.inputId}}" class="flex items-center">
                    <i class="lh-solid" ng-class="{'icon-selectoff-1': !$ctrl.model, 'icon-selecton': $ctrl.model, 'disabled': $ctrl.disabled }"></i> <span class="text-gray ml3 flex items-center" ng-transclude></span>
                </label>
            </div>`,
    })
    .name;
