import './Avatar.scss';
import template from './AvatarView.html';
import angular from 'core/angular';

class AvatarComponentController {
    private user: { fullName: string, photoUri: string };

    onError() {
        this.user.photoUri = undefined;
    }
}

export const AvatarComponent = angular
    .module('blipComponents.avatar', [])
    .component('avatar', {
        controllerAs: '$ctrl',
        controller: AvatarComponentController,
        bindings: {
            user: '<?'
        },
        template,
    })
    .name;
