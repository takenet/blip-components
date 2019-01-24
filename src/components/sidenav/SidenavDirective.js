import SidenavController from './SidenavController';
import SidenavView from './SidenavView.html';

export default class SidenavDirective {
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
