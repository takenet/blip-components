import * as angular from 'angular';
import template from './SubheaderMenuView.html';
import { IStateService } from 'angular-ui-router';
import permissionsJson from 'application/detail/permissions.json';

const customSubheaderItemsId = '#custom-subheader-items';
const defaultMenuLimit = 4;

class SubheaderMenu {
    //Properties
    $menuItems: any;
    menuItems: any;
    dropdownMenus: any;
    visibleMenus: any;
    application: any;

    constructor(
        private $state: IStateService,
        private CurrentApplicationService,
    ) {}

    /**
     * Called whenever one-way bindings are updated
     * @param  {any} $changedObjects - bindings that have changes
     */
    async $onChanges($changedObjects) {
        if ($changedObjects.menuItems.currentValue != undefined) {
            this.$menuItems = angular.copy(
                $changedObjects.menuItems.currentValue,
            );
            this.application = await this.CurrentApplicationService.fetchApplication();
            this.$menuItems = this.checkPermissions();
            if (this.$menuItems && this.$menuItems.length > defaultMenuLimit) {
                this.visibleMenus = this.$menuItems.slice(0, defaultMenuLimit);
                this.dropdownMenus = this.$menuItems.slice(
                    defaultMenuLimit,
                    this.$menuItems.length,
                );
            } else {
                this.visibleMenus = this.$menuItems;
            }
        }
    }

    checkPermissions() {
        const permissionsFile = angular.copy(permissionsJson);

        const allowedClaims = Object.keys(permissionsFile)
            .map((p) => {
                if (
                    !permissionsFile[p].hideInTemplate ||
                    !permissionsFile[p].hideInTemplate.includes(
                        this.application.template,
                    )
                ) {
                    return permissionsFile[p].claim;
                }
            })
            .filter((p) => p);

        return this.$menuItems.reduce((array, item) => {
            const contains = item.claims
                ? item.claims.some((claim) => allowedClaims.includes(claim))
                : true;
            if (contains) {
                return [...array, item];
            } else {
                return array;
            }
        }, []);
    }
}

export const SubheaderMenuComponent = {
    template: template,
    controllerAs: '$ctrl',
    controller: SubheaderMenu,
    transclude: true,
    bindings: {
        menuItems: '<',
    },
};
