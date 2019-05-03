import angular from 'core/angular';
import './sidenav.scss';
export default class SidenavController {

    constructor($rootScope, $scope, $window, $document, WindowService) {
        'ngInject';

        this.$window = $window;
        this.windowService = WindowService;

        this.collapsed = false;
        this.subnavbar = $rootScope.subnavbar;
        this.collapseWidth = $scope.collapseWidth;
    }

    toggleCollapse($event) {
        if (this.collapsed)
            $event.preventDefault();

        $event.stopPropagation();
        $event.cancelBubbling = true;

        if (this.collapsed || (!this.collapsed && $event.target.nodeName.toLowerCase() === 'nav'))
            this.toggleWithConstraints();
    }

    applyConstraints() {
        if (this.collapseWidth === 'large') {
            this.collapsed = !this.windowService.isLarge;
        }
        else {
            this.collapsed = !this.windowService.isMedium && !this.windowService.isLarge;
        }
    }

    toggleWithConstraints() {
        if (this.collapseWidth === 'large') {
            this.collapsed = !this.windowService.isLarge ? !this.collapsed : this.collapsed;
        }
        else {
            this.collapsed = !this.windowService.isMedium && !this.windowService.isLarge ? !this.collapsed : this.collapsed;
        }
    }
}
