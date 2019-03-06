import angular from 'core/angular';
import './ActionsBar.scss';
import template from './ActionsBarView.html';

class ActionsBarController {
    isBarOpen: boolean;

    constructor(private $timeout, private $rootScope, $scope) {
        this.isBarOpen = false;

        $scope.$on('$stateChangeSuccess', () => {
            this.isBarOpen = false;
        });
    }
}

export const ActionsBarComponent = angular
    .module('blipComponents.actionsBar', [])
    .component('actionsBar', {
        template,
        controller: ActionsBarController,
        controllerAs: '$ctrl',
        transclude: true,
        bindings: {
            isBarOpen: '=?',
        },
    })
    .name;
