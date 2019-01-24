import { IRootScopeService, IScope } from 'angular';
import { ToggleCustomSelect } from '../customSelect.component';

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

export const SelectItemComponent = {
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
};
