import { getService } from '../../data/function';

const permissionRead = 1;

export class NgAuthRead {

    public restrict: string;

    private $state: any;
    private currentApplicationService: any;
    private permissionsService: any;

    constructor($state) {
        this.restrict = 'A';

        this.$state = $state;

        // Get the service using name on Angular enviroment
        this.currentApplicationService = getService('CurrentApplicationService');
        this.permissionsService = getService('PermissionsService');
    }

    async link(scope, element, attrs) {

        let application = await this.currentApplicationService.fetchApplication(undefined);
        let permissions = await this.permissionsService.getPermissionsObject();

        let area = attrs.area ? attrs.area : this.$state.params.area;
        let areaClaim = permissions[area].claim;
        let userPermission = application.applicationUserPermissionModel.find(
            (p) => p.permissionClaim == areaClaim && p.permissionAction > 0,
        );

        if (
            !userPermission ||
            userPermission.permissionAction < permissionRead
        ) {
            element.addClass('ng-hide');
        }
    }

    static factory($state) {
        return new NgAuthRead($state);
    }
}
