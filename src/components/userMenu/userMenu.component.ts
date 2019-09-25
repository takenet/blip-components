import angular from 'core/angular';
import { IComponentController, IComponentOptions, ISCEService } from 'angular';
import { Component } from 'decorators';
import template from './UserMenu.html';
import './userMenu.scss';
import * as ArrowB from 'assets/img/ArrowB.png';

@Component({
    template,
    bindings: {
        user: '<',
        compact: '=?',
        onMenuOpen: '&',
    },
    transclude: true,
})
class UserMenu implements IComponentController {
    arrowBPath: any;
    user: any;
    onMenuOpen: any;
    compact: boolean;

    constructor(
        private $sce: ISCEService
    ) {
        this.arrowBPath = ArrowB;
        // this.compact = true;
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
