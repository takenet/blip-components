import angular from 'angular';

export const accordion = angular
    .module('blipComponents.accordion', [])
    .component('accordion', {
        template: `
        <article class="accordion relative">
            <input type="checkbox" checked />
            <i class="accordion-chevron fr"></i>
            <h6 class="accordion-title ma0" ng-bind="$ctrl.title"></h6>
            <div class="accordion-content relative overflow-hidden dim" ng-transclude></div>
        </article>
        `,
        controllerAs: '$ctrl',
        transclude: true,
        bindings: {
            title: '@',
        },
    })
    .name;
