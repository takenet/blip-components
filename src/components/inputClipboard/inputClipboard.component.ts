import angular from 'core/angular';
import './inputClipboard.scss';

class InputClipboard {
    onCopy: () => any;
    ngModel: any;
    constructor(private clipboard) {}

    copyToClipboard() {
        this.clipboard.copyText(this.model);
        if (this.onCopy) {
            this.onCopy();
        }
    }

    set model(value) {
        if (this.ngModel) {
            this.ngModel.$setViewValue(value);
        }
    }
    get model() {
        return this.ngModel ? this.ngModel.$viewValue : undefined;
    }
}

export const InputClipboardComponent = angular
    .module('blipComponents.inputClipboard', [])
    .component('inputClipboard', {
        template: `
        <div class="input-clipboard-container">
            <input ng-model="$ctrl.model" readonly><button ng-click="$ctrl.copyToClipboard()" class="icon-copy no-style"></button>
        </div>`,
        controller: InputClipboard,
        controllerAs: '$ctrl',
        bindings: {
            onCopy: '&?',
        },
        require: {
            ngModel: '?ngModel',
        },
    })
    .name;
