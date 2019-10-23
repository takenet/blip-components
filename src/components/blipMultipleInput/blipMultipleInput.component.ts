import angular from 'core/angular';
import template from './blipMultipleInput.html';
import './BlipMultipleInput.scss';
import { IFormController } from 'angular';

class BlipMultipleInputController {
    onError: () => {};
    onDelete: ($index: number) => {};
    multipleInputsForm: IFormController;
    ngModel: any;
    inputPlaceholder: string;
    inputLabel: string;
    addButtonText: string = 'utils.misc.addButtonDefault';

    set model(value) {
        if (this.ngModel) {
            this.ngModel.$setViewValue(value);
        }
    }
    get model(): any[] {
        return this.ngModel ? this.ngModel.$viewValue : undefined;
    }

    $onInit() { }

    saveInput(value, index) {
        this.model[index] = value;
    }

    addNewItem() {
        this.model = this.model.concat('');
    }

    delete(index) {
        this.model = this.model.filter((_, i) => i != index);
    }
}

export const BlipMultipleInputComponent = angular
    .module('blipComponents.blipMultipleInput', [])
    .component('blipMultipleInput', {
        template,
        controller: BlipMultipleInputController,
        controllerAs: '$ctrl',
        bindings: {
            onDelete: '&?',
            inputPlaceholder: '@?',
            inputLabel: '@?',
            addButtonText: '@?',
        },
        require: {
            ngModel: 'ngModel',
        },
    })
    .name;
