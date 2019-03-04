import * as angular from 'angular';
import template from './ContentTabsView.html';
import { IScope } from 'angular';
import './contentTabs.scss';
export const ChangeTabEvent = 'contentTabs:changeTab';
import { EventEmitter } from 'shared/EventEmitter';

/**
 * Usage:
 * <content-tabs>
        <tab tab-title="Tab title here">
            Content of tab here
        </tab>
        <tab tab-title="Tab title here">
            Content of tab here
        </tab>
    </content-tabs>
 */
export const contentTabs = angular
    .module('blipComponents.contentTabs', [])
    .component('contentTabs', {
        controller: class {
            tabs: any[];
            onChangeTab: ($event) => void;
            constructor(private $rootScope: IScope) {
                this.tabs = [];
            }

            showTab(tab) {
                if (!tab.disabled && !tab.tabHref) {
                    this.$rootScope.$broadcast(ChangeTabEvent);
                    tab.showTab = true;
                    tab.isActive = true;
                    if (this.onChangeTab) {
                        const pos = this.tabs.findIndex(
                            (t) => t.tabTitle === tab.tabTitle,
                        );
                        this.onChangeTab(EventEmitter({ pos }));
                    }
                }
            }
        },
        controllerAs: '$ctrl',
        template,
        bindings: {
            onChangeTab: '&?',
        },
        transclude: true,
    })
    .name;
