import './Avatar.scss';
import template from './AvatarView.html';
import angular from 'core/angular';

export const AvatarComponent = angular
    .module('blipComponents.avatar', [])
    .component('avatar', {
        controllerAs: '$ctrl',
        bindings: {
            user: '<?'
        },
        template,
    })
    .name;
