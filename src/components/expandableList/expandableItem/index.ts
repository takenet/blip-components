import '../ExpandableList.scss';
import template from './ExpandableItemView.html';
export class ExpandableItemComponent {
    expandableListCtrl: any;
    isActive: boolean = false;
    hasArrow: boolean;
    constructor( private $element, private $timeout) {
    }

    $onInit() {
        this.expandableListCtrl.addItem(this);
        this.$timeout(() => {
            const el = this.$element[0];
            this.hasArrow = el.querySelector('item-body') ? true : false;
        });
    }

    toggleActive() {
        this.isActive = !this.isActive;
    }

    open(event) {
        this.toggleActive();
        this.expandableListCtrl.toggleItem(this);
    }
}

export const ExpandableItem = {
    controller: ExpandableItemComponent,
    transclude: {
        itemHeader: '?itemHeader',
        itemBody: '?itemBody',
    },
    require: {
        expandableListCtrl: '^^expandableList'
    },
    bindings: {
        extras: '<?',
        headerItems: '@?',
        bodyItems: '@?',
    },
    template
};
