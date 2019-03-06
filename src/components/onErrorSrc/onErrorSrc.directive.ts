import angular from 'core/angular';

/**
 * Directive for checking if an image was properly load. If not, it replaces with a fallback image.
 */

class OnErrorSrc {
    restrict = 'A';

    link(scope, element, attrs) {
        element.bind('error', () => {
            if (attrs.src != attrs.onErrorSrc) {
                attrs.$set('src', attrs.onErrorSrc);
            }
        });
    }

    static factory() {
        return new OnErrorSrc();
    }
}

export const OnErrorSrcDirective = angular
    .module('blipComponents.onErrorSrc', [])
    .directive('onErrorSrc', OnErrorSrc.factory)
    .name;
