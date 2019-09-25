import angular from 'angular';
import { IRootElementService } from 'angular';
import { BlipTableController } from '../blipTable.component';

export class BlipColumnController {
    public sortable: boolean;
    public sortAscending: boolean;
    public rowParam: string;
    public sortBy: string;
    private tableCtrl: BlipTableController;

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
        controller: BlipColumnController,
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
            width: '@?',
        }
    })
    .name;
