import angular from 'core/angular';
import { IComponentController, IComponentOptions, ISCEService } from 'angular';
import { Component } from 'decorators';
import template from './UserMenu.html';
import './userMenu.scss';
import * as ArrowB from 'assets/img/ArrowB.png';

@Component({
    template,
    bindings: {
        fullName: '=',
        compact: '=?',
        onMenuOpen: '&',
    },
    transclude: true,
})
class UserMenu implements IComponentController {

    arrowBPath: any;
    fullName: string;
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

    itemTitle() {
        return `<div class='flex flex-row justify-center items-center pointer'>
            <letter-avatar class='author-header-avatar' text="'${this.fullName}'"> </letter-avatar>
            ${
            this.compact !== true
                ?
                `<span class='bot-name fw3'>${this.fullName}</span>
                <icon name="ArrowDown" width="16" height="16"></icon>`
                :
                ''
            }
            </div>`;
    }

}

export const UserMenuComponent = angular
    .module('blipComponents.userMenu', [])
    .component('userMenu', <IComponentOptions>UserMenu)
    .name;
