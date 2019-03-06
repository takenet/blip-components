import angular from 'core/angular';
import './scrollContent.scss';

export const ScrollContentComponent = angular
    .module('blipComponents.scrollContent', [])
    .component('scrollContent', {
        template: `
        <div class="scroll-content" ng-style="$ctrl.style" ng-transclude></div>
        `,
        controller: class {
            get style() {
                return {
                    'max-height':
                        typeof this.height === 'number'
                            ? `${this.height}px`
                            : 'auto',
                };
            }
        },
        controllerAs: '$ctrl',
        transclude: true,
        bindings: {
            height: '<',
        },
    })
    .name;
