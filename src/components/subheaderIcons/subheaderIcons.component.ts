import template from './SubheaderIconsView.html';
import { IStateService } from 'angular-ui-router';

const customSubheaderItemsId = '#custom-subheader-items';
const defaultMenuLimit = 4;

class SubheaderIcons {
    //Properties
    menuIcons: any = [];
    application: any;
    isAttendance: boolean;
    showBlipChatSidenav: () => {};
    SubheaderIcons;
    constructor(private $state: IStateService) {}

    async $onChanges($changedObjects) {
        if (
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

export const SubheaderIconsComponent = {
    template: template,
    controllerAs: '$ctrl',
    controller: SubheaderIcons,
    bindings: {
        menuIcons: '<',
        isAttendance: '<?',
        showBlipChatSidenav: '<?',
    },
};
