import * as angular from 'angular';
import foldToASCII from 'data/foldToASCII';
import CustomSelectView from './CustomSelectView.html';
import './customSelect.scss';
import {
    IRootScopeService,
    ITimeoutService,
    IWindowService,
    IScope,
} from 'angular';

export const ToggleCustomSelect = 'ToggleCustomSelect';

/**
 * This component works properly with 'selectItem' component. This component simulates
 * the behavior of the 'select' HTML element.
 *
 * The component ngModel should match one of the selectItem values.
 *
 * If you want to use it with search, you need to pass 'items' as the same array of selectItem ng-repeat.
 *
 * If the ng-repeat array is an array of object, you need to pass 'searchFor', that will search value on specific property.
 *
 * @param {string} disabled - If true disables select component
 * @param {boolean} enableSearch
 * @param {string} placeholder - The custom select placeholder
 * @param {string} inputPlaceholder - Search element placeholder
 * @param {any} items - Required if enableSearch is true
 * @param {string} searchFor - Required if items is an array o objects
 * @param {string} label - Optional. If has an label, they will be displayed on the top of selected value
 *
 */

class CustomSelect {
    arrowIcon: string;
    disabled: boolean;
    enableSearch: boolean;
    placeholder: any;
    inputPlaceholder: any;
    items: any;
    searchFor: any;
    label: string;
    $inputPLaceholder: any;
    userSearch: any;
    itemsCopy: any;
    modelViewValue: any;
    ngModel: any;
    noWrap: boolean;
    isOpen: any;
    containerElement: any;
    selectItemElement: any;
    constructor(
        private $rootScope: IRootScopeService,
        private $timeout: ITimeoutService,
        private $window: IWindowService,
        private $translate,
        private $scope: IScope,
        private $element,
    ) {
        this.arrowIcon = this.isOpen ? '\uE5C7' : '\uE5C5';

        if (this.noWrap === undefined) {
            this.noWrap = false;
        }
    }

    get isSelectDisabled() {
        return this.disabled || false;
    }

    get isSearchEnabled() {
        return this.enableSearch || false;
    }

    set model(value) {
        if (this.ngModel) {
            this.ngModel.$setViewValue(value);
        }
    }

    get model() {
        return this.ngModel ? this.ngModel.$viewValue : undefined;
    }

    get viewValue() {
        if (!this.ngModel.$viewValue) {
            this.modelViewValue = undefined;
        }

        return this.modelViewValue || this.placeholder;
    }

    get hasNoItems() {
        return this.items && this.items.length == 0;
    }

    async $onInit() {
        this.$inputPLaceholder =
            this.inputPlaceholder ||
            (await this.$translate('utils.forms.search'));

        this.$scope.$watch('$ctrl.ngModel.$viewValue', (n, o) => {
            if (n != o) {
                this.model = this.ngModel.$viewValue;
            }
        });

        this.$rootScope.$on(ToggleCustomSelect, () => {
            this.isOpen = false;
            this.resetSearchContext();
        });

        const clickOutside = (evt) => {
            let targetElement = evt.target; // clicked element

            if (
                targetElement.classList &&
                targetElement.classList.contains('has-click-action')
            ) {
                return;
            }

            if (this.isOpen) {
                this.isOpen = false;
                this.resetSearchContext();
                this.$scope.$apply();
            }
        };

        this.$window.addEventListener('click', clickOutside);
    }

    toggleOpen($event) {
        $event.stopPropagation();
        if (this.isOpen) {
            this.isOpen = false;
        } else {
            this.$rootScope.$broadcast(ToggleCustomSelect);
            this.isOpen = !this.isOpen;
        }
    }

    search() {
        if (!this.itemsCopy) {
            this.itemsCopy = angular.copy(this.items);
        }

        if (this.userSearch.length >= 1) {
            let userSearch = this.userSearch.toLowerCase();
            if (this.items instanceof Array) {
                this.items = this.itemsCopy.filter(
                    (item) =>
                        this.searchFor
                            ? item[this.searchFor]
                                  .toLowerCase()
                                  .includes(userSearch)
                            : item.toLowerCase().includes(userSearch),
                );
            } else if (this.items instanceof Object) {
                let tempItems = {};
                for (let obj in this.itemsCopy) {
                    if (obj) {
                        if (
                            this.itemsCopy[obj].$title
                                .toLowerCase()
                                .includes(userSearch)
                        ) {
                            tempItems[obj] = this.itemsCopy[obj];
                        }
                    }
                }
                this.items = tempItems;
            }
        } else {
            this.items = this.itemsCopy;
        }
    }

    private resetSearchContext() {
        if (!this.isSearchEnabled) {
            return;
        }

        this.userSearch = '';
        if (this.itemsCopy) {
            this.items = this.itemsCopy;
            this.itemsCopy = undefined;
        }
    }
}

export const CustomSelectComponent = {
    template: CustomSelectView,
    controller: CustomSelect,
    controllerAs: '$ctrl',
    bindings: {
        disabled: '<?',
        enableSearch: '<?',
        noWrap: '<?',
        placeholder: '@?',
        inputPlaceholder: '@?',
        items: '=?',
        searchFor: '@?',
        label: '@?',
    },
    require: {
        ngModel: 'ngModel',
    },
    transclude: true,
};
