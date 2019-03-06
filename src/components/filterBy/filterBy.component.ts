import angular from 'core/angular';
import template from './FilterByView.html';

/**
 * Generic filter component.
 *
 * Receives a hash object, where key is filter name and value is an array that contents the items to be filtered.
 *
 * @param {filters}: Object - Filters to be displayed
 * @param {items}: Array - Items array to be showed on chips component
 *
 */

class FilterBy {
    onAddItem: ({}) => {};
    onRemoveItem: ({}) => {};
    filters: { [name: string]: {}[]; };
    formFilters = {};
    items: string[];

    $addItem($item, $key) {
        if (this.onAddItem) {
            this.onAddItem({ $item, $key });
        }
    }

    $removeItem($item, $removedItem) {
        if (this.onRemoveItem) {
            this.onRemoveItem({ $item, $removedItem });
        }
    }
}

export const FilterByComponent = angular
    .module('blipComponents.filterBy', [])
    .component('filterBy', {
        controller: FilterBy,
        controllerAs: '$ctrl',
        template,
        bindings: {
            onAddItem: '&?',
            onRemoveItem: '&?',
            filters: '<?',
            items: '<?',
        },
    })
    .name;
