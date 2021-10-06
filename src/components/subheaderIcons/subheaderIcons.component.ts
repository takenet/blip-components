import angular from 'core/angular';
import template from './SubheaderIconsView.html';
import './SubheaderIconsView.scss';
import { IStateService } from 'angular-ui-router';

class SubheaderIcons {
    //Properties
    menuIcons: any = [];
    application: any;
    isAttendance: boolean;
    enabledTestEdited: boolean;
    isBuilder: boolean;
    applicationStatus: boolean;
    hasTooltip: boolean;
    infoText: string;
    showBlipChatSidenav: () => {};
    createTrack: () => {};
    onOpenDropdownMenu: () => {};
    SubheaderIcons;
    itemTitle;
    constructor(private $state: IStateService) {
        this.itemTitle = `<i
            class="icon-lab"></i>`;
    }

    async $onChanges($changedObjects) {
        if (
            $changedObjects?.menuIcons &&
            $changedObjects.menuIcons.currentValue &&
            $changedObjects.menuIcons.currentValue.length > 0
        ) {
            this.menuIcons = $changedObjects.menuIcons.currentValue;
        }
    }

    getIcons(key) {
        switch (key) {
            case 'auth.application.detail.integrations':
                return 'icon-integration';
            case 'auth.application.detail.configurations':
                return 'icon-config';
            case 'auth.application.detail.team':
                return 'icon-team-1';
            default:
                return '';
        }
    }

    isActive(state) {
        return this.$state.includes(state);
    }
}

export const SubheaderIconsComponent = angular
    .module('blipComponents.subheaderIcons', [])
    .component('subheaderIcons', {
        template,
        controllerAs: '$ctrl',
        controller: SubheaderIcons,
        bindings: {
            menuIcons: '<',
            isAttendance: '<?',
            showBlipChatSidenav: '<?',
            createTrack: '<?',
            enabledTestEdited: '<',
            isBuilder: '<',
            applicationStatus: '<',
            hasTooltip: '<',
            infoText: '<?',
            onOpenDropdownMenu: '<?'
        },
    })
    .name;
