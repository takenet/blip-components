import { IRootScopeService, IScope } from 'angular';
import angular from 'core/angular';

class SelectItem {
    value: any;
    customSelectCtrl: any;
    label: any;

    constructor(
        private $rootScope: IRootScopeService,
        private $scope: IScope,
        private $timeout,
    ) {}

    $onInit() {
        this.$scope.$watch('$ctrl.customSelectCtrl.model', () => {
            if (this.customSelectCtrl.model == this.value) {
                this.customSelectCtrl.modelViewValue = this.label;
            }
        });
    }

    selectItem() {
        this.customSelectCtrl.modelViewValue = this.label;
        this.customSelectCtrl.model = this.value;
    }
}

export const SelectItemComponent = angular
    .module('blipComponents.selectItem', [])
    .component('selectItem', {
        template:
            '<div class="select-item" ng-click="$ctrl.selectItem()">{{$ctrl.label}}</div>',
        controller: SelectItem,
        controllerAs: '$ctrl',
        bindings: {
            value: '@',
            label: '@',
        },
        require: {
            customSelectCtrl: '^^customSelect',
        },
    })
    .name;
