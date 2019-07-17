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
        onMenuOpen: '&',
    },
    transclude: true,
})
class UserMenu implements IComponentController {

    arrowBPath: any;
    fullName: string;
    onMenuOpen: any;

    constructor() {
        this.arrowBPath = ArrowB;
    }

    handleOnMenuOpen() {
        if (this.onMenuOpen) {
            this.onMenuOpen();
        }
    }

}

export const UserMenuComponent = angular
    .module('blipComponents.userMenu', [])
    .component('userMenu', <IComponentOptions>UserMenu)
    .name;
