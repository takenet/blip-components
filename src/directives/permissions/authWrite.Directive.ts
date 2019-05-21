import { getService } from '../../data/function';

const permissionWrite = 3;

export class NgAuthWrite {

    public transclude: boolean;
    public template: string;
    public priority: number;
    public restrict: string;

    private $timeout: any;
    private $state: any;
    private $compile: any;
    private currentApplicationService: any;
    private permissionsService: any;

    constructor($compile, $state, $timeout) {
        //Directive
        this.restrict = 'A';

        this.$compile = $compile;
        this.$state = $state;
        this.$timeout = $timeout;

        // Get the service using name on Angular enviroment
        this.currentApplicationService = getService('CurrentApplicationService');
        this.permissionsService = getService('PermissionsService');
    }

    compile() {
        return this.link.bind(this);
    }

    async link(scope, element, attrs) {
        let application = await this.currentApplicationService.fetchApplication(undefined);
        let permissions = await this.permissionsService.getPermissionsObject();

        let area = this.$state.current.params
            ? this.$state.current.params.area
            : this.$state.params.area;

        if (!permissions[area]) {
            return;
        }

        //Disable by default
        element.addClass('ng-hide');
        if (!element[0].attributes.disabled) {
            element.attr('disabled', 'true');
        }

        let areaClaim = permissions[area].claim;
        let userPermission = application.applicationUserPermissionModel.find(
            (p) => p.permissionClaim == areaClaim && p.permissionAction > 1,
        );

        if (
            userPermission &&
            userPermission.permissionAction >= permissionWrite
        ) {
            this.$timeout(() => {
                if (element.hasClass('ng-hide') && !attrs.ngShow) {
                    element.removeClass('ng-hide');
                    if (attrs.autoExpand) {
                        let changeEvent = new Event('change');
                        element[0].dispatchEvent(changeEvent);
                    }
                }
                if (element[0].attributes.disabled && !attrs.ngDisabled) {
                    element[0].removeAttribute('disabled');
                }
            });
        } else {
            switch (attrs.ngAuthWrite) {
                case 'disable':
                    this.$timeout(() => {
                        element.removeClass('ng-hide').attr('disabled', 'true');
                        if (attrs.autoExpand) {
                            let changeEvent = new Event('change');
                            element[0].dispatchEvent(changeEvent);
                        }
                    });
                    break;
            }
        }
    }

    static factory($compile, $state, $timeout) {
        return new NgAuthWrite(
            $compile,
            $state,
            $timeout,
        );
    }
}
