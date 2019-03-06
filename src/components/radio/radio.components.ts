import './radio.scss';
import angular from 'core/angular';

export class RadioComponent {
    public value: string;
    public checked: string;
    public ngModel: any;
    public group: string;
    public refer: string;

    constructor(private $element) {
        'ngInject';
    }

    set model(value) {
        if (this.ngModel) {
            this.ngModel.$setViewValue(value);
        }
    }
    get model() {
        return this.ngModel ? this.ngModel.$viewValue : undefined;
    }
}

export const Radio = angular
    .module('blipComponents.radio', [])
    .component('radio', {
        controller: RadioComponent,
        controllerAs: '$ctrl',
        transclude: true,
        require: {
            ngModel: '?ngModel',
        },
        bindings: {
            value: '@',
            group: '@',
            refer: '@',
            checked: '@?',
        },
        template: `
            <input ng-if="$ctrl.checked" type="radio" value="{{$ctrl.value}}" id="{{$ctrl.refer}}" name="{{$ctrl.group}}" ng-checked="{{$ctrl.checked}}" ng-model="$ctrl.model"></input>
            <input ng-if="!$ctrl.checked" type="radio" value="{{$ctrl.value}}" id="{{$ctrl.refer}}" name="{{$ctrl.group}}" ng-model="$ctrl.model"></input>
            <label class="radio circle" for="{{$ctrl.refer}}">
                <span class="big">
                    <span class="small"></span>
                </span>
                <span class="pl2" ng-transclude></span>
            </label>`,
    })
    .name;
