import angular from 'core/angular';
import controller from './ContentBoxesController';
import template from './ContentBoxesView.html';
import './ContentBoxes.scss';

export const contentBoxes = angular
    .module('blipComponents.contentBoxes', [])
    .component('contentBoxes', {
        controller,
        template,
        bindings: {
            ngModel: '<',
            maxDepth: '<',
            childLevelItems: '<?',
            hideMenu: '<?',
            onSave: '&',
            blankMenuError: '&?',
            boxMenuError: '&?',
        },
    })
    .name;
