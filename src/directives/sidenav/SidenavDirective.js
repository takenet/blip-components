import SidenavController from './SidenavController';
import SidenavView from './SidenavView.html';

class SidenavDirective {
    constructor() {
        this.controller = SidenavController;
        this.controllerAs = '$ctrl';
        this.template = SidenavView;
        this.restrict = 'E';
        this.transclude = true;
        this.replace = true;
    }

    get scope() {
        return {
            collapseWidth: '@',
        };
    }

    static factory() {
        return new SidenavDirective();
    }
}

export const Sidenav = angular
    .module('blipComponents.sidenavDirective', [])
    .directive('sidenav', SidenavDirective.factory)
    .name;
