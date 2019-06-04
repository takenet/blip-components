import { EventEmitter } from 'shared/EventEmitter';
import angular from 'core/angular';

import './sortingArrows.scss';
import SortingArrowsView from './SortingArrowsView.html';

export enum SortingOrder {
    Ascending = 'asc',
    Descending = 'desc',
    None = 'none'
}

export interface SortingParameters {
    order: SortingOrder;
    category: string;
}

export default class SortingArrowsController {
    public ngModel: any;
    public category: string = undefined;
    public label: string = undefined;
    public disabled: boolean;
    public orderEnum: Object;
    public onToggleOrder: ($event) => void;

    constructor() {
        this.orderEnum = {
            ...SortingOrder
        };
    }

    /**
     * Toggle order of arrow and set new ngModel
     */
    toggleOrder() {
        const newOrder =
            (this.isFirstToggle() || this.model.order === SortingOrder.Descending)
                ? SortingOrder.Ascending
                : SortingOrder.Descending;

        this.model = {
            category: this.category,
            order: newOrder
        };

        if (this.onToggleOrder !== undefined) {
            this.onToggleOrder(EventEmitter({ ...this.model }));
        }
    }

    /**
     * Check if first toggle, either after page load or arrow's values reset
     *
     * @return whether arrow is receiving a fresh first toggle or not
     */
    isFirstToggle() {
        return !this.model
            || this.model.category !== this.category
            || this.model.order === undefined
            || this.model.order === SortingOrder.None;
    }

    /**
     * Set arrow's ngModel
     *
     * @param value - new value
     */
    set model(value) {
        if (this.ngModel) {
            this.ngModel.$setViewValue(value);
        }
    }

    /**
     * Get arrow's current ngModel
     */
    get model() {
        return this.ngModel ? this.ngModel.$viewValue : undefined;
    }
}

export const SortinArrowsComponent = angular
    .module('blipComponents.sortingArrows', [])
    .component('sortingArrows', {
        template: SortingArrowsView,
        controller: SortingArrowsController,
        controllerAs: '$ctrl',
        bindings: {
            category: '@?',
            label: '@?',
            disabled: '<?',
            onToggleOrder: '&?'
        },
        require: {
            ngModel: 'ngModel',
        },
    })
    .name;
