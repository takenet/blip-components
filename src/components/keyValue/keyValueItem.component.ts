import angular from 'core/angular';
import template from './KeyValueItemView.html';
import { EventEmitter } from 'shared/EventEmitter';
import { IRootScopeService, IScope, IController } from 'angular';

class KeyValueItemController implements IController {
    onDelete: (obj: any) => {};
    onKeyChanges: (obj: any) => {};
    onValueChanges: (obj: any) => {};
    onToggleValue: (obj: any) => {};
    ngModel: any;
    key: any;
    value: any;
    keyPlaceholder: string;
    valuePlaceholder: string;
    expandable: boolean;
    editorLanguage: string;

    constructor(private $scope: IScope, private $rootScope: IRootScopeService) {
        if (this.expandable) {
            this.editorLanguage = 'plain text';
        }
    }

    $onInit() {
        this.$scope.$watch('$ctrl.key', ($newKey, $oldKey) => this.onKeyChanges({ $newKey, $oldKey }));
        this.$scope.$watch('$ctrl.value', ($newValue, $oldValue) => this.onValueChanges({ $newValue, $oldValue }));
    }

    set model(value) {
        if (this.ngModel) {
            this.ngModel.$setViewValue(value);
        }
    }
    get model() {
        return this.ngModel ? this.ngModel.$viewValue : undefined;
    }

    delete() {
        this.onDelete({
            $key: this.key,
            $value: this.value,
        });
    }

    toggleExpandValue() {
        if (this.onToggleValue) {
            if (this.key && this.key.toLowerCase().indexOf('ssml') !== -1) {
                this.editorLanguage = 'xml';
            } else {
                this.editorLanguage = 'plain text';
            }

            this.onToggleValue(EventEmitter({
                model: this.model,
                editorLanguage: this.editorLanguage,
            }));
        }
    }
}

export const KeyValueItemComponent = angular
    .module('blipComponents.keyValueItem', [])
    .component('keyValueItem', {
        template,
        controller: KeyValueItemController,
        controllerAs: '$ctrl',
        bindings: {
            key: '@',
            value: '@',
            keyPlaceholder: '<',
            valuePlaceholder: '<',
            formReference: '<',
            expandable: '<?',
            editorLanguage: '<?',
            onDelete: '&',
            onKeyChanges: '&',
            onValueChanges: '&',
            onToggleValue: '&?',
        },
        require: {
            ngModel: 'ngModel',
        },
    })
    .name;
