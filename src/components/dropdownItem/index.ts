import * as angular from 'angular';
import { DropdownItemController } from './DropdownItemController';
import template from './DropdownItemView.html';

/**
 * dropdown-item component
 * @param {string} itemTitle        - The item title (if has one)
 * @param {boolean} hideIcon        - Hide right icon bullet that indicates if is menu open or closed
 * @param {string} customIcon       - Custom icon class to show on the side of itemTitle (or alone, if has no title). The customIcon should be one of blip-icons list,
 *                                  without 'icon-' prefix.
 * @param {boolean} hideUpIcon      - Hide up icon of dropdown container
 * @param {string} align            - Could be left | right | center
 * @param {string} direction        - Could be bottom | top
 * @param {number} minWidth         - Min width of dropdown container
 * @param {number} maxHeight        - Max height of dropdown container. Using this parameter may add scroll behavior to dropdown
 * @param {string} buttonClasses    - Classes to be added on internal button
 * @param {boolean} closeOnClick    - Determines if menu should close when content is clicked
 * @param {expression} onOpen       - Callback when dropdown is opened
 */
export const dropdownItem = angular
    .module('blipComponents.dropdownItem', [])
    .component('dropdownItem', {
        bindings: {
            itemTitle: '@',
            hideIcon: '<?',
            customIcon: '@?',
            hideUpIcon: '<?',
            align: '@?',
            direction: '<?',
            minWidth: '<?',
            maxHeight: '@?',
            buttonClasses: '@?',
            closeOnClick: '<?',
            onOpen: '&?',
        },
        transclude: true,
        controller: DropdownItemController,
        controllerAs: '$ctrl',
        template,
    })
    .name;
