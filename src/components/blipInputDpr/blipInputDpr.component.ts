import angular from 'core/angular';
import template from './blipInputDprView.html';
import './blipInputDpr.scss';
import * as uuid from 'uuid';
import { ComponentController } from '../base';
const BLIP_INPUT_PREFIX = 'blip-input-';

/**
 * Component for styling BLiP input. To use it add an input followed by a label inside the component, e.g.:
 *
 *  <blip-input ng-model="Model" field-name="Name" label="Label">
 *   </blip-input>
 *
 * @param {expression} disabled - the expression that disables the input
 * @param {object} errorPromise - the promise for the error-messages directive
 * @param {string} fieldName - the attribute name for the input tag
 * @param {string} helper - text that goes below the input with recommendations for the user
 * @param {string} label - the text for the label tag
 * @param {string} max - input attribute if validation is needed
 * @param {string} maxlength - input attribute if validation is needed
 * @param {string} min - input attribute if validation is needed
 * @param {string} parentForm - the parent form for the input is necessary for validation
 * @param {string} required - if present, input is required
 * @param {string} type - the input type is necessary for validation. If not specified, takes value 'text'
 * @param {string} inputAutocomplete - the input autocomplete field for undesired browser autompletes
 * @param {string} unmaskablePassword - the expression that defines if input of type password will be unmaskable
 */

class BlipInputDprController extends ComponentController {
    type: string;
    elementId: string;
    hasError: boolean = false;
    passwordUnmasked: boolean = false;
    onChange: ($val) => {};
    disabled: boolean;

    constructor(
        private $element,
        private $timeout,
        private $translate,
        private $scope,
    ) {
        super();
        this.elementId = `${BLIP_INPUT_PREFIX}${uuid.v4()}`;
    }

    $onInit() {
        this.type = this.type || 'text';
    }

    focus() {
        let input = this.$element[0].querySelector('input') as HTMLInputElement;
        input.focus();
    }

    showPassword() {
        let input = this.$element[0].querySelector('input') as HTMLInputElement;
        input.type = 'text';
        this.passwordUnmasked = true;
    }

    hidePassword() {
        let input = this.$element[0].querySelector('input') as HTMLInputElement;
        input.type = 'password';
        this.passwordUnmasked = false;
    }
}

export const BlipInputDprComponent = angular
    .module('blipComponents.blipInputDpr', [])
    .component('blipInputDpr', {
        template,
        controller: BlipInputDprController,
        controllerAs: '$ctrl',
        bindings: {
            disabled: '<?',
            errorPromise: '=?',
            fieldName: '@',
            helper: '@?',
            label: '@',
            maxlength: '@?',
            minlength: '@?',
            max: '@?',
            min: '@?',
            parentForm: '=?',
            placeholder: '@?',
            required: '@?',
            type: '@?',
            onChange: '&?',
            inputAutocomplete: '@?',
            fieldId: '@?',
            showPasswordStrength: '<?',
            unmaskablePassword: '<?',
        },
        require: {
            ngModel: 'ngModel',
        },
    })
    .name;
