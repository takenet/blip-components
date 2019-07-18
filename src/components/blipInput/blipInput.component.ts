import angular from 'core/angular';
import { BlipInput } from 'blip-toolkit';
import { ComponentController } from '../base';
import * as uuid from 'uuid';
import { EventEmitter } from 'shared/EventEmitter';
import { IOnChangesObject } from 'angular';
import { filterUndefinedProperties } from 'data/function';

const BLIP_INPUT_PREFIX = 'blip-input';

enum BlipInputCallback {
    OnFocus = 'onFocus',
    OnBlur = 'onBlur',
    OnChange = 'onChange',
    OnError = 'onError',
}

class BlipInputController extends ComponentController {
    onFocus: (obj) => void;
    onBlur: (obj) => void;
    onChange: (obj) => void;
    onError: (obj) => void;
    blipInputId: string;
    blipInputInstance: BlipInput;
    id: string;
    name: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    autocomplete: string;
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
            id: this.id,
            name: this.name || this.blipInputId,
            type: this.type || 'text',
            placeholder: this.placeholder || '',
            required: this.required || false,
            autocomplete: this.autocomplete,
            minLength: this.minLength || 0,
            maxLength: this.maxLength,
            showPasswordStrength: this.showPasswordStrength || false,
            requiredErrorMsg: this.requiredErrorMsg,
            maxLengthErrorMsg: this.maxLengthErrorMsg,
            minLengthErrorMsg: this.minLengthErrorMsg,
            emailTypeErrorMsg: this.emailTypeErrorMsg,
            urlTypeErrorMsg: this.urlTypeErrorMsg,
            onFocus: this.handle.bind(this, BlipInputCallback.OnFocus),
            onBlur: this.handle.bind(this, BlipInputCallback.OnBlur),
            onChange: this.handle.bind(this, BlipInputCallback.OnChange),
            onError: this.handle.bind(this, BlipInputCallback.OnError),
        });

        const inputElement = this.blipInputInstance.render({
            value: this.model || '',
            label: this.label || '',
            disabled: this.disabled || false,
        });

        this.$element[0].children[0].appendChild(inputElement);

        // this.$scope.$watch('$ctrl.model', (model) => {
        //     if (this.blipInputInstance) {
        //         this.updateInstance(model);
        //     }
        // });
    }

    $onChanges(changesObj: IOnChangesObject) {
        const { disabled, invalid, label, model } = changesObj;
        const relevantChanges = filterUndefinedProperties({
            disabled: disabled ? disabled.currentValue : undefined,
            invalid: invalid ? invalid.currentValue : undefined,
            label: label ? label.currentValue : undefined,
            model: model ? model.currentValue : undefined,
        });

        if (this.blipInputInstance) {
            this.blipInputInstance.render(relevantChanges);
        }
    }

    handle(type: BlipInputCallback, emitter) {
        this.updateModel();

        switch (type) {
            case BlipInputCallback.OnFocus:
                this.handleOnFocus(emitter);
                break;
            case BlipInputCallback.OnBlur:
                this.handleOnBlur(emitter);
                break;
            case BlipInputCallback.OnChange:
                this.handleOnChange(emitter);
                break;
            case BlipInputCallback.OnError:
                this.handleOnError(emitter);
        }
    }

    handleOnFocus($event) {
        const event = {
            ...$event,
            id: this.blipInputId,
            element: this.blipInputInstance
        };
        if (this.onFocus) {
            this.onFocus(EventEmitter(event));
        }
    }

    handleOnBlur($event) {
        const event = {
            ...$event,
            id: this.blipInputId,
            element: this.blipInputInstance
        };
        if (this.onBlur) {
            this.onBlur(EventEmitter(event));
        }
    }

    handleOnChange($event) {
        const event = {
            value: $event
        };
        if (this.onChange) {
            this.onChange(EventEmitter(event));
        }
    }

    handleOnError($event) {
        const event = {
            ...$event
        };
        if (this.onError) {
            this.onError(EventEmitter(event));
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
        template: '<div id="{{$ctrl.blipInputId}}" class="blip-input"></div>',
        controller: BlipInputController,
        controllerAs: '$ctrl',
        bindings: {
            id: '@?',
            name: '@?',
            label: '@?',
            type: '@?',
            placeholder: '@?',
            required: '<?',
            autocomplete: '@?',
            minLength: '<?',
            maxLength: '<?',
            showPasswordStrength: '<?',
            requiredErrorMsg: '@?',
            maxLengthErrorMsg: '@?',
            minLengthErrorMsg: '@?',
            emailTypeErrorMsg: '@?',
            urlTypeErrorMsg: '@?',
            onFocus: '&?',
            onBlur: '&?',
            onChange: '&?',
            onError: '&?',
            disabled: '<?',
            invalid: '<?',
            parentForm: '=?',
        },
        require: {
            ngModel: 'ngModel',
        },
    })
    .name;
