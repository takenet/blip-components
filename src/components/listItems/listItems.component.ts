/**
 * Usage:
 * <list-items>
        <list-item><h3>List item</h3></list-item>
        <list-item><h3>List item</h3></list-item>
    </list-items>
 */
class ListItems {
    isSelectedAll: any;
    items: any[];

    constructor() {
        this.items = []; //Used in children listItem component
    }

    toggleSelectAll() {
        if (this.isSelectedAll) {
            this.selectAll();
        } else {
            this.unSelectAll();
        }
    }

    selectAll() {
        this.items = this.items.map((x) => {
            x.isChecked = true;

            return x;
        });
    }

    unSelectAll() {
        this.items = this.items.map((x) => {
            x.isChecked = false;

            return x;
        });
    }
}

export const ListItemsComponent = {
    controller: ListItems,
    controllerAs: '$ctrl',
    template: `
    <div>
        <span ng-if="$ctrl.selectAll"><checkbox ng-click="$ctrl.toggleSelectAll()" ng-model="$ctrl.isSelectedAll"><span translate>utils.misc.selectAll</span></checkbox>
    </div>
    <div ng-transclude></div>`,
    transclude: true,
    bindings: {
        selectAll: '<?',
    },
};
