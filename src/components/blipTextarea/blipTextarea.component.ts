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
    onChange: ($val) => {};

    constructor(private $element) {
        super();
        this.elementId = `${BLIP_TEXTAREA_PREFIX}${uuid.v4()}`;
    }

    $onInit() {
        this.rows = this.rows ? this.rows : '2';
    }

    focus() {
        let textarea = this.$element[0].querySelector(
            'textarea',
        ) as HTMLTextAreaElement;
        textarea.focus();
    }
}

export const BlipTextareaComponent = {
    template,
    controller: BlipTextareaController,
    controllerAs: '$ctrl',
    bindings: {
        disabled: '<?',
        fieldName: '@?',
        label: '@?',
        placeholder: '@?',
        required: '@?',
        rows: '@?',
        maxlength: '@?',
        parentForm: '=?',
        onChange: '&?',
    },
    require: {
        ngModel: 'ngModel',
    },
};
