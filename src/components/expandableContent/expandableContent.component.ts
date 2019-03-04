import * as angular from 'angular';
import './expandableContent.scss';
import template from './ExpandableContentView.html';
import { IScope } from 'angular';
import { EventEmitter } from 'shared/EventEmitter';

class ExpandableContent {
    isActive: boolean = false;
    defaultState: boolean;
    hasArrow: boolean;
    onToggleActive: (obj: any) => void;
    private _$scope: IScope;

    constructor(private $element, private $timeout, private $scope: IScope) {
        this._$scope = $scope;
        if (this.defaultState) {
            this.$timeout(() => {
                this.toggleActive();
            });
        }
    }

    $onInit() {
        this.isActive = false;
        this.$timeout(() => {
            const el = this.$element[0];
            this.hasArrow = el.querySelector('item-body') ? true : false;
        });
    }

    toggleActive() {
        this.isActive = !this.isActive;
        if (this.onToggleActive) {
            this.onToggleActive(EventEmitter({ isActive: this.isActive }));
        }

        // When a component is instantiated,
        // the view is not visible and so it cannot be rendered properly
        this.$timeout(() => {
            this._$scope.$broadcast('reCalcViewDimensions');
        }, 100);
    }

    open(event) {
        this.toggleActive();
    }
}

export const ExpandableContentComponent = angular
    .module('blipComponents.expandableContent', [])
    .component('expandableContent', {
        controller: ExpandableContent,
        transclude: {
            itemHeader: '?itemHeader',
            itemBody: '?itemBody',
        },
        bindings: {
            headerItems: '@?',
            bodyItems: '@?',
            defaultState: '<?',
            onToggleActive: '&?',
        },
        template,
    })
    .name;
