import './materialInput.scss';
import * as angular from 'angular';
import { ITimeoutService, IScope } from 'angular';

export const ClearInput = 'clearInput';
export const BindInput = 'bindInput';

/**
 * Component for styling material input. To use it add a input followed by a label element inside the component, e.g.:
 *
 *  <material-input>
 *      <label for="reportName" translate>reports.reportName</label>
 *      <input type="text" name="reportName" ng-maxlength="30" ng-model="$ctrl.name" required>
 *       <error-messages form="$ctrl.reportForm" field="reportName" error="$ctrl.error"></error-messages>
 *   </material-input>
 *
 * @param {string} initialValue - the initial value for input
 */
export class MaterialInputComponent {
    inputBox: any;
    initialValue: string;
    autoFocus: boolean;
    constructor(
        private $element,
        private $timeout: ITimeoutService,
        private $scope: IScope,
    ) {}

    $onInit() {
        this.$scope.$on(ClearInput, () => {
            let inputBox =
                this.$element[0].querySelector('input') ||
                this.$element[0].querySelector('textarea');
            this.downLabel(inputBox);
        });

        this.$scope.$on(BindInput, () => {
            let inputBox =
                this.$element[0].querySelector('input') ||
                this.$element[0].querySelector('textarea');
            this.upLabel(inputBox);
        });
    }

    upLabel(input) {
        input.parentNode.classList.add('has-label');
    }

    downLabel(input) {
        input.parentNode.classList.remove('has-label');
    }

    $onChanges(changes) {
        this.$timeout(() => {
            let inputBox =
                this.$element[0].querySelector('input') ||
                this.$element[0].querySelector('textarea');

            if (
                inputBox &&
                (changes.initialValue && changes.initialValue.currentValue)
            ) {
                this.upLabel(inputBox);
            }
        });
    }

    $postLink() {
        this.$timeout(() => {
            let label = this.$element[0].querySelector('label');
            let inputBox =
                this.$element[0].querySelector('input') ||
                this.$element[0].querySelector('textarea');

            if (label) {
                label.addEventListener('click', () => {
                    this.upLabel(inputBox);
                    inputBox.focus();
                });
            }

            inputBox.addEventListener('blur', () => {
                if (inputBox.value.length <= 0 || this.initialValue == '') {
                    this.downLabel(inputBox);
                }
            });

            if (this.initialValue && inputBox) {
                this.upLabel(inputBox);
            }

            inputBox.addEventListener('focus', () => {
                this.upLabel(inputBox);
            });

            inputBox.focus();
            inputBox.blur();

            if (this.autoFocus) {
                window.setTimeout(() => {
                    inputBox.focus();
                }, 0);
            }
        });
    }
}

export const materialInput = {
    controller: MaterialInputComponent,
    controllerAs: '$ctrl',
    transclude: true,
    bindings: {
        initialValue: '<?',
        autoFocus: '<?',
    },
    template: `<div class="material-wrapper" ng-transclude>
    </div>`,
};
