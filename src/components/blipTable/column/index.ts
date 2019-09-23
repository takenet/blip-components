import angular from 'core/angular';
import { IScope, IRootElementService } from 'angular';
// import { ChangeTabEvent } from '..';

class BlipColumn {
    public sortable: boolean;
    public sortAscending: boolean;
    private tableCtrl: any;

    constructor(
        private $element: IRootElementService,
    ) {
        this.sortable = this.$element[0].hasAttribute('sortable');
    }

    $onInit() {
        this.tableCtrl.columns = this.tableCtrl.columns.concat(this);
        if (this.sortable) {
            this.resetSorting();
        }
    }

    toggleSorting() {
        this.sortAscending = this.sortAscending ? false : true;
    }

    resetSorting() {
        this.sortAscending = undefined;
    }
}

export const ColumnComponent = angular
    .module('blipComponents.columnComponent', [])
    .component('blipColumn', {
        controller: BlipColumn,
        controllerAs: '$ctrl',
        template: '',
        transclude: true,
        require: {
            tableCtrl: '^^blipTable',
        },
        bindings: {
            rowParam: '@',
            rowTitle: '@?',
            rowClass: '@?',
            title: '@',
            columnClass: '@?',
            sortBy: '@?',
        }
    })
    .name;
