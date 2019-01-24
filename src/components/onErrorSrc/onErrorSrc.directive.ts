/**
 * Directive for checking if an image was properly load. If not, it replaces with a fallback image.
 */

export class OnErrorSrcDirective {
    restrict = 'A';

    link(scope, element, attrs) {
        element.bind('error', () => {
            if (attrs.src != attrs.onErrorSrc) {
                attrs.$set('src', attrs.onErrorSrc);
            }
        });
    }

    static factory() {
        return new OnErrorSrcDirective();
    }
}
