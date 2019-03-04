import './iconButton.scss';
import * as angular from 'angular';

export const iconButton = angular
    .module('blipComponents.iconButton', [])
    .component('iconButton', {
        template: `
        <button class="{{$ctrl.iconClass}} text-{{$ctrl.color}} {{$ctrl.btnSize}}" ng-disabled="$ctrl.disabled">
            <icon-dpr size="{{$ctrl.size}}" round="{{$ctrl.round}}"><span ng-transclude></span></icon-dpr>
        </button>
        `,
        controller: function() {
            'ngInject';
            this.color = this.color || 'disabled';
        },
        controllerAs: '$ctrl',
        transclude: true,
        bindings: {
            color: '@',
            size: '@',
            btnSize: '@',
            round: '@',
            iconClass: '@',
            disabled: '=?',
        },
    })
    .name;
