import './card.scss';
import template from './CardView.html';
import angular from 'core/angular';
import { IStateService } from 'angular-ui-router';
import { ITranscludeFunction } from 'angular';

/**
 * Component to encapsulate a content with card design.
 * Ex. with card-footer:
 * <card item-title="The amazing card title">
        Card content goes here
        <card-footer>
            Card footer goes here
        </card-footer>
    </card>
*/

interface ICardComponentBindings {
    itemTitle: string;
    collapsable: boolean;
    aditionalInfo: string;
    sref: string;
    sparams: any;
    // showOptions: Boolean;
    onEdit: () => void;
    onExclude: () => void;
}

interface ICardComponentController extends ICardComponentBindings {
    $onCardExclude(): void;
    $onCardEdit(): void;
    $toggleCollapse(): void;
    $onInit(): void;
}

class CardComponentController implements ICardComponentController {
    onEdit: () => void;
    onExclude: () => void;
    showOptions;
    cardInfo: string;
    sparams: any;
    sref: string;
    collapsable: boolean;
    collapsed: any;
    itemTitle: string;
    aditionalInfo: string;

    constructor(private $state: IStateService, private $transclude: ITranscludeFunction) {}

    get href() {
        return this.$state.href(this.sref, this.sparams);
    }

    get hasTitle() {
        return this.itemTitle && typeof this.itemTitle === 'string';
    }

    get showContent() {
        return !this.collapsed && this.collapsable;
    }

    get showCardOptions() {
        return this.showOptions != undefined ? this.showOptions : false;
    }

    get hasCardOptions(): Boolean {
        return this.$transclude.isSlotFilled('cardOptions');
    }

    $onCardExclude() {
        this.onExclude();
    }

    $onCardEdit() {
        this.onEdit();
    }

    $toggleCollapse() {
        this.collapsed == true
            ? (this.collapsed = false)
            : (this.collapsed = true);
    }

    $onInit() {
        this.collapsed = true;
    }
}

//
export const CardComponent = angular
    .module('blipComponents.card', [])
    .component('card', {
        template,
        controller: CardComponentController,
        controllerAs: '$ctrl',
        bindings: {
            itemTitle: '@',
            collapsable: '<?',
            aditionalInfo: '@?',
            sref: '@?',
            sparams: '<?',
            onEdit: '&?',
            onExclude: '&?',
            cardInfo: '@?',
            showOptions: '<?',
        },
        transclude: {
            cardFooter: '?cardFooter',
            cardOptions: '?cardOptions',
        },
    })
    .name;
