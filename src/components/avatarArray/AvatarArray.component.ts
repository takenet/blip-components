import './AvatarArray.scss';
import template from './AvatarArrayView.html';
import * as angular from 'angular';

class AvatarArray {
    public members: Array<any>;
    public limit: number;

    constructor(private $scope) {
        this.$scope.$watch('$ctrl.members', (newValue, oldValue) => {
            setTimeout(() => {
                let array = Array.from(
                    document.querySelectorAll('.avatar-array > tooltip'),
                ) as Element[];
                if (this.limit) {
                    array = array.slice(0, this.limit);
                }
                array.map((span, index) => {
                    const x = span as HTMLElement;
                    x.style.left = index * 41 + 'px';
                    x.style.zIndex = String(100 - index);
                });
            }, 0);
        });
    }
}

export const AvatarArrayComponent = angular
    .module('blipComponents.avatarArray', [])
    .component('avatarArray', {
        controller: AvatarArray,
        controllerAs: '$ctrl',
        bindings: {
            members: '<?',
            limit: '<?',
        },
        template,
    })
    .name;
