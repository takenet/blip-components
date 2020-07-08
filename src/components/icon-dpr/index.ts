// /**
//  * DEPRECATED: Use <icon> component instead
//  */
import './icon-dpr.scss';
import angular from 'core/angular';

export const iconDpr = angular
    .module('blipComponents.iconDpr', [])
    .component('iconDpr', {
        template: '<i class="{{$ctrl.classes}}" ng-transclude></i>',
        controller: class {
            classes: string;
            size: string;
            iconClass: string;
            avatar: string;
            border: string;
            round: string;

            $onInit() {
                this.size = this.size || 's';
                this.classes = this.iconClass
                    ? `icon icon-${this.iconClass}`
                    : `icon icon-material icon-${this.size}`;

                if (this.avatar) {
                    this.classes += ' icon-avatar';
                }

                if (this.border) {
                    this.classes += ' icon-border';
                }

                if (this.round) {
                    this.classes += ' round';
                }
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
