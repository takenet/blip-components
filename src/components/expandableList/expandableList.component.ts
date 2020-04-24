import './expandableList.scss';
import angular from 'core/angular';

export class ExpandableListComponent {
    public mainElement: HTMLElement;
    public listItems: Array<any> = [];
    public previousActivated: any;
    constructor(private $element) {
        this.mainElement = $element[0];
    }

    addItem(item) {
        this.listItems = this.listItems.concat(item);
    }

    toggleItem(item) {
        if (this.previousActivated === item) {
            this.previousActivated = undefined;
            return;
        }
        this.previousActivated && this.previousActivated.deactivate();
        this.previousActivated = item;
    }
}

export const ExpandableList = angular
    .module('blipComponents.expandableList', [])
    .component('expandableList', {
        controller: ExpandableListComponent,
        transclude: true,
        require: {},
        bindings: {
            extras: '<?',
            headerItems: '@?',
            bodyItems: '@?',
        },
        template: '<div class="expandable-list" ng-transclude></div>',
    })
    .name;
