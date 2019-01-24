import './letterAvatar.scss';
import * as colorsArray from './colors.json';
import template from './LetterAvatarView.html';
import { IScope } from 'angular';

class LetterAvatarController {
    text: string;
    initials: any;
    backgroundColor: string;

    constructor($scope: IScope) {
        $scope.$watch('$ctrl.text', () => {
            this.updateAvatar();
        });
    }

    updateAvatar() {
        this.initials = this.getInitials(this.text);
        this.backgroundColor = this.getHashColor();
    }

    getInitials(text: string) {
        if (text === undefined) {
            return '?';
        }

        let initials = '';
        let words = text.split(' ');

        initials =
            words.length > 1
                ? words[0][0].toUpperCase() +
                  words[words.length - 1][0].toUpperCase()
                : words[0][0].toUpperCase();

        return initials;
    }

    getHashColor() {
        let hashIndex = this.initials.hashCode() % colorsArray.colors.length;
        return colorsArray.colors[hashIndex];
    }
}

export const letterAvatar = {
    template: template,
    controller: LetterAvatarController,
    controllerAs: '$ctrl',
    bindings: {
        text: '<?',
    },
    transclude: false,
};
