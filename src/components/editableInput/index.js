import angular from 'core/angular';
import './editableInput.scss';
import controller from './EditableInputController';
import template from './EditableInputView.html';

export const editableInput = angular
    .module('blipComponents.editableInput', [])
    .component('editableInput', {
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
    })
    .name;
