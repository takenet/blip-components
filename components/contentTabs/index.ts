import template from './ContentTabsView.html';
import { IScope } from 'angular';
import './contentTabs.scss';

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

export default {
    controller: class {
        tabs: any[];
        constructor(private $rootScope: IScope) {
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