import angular from 'core/angular';
import './Accordion.scss';

export const accordion = angular
    .module('blipComponents.accordion', [])
    .component('accordion', {
        template: `
        <article class="accordion relative">
            <input type="checkbox" checked />
            <i class="accordion-chevron fr"></i>
            <h4 class="accordion-title ma0 ttu" ng-bind="$ctrl.title"></h4>
            <div class="accordion-content relative overflow-hidden" ng-transclude></div>
        </article>
        `,
        controllerAs: '$ctrl',
        transclude: true,
        bindings: {
            title: '@',
        },
    })
    .name;
