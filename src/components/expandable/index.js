import Type from 'data/type';
import angular from 'core/angular';

export const { Collapse, Expand, Toggle } = Type({
    Collapse: [],
    Expand: [],
    Toggle: [],
});

export const expandable = angular
    .module('blipComponents.expandable', [])
    .component('expandable', {
        transclude: true,
        template: `
        <div ng-style="$ctrl.style" ng-transclude></div>
        <button ng-click="$ctrl.toggle()"
            ng-show="!$ctrl.collapsed || ($ctrl.collapsed && $ctrl.needsExpansion)"
            type="button"
            class="no-style"
            >
            ...
        </button>
        `,
        controller: class {
            constructor($element, $scope, $timeout) {
                'ngInject';

                this.$element = $element;
                this.$timeout = $timeout;
                this.$scope = $scope;

                this.$scope.$on(Collapse, () => (this.collapsed = true));
                this.$scope.$on(Expand, () => (this.collapsed = false));
                this.$scope.$on(Toggle, () => this.toggle());
            }

            $onInit() {
                this._initialCollapsed = this.collapsed !== false;
                this.collapsed = this._initialCollapsed;
                this.$timeout(() =>
                    this.$timeout(
                        () =>
                            (this.collapsed =
                                this._initialCollapsed && this.needsExpansion),
                    ),
                );
            }

            toggle() {
                this.collapsed = !this.collapsed;
            }

            get needsExpansion() {
                const div = this.$element.find('div')[0];
                return (
                    div.scrollHeight > div.offsetHeight ||
                    div.scrollWidth > div.offsetWidth
                );
            }

            get style() {
                return this.collapsed
                    ? {
                        'white-space': 'nowrap',
                        'text-overflow': 'ellipsis',
                        overflow: 'hidden',
                        'max-height': this.height || '1.6em',
                    }
                    : {
                        'white-space': 'inherit',
                        overflow: 'inherit',
                        'max-height': 'auto',
                    };
            }
        },
        controllerAs: '$ctrl',
        bindings: {
            title: '@?',
            height: '@?',
            collapsed: '=?',
        },
    })
    .name;
