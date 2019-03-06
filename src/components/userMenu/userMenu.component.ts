import angular from 'core/angular';
import { IComponentController, IComponentOptions } from 'angular';
import { Component } from 'decorators';
import template from './UserMenu.html';
import './userMenu.scss';
import * as ArrowB from 'assets/img/ArrowB.png';

@Component({
    template,
    bindings: {
        fullName: '=',
    },
    transclude: true,
})
class UserMenu implements IComponentController {

    arrowBPath: any;
    fullName: string;

    constructor() {
        this.arrowBPath = ArrowB;
    }

}

export const UserMenuComponent = angular
    .module('blipComponents.userMenu', [])
    .component('userMenu', <IComponentOptions>UserMenu)
    .name;
