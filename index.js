import cardComponent from './components/card';
import switchComponent from './components/switch';
import contentTabsComponent from './components/contentTabs';
import tabComponent from './components/contentTabs/tab';
import { PageHeaderDirective } from './components/pageHeader/PageHeaderDirective';

(function(angular){
    angular
        .module('blip.components', [])
        .component('card', cardComponent)
        .component('switch', switchComponent)
        .component('contentTabs', contentTabsComponent)
        .component('tab', tabComponent)
        .directive('pageHeader', PageHeaderDirective.factory);
})(angular);