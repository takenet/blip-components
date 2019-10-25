import angular from 'core/angular';
import template from './blipTextareaView.html';
import * as uuid from 'uuid';
import { ComponentController } from '../base';
const BLIP_TEXTAREA_PREFIX = 'blip-textarea-';

/**
 * Component for styling BLiP input. To use it add an input followed by a label inside the component, e.g.:
 *
 *  <blip-textarea ng-model="Model" label="Label" field-name="name">
 *   </blip-textarea>
 *
 * @param {string} fieldName - the name for the textarea element
 * @param {string} label - the text that goes next to the input
 */

class BlipTextareaController extends ComponentController {
    elementId: string;
    rows: string;
    autoResize: boolean;
    invalid: boolean;
    onChange: ($val) => {};

    constructor(private $element) {
        super();
        this.elementId = `${BLIP_TEXTAREA_PREFIX}${uuid.v4()}`;
    }

    $onInit() {
        this.rows = this.rows ? this.rows : '1';

        if (this.autoResize) {
            this.listenTextareaKeydown();
        }
    }

    focus() {
        let textarea = this.$element[0].querySelector(
            'textarea',
        ) as HTMLTextAreaElement;
        textarea.focus();
    }

    listenTextareaKeydown() {
        let textarea = this.$element[0].querySelector(
            'textarea',
        ) as HTMLTextAreaElement;

        textarea.addEventListener('keydown', function() {
            let element = this;

            setTimeout(function() {
                element.style.cssText = 'height:auto; padding:0';
                element.style.cssText = 'height:' + element.scrollHeight + 'px';
            }, 0);
        });
    }
}

export const BlipTextareaComponent = angular
    .module('blipComponents.blipTextarea', [])
    .component('blipTextarea', {
        template,
        controller: BlipTextareaController,
        controllerAs: '$ctrl',
        bindings: {
            disabled: '<?',
            invalid: '<?',
            fieldName: '@?',
            label: '@?',
            placeholder: '@?',
            required: '@?',
            rows: '@?',
            maxlength: '@?',
            parentForm: '=?',
            onChange: '&?',
            autoResize: '<?'
        },
        require: {
            ngModel: 'ngModel',
        },
    })
    .name;
