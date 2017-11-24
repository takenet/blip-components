import './card.scss';
import CardView from './CardView.html';

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
let CardComponent = {
    template: CardView,
    controller: class {
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

export default CardComponent;
