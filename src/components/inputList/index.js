import './inputList.scss';
import controller from './InputListController';
import template from './InputListView.html';
export const Save = 'save';
export const RepeatedItem = 'inputListRepeatedItem';
export const SuccessfullyInsert = 'successfullyInsert';
export const ClearInput = 'clearInput';

export default {
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
};
