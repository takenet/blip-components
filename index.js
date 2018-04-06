import { CardComponent } from './components/card';
import { SwitchComponent } from './components/switch';
import { ContentTabsComponent } from './components/contentTabs';
import { TabComponent } from './components/contentTabs/tab';
import { PageHeaderDirective } from './components/pageHeader/PageHeaderDirective';
import DatePicker from './components/datePicker/datePicker';
import DatePickerRange from './components/datePicker/datePickerRange';

(function(angular){
    angular
        .module('blip.components.card', [])
        .component('card', CardComponent);
    angular
        .module('blip.components.switch', [])
        .component('switch', SwitchComponent)
    angular
        .module('blip.components.contentTabs', [])
        .component('contentTabs', ContentTabsComponent);
    angular
        .module('blip.components.tab', [])
        .component('tab', TabComponent);
    angular
        .module('blip.components.pageHeaderDirective', [])
        .directive('pageHeader', PageHeaderDirective.factory);
})(angular);