import angular from 'core/angular';
import { IRootElementService, IOnChangesObject, IScope } from 'angular';
import { ComponentController } from '../base';
import * as uuid from 'uuid';
import template from './BlipTableView.html';
import { throws } from 'assert';

const BLIP_TABLE_PREFIX = 'blip-table-';

/**
 * Usage:
 * <blip-table table-data="TableDataHere" selectable>
     <column name="Column name here" row-param="Row parameter on TableData here" sortable></column>
     <column name="Column name here" row-param="Row parameter on TableData here" row-title="Row title on TableData here"></column>
   </blip-table>
 */
class BlipTable {
    public tableData: any[];
    public columns: any[];
    public elementId: string;
    public selectable: boolean;
    public allChecked: boolean;
    public selected: number[];

    constructor(
        private $element: IRootElementService,
        private $scope: IScope,
    ) {
        this.elementId = `${BLIP_TABLE_PREFIX}${uuid.v4()}`;

        this.columns = [];

        this.selectable = this.$element[0].hasAttribute('selectable') ? true : false;
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
                if (el.checked === undefined) {
                    el.checked = false;
                }
            });
        }
    }

    itemStateChange(state: boolean, $index: number) {
        if (state) {
            this.selected.push($index);
        } else if (state === false && this.selected.includes($index)) {
            this.selected.splice(this.selected.indexOf($index), 1);
        }
    }

    orderColumn(attrName: string, ascending: boolean) {
        if (ascending) {
            this.tableData.sort((a, b) => a[attrName] < b[attrName] ? -1 : 1);
        } else {
            this.tableData.sort((a, b) => a[attrName] < b[attrName] ? 1 : -1);
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
