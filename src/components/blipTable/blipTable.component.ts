import angular from 'core/angular';
import { IRootElementService, IOnChangesObject, IScope } from 'angular';
import * as uuid from 'uuid';
import template from './BlipTableView.html';

const BLIP_TABLE_PREFIX = 'blip-table-';

/**
 * Usage:
 * <blip-table table-data="TableDataHere" selectable>
 *
      <column title="Column title here"
        row-param="Row parameter on TableData here" sortable></column>

      <column title="Column title here"
        row-param="Row parameter on TableData here"
        sort-by="Optional sorting parameter. If absent, row-param will be used instead" sortable></column>

      <column title="Column title here"
        row-param="Row parameter on TableData here" row-title="Optional row title on TableData here"></column>

    </blip-table>
 */
class BlipTable {
    public tableData: any[];
    public columns: any[];
    public elementId: string;
    public selectable: boolean;
    public allChecked: boolean;
    public selected: any[];

    constructor(
        private $element: IRootElementService,
        private $scope: IScope,
    ) {
        this.elementId = `${BLIP_TABLE_PREFIX}${uuid.v4()}`;
        this.columns = [];
        this.selectable = this.$element[0].hasAttribute('selectable');
    }

    $onInit() {
        if (this.selectable) {
            this.allChecked = false;
            this.selected = [];

            this.$scope.$watch('$ctrl.selected.length', (newVal: number) => {
                if (newVal && newVal === this.tableData.length) {
                    this.allChecked = true;
                }
            });
        }
    }

    $onChanges(changesObj: IOnChangesObject) {
        if (changesObj.tableData) {
            this.tableData.forEach(el => {
                if (el.checked === undefined) { el.checked = false; }
            });
            this.columns.forEach(c => c.resetSorting());
        }
    }

    itemStateChange(state: boolean, $index: number) {
        if (state) {
            this.selected.push(this.tableData[$index]);
        } else if (state === false && this.selected.includes(this.tableData[$index])) {
            this.selected.splice(this.selected.indexOf(this.tableData[$index]), 1);
        }
    }

    toggleCheckAll() {
        this.tableData.forEach((el, index) => {
            if (el.checked != this.allChecked) {
                el.checked = this.allChecked;
                this.itemStateChange(this.allChecked, index);
            }
        });
    }

    orderColumn($index) {
        const column = this.columns[$index];
        if (column.sortable) {

            this.columns.forEach((c, index) => {
                if (index != $index && c.sortable) { c.resetSorting(); }
            });
            column.toggleSorting();

            this.tableData.sort((a, b) => {
                a = a[column.sortBy || column.rowParam];
                b = b[column.sortBy || column.rowParam];

                if (a === b) { return 0; }

                if (a === undefined) { return column.sortAscending ? -1 : 1; }
                if (b === undefined) { return column.sortAscending ? 1 : -1; }

                if (typeof a === 'string') { a = a.toLowerCase(); }
                if (typeof b === 'string') { b = b.toLowerCase(); }

                return a < b ? (column.sortAscending ? -1 : 1) : (column.sortAscending ? 1 : -1);
            });
        }
    }

}

export const BlipTableComponent = angular
    .module('blipComponents.blipTable', [])
    .component('blipTable', {
        controller: BlipTable,
        controllerAs: '$ctrl',
        template,
        bindings: {
            tableData: '<',
        },
        transclude: true,
    })
    .name;
