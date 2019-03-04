import * as angular from 'angular';
import './localLoading.scss';
import template from './LocalLoadingView.html';
import { Component } from 'decorators';
import { IComponentOptions } from 'angular';
/**
 *Component to show a local loading. Add the component to the same level of elements you want to cover with loading.
 */
@Component({
    selector: 'localLoading',
    template,
})
class LocalLoading {
    constructor() {}
}

export const LocalLoadingComponent = angular
    .module('blipComponents.localLoading', [])
    .component('localLoading', <IComponentOptions>LocalLoading)
    .name;
