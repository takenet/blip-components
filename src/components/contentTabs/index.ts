import template from './ContentTabsView.html';
import './contentTabs.scss';
import * as angular from 'angular';

/**
 * Usage:
 * import contentTabs from './contentTabs';
 * import tab from './contentTabs/tab';
 *
 * angular.module('x', [])
 *  .component('contentTabs', contentTabs)
    .component('tab', tab);
 *
 * Ex.:
 * <content-tabs>
        <tab tab-title="Tab title here">
            Content of tab here
        </tab>
        <tab tab-title="Tab title here">
            Content of tab here
        </tab>
    </content-tabs>
 */

export const ContentTabsComponent = {
    controller: class {
        tabs: any[];
        constructor(private $rootScope) {
            this.tabs = [];
        }

        showTab(tab) {
            if (!tab.tabHref) {
                this.$rootScope.$broadcast('ChangeTab');
                tab.showTab = true;
                tab.isActive = true;
            }
        }
    },
    controllerAs: '$ctrl',
    template,
    transclude: true
};

export const ContentTabsModule = angular
    .module('blip.components.contentTabs', [])
    .component('contentTabs', ContentTabsComponent)
    .name;
