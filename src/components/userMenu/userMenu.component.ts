import { IComponentController } from 'angular';
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

export class UserMenuComponent implements IComponentController {

    arrowBPath: any;
    fullName: string;

    constructor() {
        this.arrowBPath = ArrowB;
    }

}
