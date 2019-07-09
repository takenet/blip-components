import angular from 'core/angular';

const MOBILE_WIDTH = 749;
const SMALL_WIDTH = 1260;
const MEDIUM_WIDTH = 1365;

export class WindowService {
    constructor(private $window) {}

    get dimensions() {
        return { width: this.$window.innerWidth, height: this.$window.innerHeight };
    }

    get element() {
        return angular.element(this.$window);
    }

    get isMobile() {
        return this.$window.innerWidth <= MOBILE_WIDTH;
    }
    get isSmall() {
        return this.$window.innerWidth > MOBILE_WIDTH
            && this.$window.innerWidth <= SMALL_WIDTH;
    }
    get isMedium() {
        return this.$window.innerWidth > SMALL_WIDTH
            && this.$window.innerWidth <= MEDIUM_WIDTH;
    }
    get isLarge() {
        return this.$window.innerWidth > MEDIUM_WIDTH;
    }
}
