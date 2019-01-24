import './searchInput.scss';
import angular from 'angular';

export const SearchInputComponent = {
    controller: class {
        ngModel: any;
        onInputChange: any;
        input: any;

        constructor(private $document, private $timeout, private $element) {}

        focusInput() {
            if (!this.input) {
                const inputElement = this.$element[0].querySelector('#search-input-area input');
                if (!inputElement) {
                    return;
                }
                this.input = inputElement;
                this.input.addEventListener('blur', () => {
                    if (this.input.value) {
                        return;
                    }
                    this.input.classList.remove('input-focused');
                });
            }

            if (this.input.getAttribute('class').indexOf('input-focused') > -1) {
                this.input.classList.remove('input-focused');
            } else {
                this.input.classList.add('input-focused');
                this.$timeout(() => {
                    this.input.focus();
                }, 0);
            }
        }

        $onChange() {
            this.onInputChange();
        }

        set model(value) {
            if (this.ngModel) {
                this.ngModel.$setViewValue(value);
            }
        }
        get model() {
            return this.ngModel ? this.ngModel.$viewValue : undefined;
        }
    },
    controllerAs: '$ctrl',
    template: `
    <div class="search-input-container">
        <i tooltips tooltip-template="{{'utils.forms.search' | translate}}" tooltip-side="bottom" class="icon-search" ng-click="$ctrl.focusInput()"></i>
        <div id="search-input-area" ng-transclude></div>
    </div>`,
    transclude: true,
    bindings: {
        onInputChange: '&',
    },
    require: {
        ngModel: '?ngModel',
    },
};
