
/**
 * Directive to make a HTML element sticky to the window
 */

export class StickyAttributeDirective {

    elTopPosition: any;
    isSticky: boolean;

    //Directive properties
    restrict = 'A';

    link(scope, element) {
        let el = element[0];
        const boundingClientRect = el.getBoundingClientRect();
        this.isSticky = false;
        this.elTopPosition = boundingClientRect.top + window.scrollY;
        el.style.height = `${el.clientHeight}px`;

        const stickyEvent = () => {
            const topDifference = this.elTopPosition - window.pageYOffset;

            if (topDifference <= 0 && !this.isSticky) {
                el.style.width = `${el.clientWidth}px`;
                el.classList.add('sticky');
                this.isSticky = true;
            } else if (topDifference > 0 && this.isSticky) {
                el.style.width = '100%';
                el.classList.remove('sticky');
                this.isSticky = false;
            }
        };

        window.onscroll = stickyEvent;
    }

    static factory() {
        return new StickyAttributeDirective();
    }
}
