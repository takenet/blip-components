import angular from 'core/angular';
import { IScope, IRootElementService } from 'angular';
// import { ChangeTabEvent } from '..';

class BlipColumn {
    sortable: boolean;
    sortAscending: boolean;
    tableCtrl: any;

    constructor(
        private $scope: IScope,
        private $element: IRootElementService,
    ) {
        this.sortable = this.$element[0].hasAttribute('sortable') ? true : false;
        this.sortAscending = undefined;
    }

    $onInit() {
        this.tableCtrl.columns = this.tableCtrl.columns.concat(this);
    }
}

export const ColumnComponent = angular
    .module('blipComponents.columnComponent', [])
    .component('blipColumn', {
        controller: BlipColumn,
        controllerAs: '$ctrl',
        template: '<th ng-transclude></th>',
        transclude: true,
        require: {
            tableCtrl: '^^blipTable',
        },
        bindings: {
            rowParam: '@',
            rowTitle: '@?',
        }
    })
    .name;
