import { getService } from '../../data/function';

const permissionRead = 1;

export class NgAuthRead {

    public restrict: string;
    private $state: any;

    constructor($state) {
        this.restrict = 'A';
        this.$state = $state;
    }

    private get CurrentApplicationService(): any {
        return getService('CurrentApplicationService');
    }

    private get PermissionsService(): any {
        return getService('PermissionsService');
    }

    async link(scope, element, attrs) {

        element.addClass('ng-hide');

        let application = await this.CurrentApplicationService.fetchApplication(undefined);
        let permissions = await this.PermissionsService.getPermissionsObject();

        let area = attrs.area ? attrs.area : this.$state.params.area;
        let areaClaim = permissions[area].claim;
        let userPermission = application.applicationUserPermissionModel.find(
            (p) => p.permissionClaim == areaClaim && p.permissionAction > 0,
        ) || undefined;

        if (
            userPermission &&
            userPermission.permissionAction >= permissionRead
        ) {
            element.removeClass('ng-hide');
        }
    }

    static factory($state) {
        return new NgAuthRead($state);
    }
}
