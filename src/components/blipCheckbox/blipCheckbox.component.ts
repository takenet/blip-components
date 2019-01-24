import * as angular from 'angular';
import { ITimeoutService, IScope, ICompileService } from 'angular';
import template from './blipCheckboxView.html';
import * as uuid from 'uuid';
import { INgModelController } from 'angular';
import { ComponentController } from '../base';
import './blipCheckbox.scss';
const BLIP_CHECKBOX_PREFIX = 'blip-checkbox-';

/**
 * Component for styling BLiP input. To use it add an input followed by a label inside the component, e.g.:
 *
 *  <blip-checkbox ng-model="Model" label="Label">
 *   </blip-checkbox>
 *
 * @param {string} label - the text that goes next to the input
 */

class BlipCheckboxController extends ComponentController {
  elementId: string;
  input: HTMLInputElement;
  isChecked: boolean;

  constructor(private $element, private $timeout, private $translate, $scope) {
    super();
    this.elementId = `${BLIP_CHECKBOX_PREFIX}${uuid.v4()}`;
    this.input = this.$element[0].querySelector('input');

    $scope.$watch('$ctrl.input.checked',
    (newVal) => {
      this.isChecked = newVal;
    });
  }
}

export const BlipCheckboxComponent = {
  template,
  controller: BlipCheckboxController,
  controllerAs: '$ctrl',
  bindings: {
    disabled: '<?',
    label: '@?',
  },
  require: {
    ngModel: 'ngModel',
  },
};
