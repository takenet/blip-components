import './reloadButton.scss';
import * as loading from 'assets/img/loading3.png';

class ReloadButton {
    iconClass: string;
    disabled: boolean;
    busy: boolean;

    constructor() {}
}

export const ReloadButtonComponent = {
    controller: ReloadButton,
    controllerAs: '$ctrl',
    transclude: true,
    bindings: {
        iconClass: '@',
        disabled: '<?',
        busy: '<?',
    },
    template: `
    <div class="reload-button">
        <button ng-disabled="$ctrl.disabled">
            <i ng-if="!$ctrl.busy" class="icon icon-{{$ctrl.iconClass}}"></i>
            <div class="pa3" ng-if="$ctrl.busy">
                <img class="spin" src="${loading}">
            </div>
        </button>
    </div>`,
};
