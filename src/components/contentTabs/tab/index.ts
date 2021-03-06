import angular from 'core/angular';
import { IScope } from 'angular';
import { ChangeTabEvent } from '..';
import * as uuid from 'uuid';

export const TabComponent = angular
    .module('blipComponents.tabComponent', [])
    .component('tab', {
        controller: class {
            isActive: boolean;
            showTab: boolean;
            contentTabsCtrl: any;

            constructor(private $scope: IScope) {
                this.showTab = false;
                this.isActive = false;

                $scope.$on(ChangeTabEvent, ($event, currentParentTabs) => {
                    if (currentParentTabs.length) {
                        currentParentTabs.forEach(tab => {
                            tab.isActive = false;
                            tab.showTab = false;
                        });
                    }
                });
            }

            $onInit() {
                let parentCtrl = this.contentTabsCtrl;
                if (parentCtrl.tabs.length == 0) {
                    this.showTab = true;
                    this.isActive = true;
                }
                parentCtrl.tabs = parentCtrl.tabs.concat(this);
            }
        },
        controllerAs: '$ctrl',
        template: '<div class="tab-content" ng-show="$ctrl.showTab" ng-transclude></div>',
        transclude: true,
        require: {
            contentTabsCtrl: '^^contentTabs'
        },
        bindings: {
            tabTitle: '@',
            tabHref: '@?',
            onTabClick: '&?',
        }
    })
    .name;
