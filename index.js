import { CardComponent } from './components/card';
import { SwitchComponent } from './components/switch';
import { ContentTabsComponent } from './components/contentTabs';
import { TabComponent } from './components/contentTabs/tab';
import { PageHeaderDirective } from './components/pageHeader/PageHeaderDirective';

(function(angular){
    angular
        .module('blip.components', [])
        .component('card', CardComponent)
        .component('switch', SwitchComponent)
        .component('contentTabs', ContentTabsComponent)
        .component('tab', TabComponent)
        .directive('pageHeader', PageHeaderDirective.factory);
})(angular);