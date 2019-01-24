import template from './ChipsView.html';
import { Component } from 'decorators';
import './_chips.scss';

@Component({
    selector: 'chips',
    inputs: ['data', 'hideRemove'],
    outputs: ['onRemove'],
    controllerAs: '$ctrl',
    template: `
    <div class="custom-chips" ng-repeat="item in $ctrl.data">
        {{item.text}} <icon-dpr ng-if="!$ctrl.hideRemove" size="xs" class="remove-chip" ng-click="$ctrl.removeItem(item)">&#xE5CD;</icon-dpr>
    </div>`,
})
export class ChipsComponent {
    data: any;
    hideRemove: boolean;
    onRemove: (obj: any) => {};
    constructor() {}

    removeItem(item) {
        this.data = this.data.filter((x) => x.text != item.text);
        this.onRemove({ $data: this.data, $removedItem: item });
    }
}
