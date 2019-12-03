import angular from 'core/angular';
import './ConfusionMatrix.scss';
import template from './ConfusionMatrixView.html';

class ConfusionMatrix {
    public titles: Array<string>;
    public values: any;
    public body: any;
    public matrix: any;
    public keys: any;
    public borderColor: string = '2px solid #F9B42F';
    constructor() {
        this.keys = this.keys.reduce((arr, el) => [...arr, el.name], []);
        this.keys = this.keys.map(
            (key) =>
                key && key.length > 13 ? key.slice(0, 14).concat('...') : key,
        );
        this.matrix = this.matrix.map((el, index) => {
            const arr = this.getRow(el);
            return [].concat({ value: this.keys[index], percent: -1 }, arr);
        });
    }

    getRow(arr) {
        const sum = arr.reduce((sum, n) => sum + n, 0) || 1;
        return arr.map((el) => ({
            value: el,
            percent: (el / sum).toFixed(2),
        }));
    }

    handleRowClick(target) {
        const node =
            target.nodeName == 'TD'
                ? <Element>target
                : <Element>target.parentNode;
        if (node.classList.contains('header')) {
            const list = Array.from(
                (node.parentNode as HTMLTableRowElement).querySelectorAll('td'),
            );
            list.map((el, index) => {
                el.style.borderTop = this.borderColor;
                el.style.borderBottom = this.borderColor;
                el.style.borderRight =
                    index === list.length - 1 ? this.borderColor : 'none';
            });
            return true;
        }
        return false;
    }

    handleColumnClick(event, cellIndex) {
        this.clearNodes();
        const target = event.target;
        target.style.borderLeft = this.borderColor;
        target.style.borderRight = this.borderColor;
        const body = target.parentNode.parentNode.parentNode.querySelector(
            'tbody',
        );
        const list = Array.from(body.querySelectorAll('tr'));
        list.map((el: HTMLTableRowElement, index) => {
            const cell = el.querySelector(
                `td:nth-child(${cellIndex + 2})`,
            ) as HTMLTableCellElement;
            cell.style.borderLeft = this.borderColor;
            cell.style.borderRight = this.borderColor;
            cell.style.borderBottom =
                index === list.length - 1 ? this.borderColor : 'none';
        });
    }

    select(rowId, event, index) {
        this.clearNodes();
        const target = event.target as HTMLTableDataCellElement;
        if (this.handleRowClick(target)) {
            return;
        }
        const row =
            target.nodeName == 'TD'
                ? <Element>target.parentNode
                : <Element>target.parentNode.parentNode;
        this.highlightRow(row, index);
        this.highlightColumn(row.parentNode, rowId, index);
        this.highlightHeader(row.parentNode.parentNode, index);
    }

    highlightColumn(body, rowId, cellIndex) {
        const selectedRows = Array.from(body.querySelectorAll('tr')).filter(
            (el, index) => index <= rowId,
        );
        selectedRows.map((el: HTMLTableRowElement) => {
            const cell = el.querySelector(
                `.cell:nth-child(${cellIndex + 1})`,
            ) as HTMLTableCellElement;
            cell.style.borderLeft = this.borderColor;
            cell.style.borderRight = this.borderColor;
        });
    }

    highlightRow(row, cellIndex) {
        const cells = Array.from(
            row.querySelectorAll(
                `.header, .cell:nth-child(-n + ${cellIndex + 1}`,
            ),
        );
        cells.map((el: HTMLTableCellElement, index: number) => {
            el.style.borderTop = this.borderColor;
            el.style.borderBottom = this.borderColor;
            el.style.borderRight =
                index === cells.length - 1 ? this.borderColor : 'none';
        });
    }

    highlightHeader(table, cellIndex) {
        const header = table.querySelector(
            `thead .col:nth-child(${cellIndex + 1})`,
        );
        header.style.border = this.borderColor;
        header.style.borderBottom = 'none';
    }

    clearNodes() {
        const cellList = Array.from(
            document.querySelectorAll(
                '.matrix-table .cell, .matrix-table .header, .matrix-table thead .col',
            ),
        );
        cellList.map(
            (element: HTMLTableCellElement) => (element.style.border = 'none'),
        );
    }
}

export const ConfusionMatrixComponent = angular
    .module('blipComponents.confusionMatrix', [])
    .component('confusionMatrix', {
        controller: ConfusionMatrix,
        controllerAs: '$ctrl',
        template,
        bindings: {
            matrix: '<',
            keys: '<',
        },
    })
    .name;
