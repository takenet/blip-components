import angular from 'core/angular';

/**
 * Directive for inserting a dynamic icon src attribute into an element
 */

class IconSrc {
    name: string = '';
    restrict = 'A';

    async link(scope, element, attrs) {
        if (!attrs.iconSrc) {
            return;
        }
        const { default: icon } = await import(/* webpackMode: "eager" */ `./lib/${attrs.iconSrc}-icon.svg`);
        const blob = new Blob([icon], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        let el = element[0];
        el.setAttribute('src', url);
    }

    static factory() {
        return new IconSrc();
    }
}

export const IconSrcDirective = angular
    .module('blipComponents.iconSrc', [])
    .directive('iconSrc', IconSrc.factory)
    .name;
