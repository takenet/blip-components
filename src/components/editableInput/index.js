import './editableInput.scss';
import controller from './EditableInputController';
import template from './EditableInputView.html';

export default {
    require: {
        ngModel: '?ngModel',
    },
    template,
    controller,
    controllerAs: '$ctrl',
    transclude: true,
    bindings: {
        length: '<?',
        placeholder: '@',
        _reorderable: '@reorderable',
    },
};
