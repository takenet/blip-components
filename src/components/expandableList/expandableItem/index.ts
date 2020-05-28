import '../expandableList.scss';
import template from './ExpandableItemView.html';
import angular from 'core/angular';

export class ExpandableItemComponent {
    expandableListCtrl: any;
    isActive: boolean;
    hasArrow: boolean;
    onOpen: (event: any) => {};
    constructor(private $element, private $timeout) {}

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

    deactivate() {
        this.isActive = false;
    }

    open(event) {
        this.toggleActive();
        this.expandableListCtrl.toggleItem(this);

        if (this.onOpen && this.isActive) { this.onOpen(event); }
    }
}

export const ExpandableItem = angular
    .module('blipComponents.expandableItem', [])
    .component('expandableItem', {
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
            isActive: '<?',
        },
        template
    })
    .name;
