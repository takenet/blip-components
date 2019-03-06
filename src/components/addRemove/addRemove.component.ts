import angular from 'core/angular';
import * as styles from './addRemove.module.scss';

class AddRemoveController {
    /**
     * Define if remove button is visible
     */
    showRemove: boolean;
    /**
     * Define if add button is visible
     */
    showAdd: boolean;
    /**
     * Styles object
     */
    styles: any;

    constructor() {
        this.styles = styles;
    }

    get $showAdd() {
        return typeof this.showAdd == 'undefined' ? true : this.showAdd;
    }

    get $showRemove() {
        return typeof this.showRemove == 'undefined' ? true : this.showRemove;
    }
}

export const AddRemoveComponent = angular
    .module('blipComponents.addRemove', [])
    .component('addRemove', {
        template: `
        <span ng-click="$ctrl.onAdd()" ng-if="$ctrl.$showAdd" ng-class="$ctrl.styles.button" class="br-100 background-light-blip no-style">+</span>
        <span ng-click="$ctrl.onRemove()" ng-if="$ctrl.$showRemove" ng-class="$ctrl.styles.button" class="br-100 background-light-blip no-style">-</span>
        `,
        controller: AddRemoveController,
        controllerAs: '$ctrl',
        bindings: {
            showAdd: '<?',
            showRemove: '<?',
            onAdd: '&',
            onRemove: '&',
        },
    })
    .name;
