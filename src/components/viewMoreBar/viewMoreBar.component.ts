import angular from 'core/angular';
import { Component } from 'decorators';
import { IComponentController, IComponentOptions } from 'angular';
import './ViewMoreBar.scss';

@Component({
    template: `
    <div class="load-more w-100 flex items-center justify-center mv1 pointer" ng-click="$ctrl.load()">
        <div class="flex items-center tc">
            <icon name="{{$ctrl.iconName}}" width="30" height="30" color="#2cc3d5" class="mr1"></icon>
            {{$ctrl.message}}
        </div>
    </div>`,
    bindings: {
        iconName: '@',
        message: '@',
        loadMore: '&',
    }
})

export class ViewMoreBar implements IComponentController {
    iconName: string;
    message: string;
    loadMore: () => {};

    $onInit() {}

    load() {
        this.loadMore();
    }
}

export const ViewMoreBarComponent = angular
    .module('blipComponents.viewMoreBar', [])
    .component('viewMoreBar', <IComponentOptions>ViewMoreBar)
    .name;
