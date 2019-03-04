export const sidenavMenu = angular
    .module('blipComponents.sidenavMenu', [])
    .component('sidenavMenu', {
        template: `
        <ol ng-class="{'ordered': $ctrl.isOrdered}"
            ng-transclude
            >
        </ol>
        `,
        controller: class {
            get isOrdered() {
                return typeof this.ordered === 'string';
            }
        },
        controllerAs: '$ctrl',
        transclude: true,
        bindings: {
            ordered: '@',
        },
    })
    .name;
