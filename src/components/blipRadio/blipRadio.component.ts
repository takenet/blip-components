import angular from 'core/angular';
import template from './blipRadioView.html';
import * as uuid from 'uuid';
import { ComponentController } from '../base';
const BLIP_RADIO_PREFIX = 'blip-radio-';

/**
 * Component for styling BLiP input. To use it add an input followed by a label inside the component, e.g.:
 *
 *  <blip-radio ng-model="Model" label="Label" group="Group" value="Value">
 *   </blip-radio>
 *
 * @param {string} group - the group for the radio input
 * @param {string} label - the text that goes next to the input
 * @param {string} value - the value for the radio input
 */

class BlipRadioController extends ComponentController {
    elementId: string;

    constructor() {
        super();
        this.elementId = `${BLIP_RADIO_PREFIX}${uuid.v4()}`;
    }
}

export const BlipRadioComponent = angular
    .module('blipComponents.blipRadio', [])
    .component('blipRadio', {
        template,
        controller: BlipRadioController,
        controllerAs: '$ctrl',
        bindings: {
            disabled: '<?',
            group: '@?',
            label: '@?',
            value: '@?'
        },
        require: {
            ngModel: 'ngModel'
        }
    }).name;
