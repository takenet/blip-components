import angular from 'core/angular';
import { BlipInput } from 'blip-toolkit';
import { ComponentController } from '../base';
import * as uuid from 'uuid';
import { EventEmitter } from 'shared/EventEmitter';
import { IOnChangesObject } from 'angular';

const BLIP_INPUT_PREFIX = 'blip-input';

enum BlipInputCallback {
    OnInputFocus = 'onInputFocus',
    OnInputBlur = 'onInputBlur',
    OnInputChange = 'onInputChange',
    OnInputError = 'onInputError',
}

class BlipInputController extends ComponentController {
    onInputFocus: (obj) => void;
    onInputBlur: (obj) => void;
    onInputChange: (obj) => void;
    onInputError: (obj) => void;
    blipInputId: string;
    blipInputInstance: BlipInput;
    id: string;
    name: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    minLength: number;
    maxLength: number;
    showPasswordStrength: boolean;
    requiredErrorMsg: string;
    maxLengthErrorMsg: string;
    minLengthErrorMsg: string;
    emailTypeErrorMsg: string;
    urlTypeErrorMsg: string;
    disabled: boolean;

    constructor(
        private $element,
        private $scope,
    ) {
        super();
        this.blipInputId = `${BLIP_INPUT_PREFIX}-${uuid.v4()}`;
        this.blipInputInstance = new BlipInput({
            id: this.id || this.blipInputId,
            name: this.name || this.blipInputId,
            type: this.type || 'text',
            placeholder: this.placeholder || '',
            required: this.required || false,
            minLength: this.minLength || 0,
            maxLength: this.maxLength,
            showPasswordStrength: this.showPasswordStrength || false,
            requiredErrorMsg: this.requiredErrorMsg,
            maxLengthErrorMsg: this.maxLengthErrorMsg,
            minLengthErrorMsg: this.minLengthErrorMsg,
            emailTypeErrorMsg: this.emailTypeErrorMsg,
            urlTypeErrorMsg: this.urlTypeErrorMsg,
            onInputFocus: this.handle.bind(this, BlipInputCallback.OnInputFocus),
            onInputBlur: this.handle.bind(this, BlipInputCallback.OnInputBlur),
            onInputChange: this.handle.bind(this, BlipInputCallback.OnInputChange),
            onInputError: this.handle.bind(this, BlipInputCallback.OnInputError),
        });

        const inputElement = this.blipInputInstance.render({
            value: this.model || '',
            label: this.label || '',
            disabled: this.disabled || false,
        });

        this.$element[0].children[0].appendChild(inputElement);

        this.$scope.$watch('$ctrl.model', (model) => {
            if (this.blipInputInstance) {
                this.updateInstance(model);
            }
        });
    }

    $onChanges(changesObj: IOnChangesObject) {
        if (
            changesObj.options &&
            !changesObj.options.isFirstChange()
        ) {
            this.blipInputInstance.render({
                label: this.label,
            });
        }
    }

    handle(type: BlipInputCallback, emitter) {
        this.updateModel();

        switch (type) {
            case BlipInputCallback.OnInputFocus:
                this.handleOnInputFocus(emitter);
                break;
            case BlipInputCallback.OnInputBlur:
                this.handleOnInputBlur(emitter);
                break;
            case BlipInputCallback.OnInputChange:
                this.handleOnInputChange(emitter);
                break;
            case BlipInputCallback.OnInputError:
                this.handleOnInputError(emitter);
        }
    }

    handleOnInputFocus($event) {
        const event = {
            ...$event,
            id: this.blipInputId,
            element: this.blipInputInstance
        };
        if (this.onInputFocus) {
            this.onInputFocus(EventEmitter(event));
        }
    }

    handleOnInputBlur($event) {
        const event = {
            ...$event,
            id: this.blipInputId,
            element: this.blipInputInstance
        };
        if (this.onInputBlur) {
            this.onInputBlur(EventEmitter(event));
        }
    }

    handleOnInputChange($event) {
        const event = {
            value: $event
        };
        if (this.onInputChange) {
            this.onInputChange(EventEmitter(event));
        }
    }

    handleOnInputError($event) {
        const event = {
            ...$event
        };
        if (this.onInputError) {
            this.onInputError(EventEmitter(event));
        }
    }

    updateInstance(model) {
        this.blipInputInstance.render({
            value: model || '',
        });
    }

    updateModel() {
        this.model = this.blipInputInstance.props.value;
    }
}

export const BlipInputComponent = angular
    .module('blipComponents.blipInput', [])
    .component('blipInput', {
        template: '<div id="{{$ctrl.blipInputId}} class="blip-input"></div>',
        controller: BlipInputController,
        controllerAs: '$ctrl',
        bindings: {
            id: '@?',
            name: '@?',
            label: '@?',
            type: '@?',
            placeholder: '@?',
            required: '<?',
            minLength: '<?',
            maxLength: '<?',
            showPasswordStrength: '<?',
            requiredErrorMsg: '@?',
            maxLengthErrorMsg: '@?',
            minLengthErrorMsg: '@?',
            emailTypeErrorMsg: '@?',
            urlTypeErrorMsg: '@?',
            onInputFocus: '&?',
            onInputBlur: '&?',
            onInputChange: '&?',
            onInputError: '&?',
            disabled: '<?'
        },
        require: {
            ngModel: 'ngModel',
        },
    })
    .name;
