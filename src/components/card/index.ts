import './card.scss';
import CardView from './CardView.html';
import * as angular from 'angular';

/**
 * Usage:
 * import card from './card';
 * angular.module('x', []).component('card', card)
 *
 * Component to encapsulate a content with card design.
 *
 * Ex. with card-footer:
 * <card item-title="The amazing card title">
        Card content goes here
        <card-footer> <!-- Optional -->
            Card footer goes here
        </card-footer>
    </card>
 */
export const CardComponent = {
    template: CardView,
    controller: class {
        collapsable: boolean;
        collapsed: any;
        itemTitle: boolean;
        sparams: any;
        sref: any;
        $state: any;

        constructor($state) {
            this.$state = $state;
        }

        get href() {
            return this.$state.href(this.sref, this.sparams);
        }

        get hasTitle() {
            return (this.itemTitle && typeof this.itemTitle === 'string');
        }

        get showContent() {
            return (!this.collapsed && this.collapsable);
        }

        toggleCollapse() {
            this.collapsed == true ? this.collapsed = false : this.collapsed = true;
        }

        $onInit() {
            this.collapsed = true;
        }
    },
    controllerAs: '$ctrl',
    transclude: {
        'cardFooter': '?cardFooter',
    },
    bindings: {
        itemTitle: '@',
        collapsable: '<?',
        aditionalInfo: '@?',
        onEdit: '&?',
        onExclude: '&?',
        sref: '@?',
        sparams: '<?'
    },
};

export const CardModule = angular
    .module('blip.components.card', [])
    .component('card', CardComponent)
    .name;
