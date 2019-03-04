// /**
//  * DEPRECATED: Use <icon> component instead
//  */
import './icon-dpr.scss';
import * as angular from 'angular';

export const iconDpr = angular
    .module('blipComponents.iconDpr', [])
    .component('iconDpr', {
        template: '<i class="{{$ctrl.classes}}" ng-transclude></i>',
        controller: function() {
            'ngInject';
            this.size = this.size || 's';
            this.classes = this.iconClass
                ? `icon icon-${this.iconClass}`
                : `icon icon-material icon-${this.size}`;

            if (typeof this.avatar === 'string') {
                this.classes += ' icon-avatar';
            }

            if (typeof this.border === 'string') {
                this.classes += ' icon-border';
            }

            if (typeof this.round === 'string') {
                this.classes += ' round';
            }
        },
        controllerAs: '$ctrl',
        transclude: true,
        bindings: {
            size: '@',
            avatar: '@',
            border: '@',
            round: '@',
            iconClass: '@?',
        },
    })
    .name;
