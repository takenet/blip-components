import angular from 'core/angular';
import './savingState.scss';
import * as saveSpinner from 'assets/img/loading3.png';
export class SavingStateComponent {
    private isSaving: boolean;

    constructor(private $rootScope) {
        this.isSaving = this.$rootScope.saving;
    }
}

export const savingState = angular
    .module('blipComponents.savingState', [])
    .component('savingState', {
        controller: SavingStateComponent,
        controllerAs: '$ctrl',
        transclude: true,
        bindings: {},
        template: `<div class="saving-component">
            <div ng-show='!$ctrl.$rootScope.saving'>
                <i class="icon-true"></i>
                <span id='saving-text' translate>utils.misc.savedMsg</span>
            </div>
            <div ng-show='$ctrl.$rootScope.saving'>
                <img id='saving-img' class='spin' src="${saveSpinner}">
                <span id='saving-text' translate>utils.misc.savingMsg</span>
            </div>
        </div>`,
    })
    .name;
