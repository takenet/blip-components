import angular from 'core/angular';
import './inputList.scss';
import controller from './InputListController';
import template from './InputListView.html';
export const Save = 'save';
export const RepeatedItem = 'inputListRepeatedItem';
export const SuccessfullyInsert = 'successfullyInsert';
export const ClearInput = 'clearInput';

export const inputList = angular
    .module('blipComponents.inputList', [])
    .component('inputList', {
        require: {
            ngModel: '?ngModel',
        },
        template,
        controller,
        controllerAs: '$ctrl',
        transclude: true,
        bindings: {
            maxItems: '<?',
            length: '<?',
            height: '<?',
            placeholder: '@',
            addItems: '<?',
            editItems: '<?',
            blockRepeatedItems: '<?',
            limitSpecialChars: '<?',
            _reorderable: '@reorderable',
            allowMultipleLines: '<?',
            cardMaxChars: '<?',
            cardMaxLines: '<?',
        },
    })
    .name;
