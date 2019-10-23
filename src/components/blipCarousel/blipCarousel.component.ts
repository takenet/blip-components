import angular from 'core/angular';
import template from './BlipCarousel.html';
import { BlipCarousel } from 'blip-toolkit';
import * as uuid from 'uuid';
const BLIP_CAROUSEL_PREFIX = 'blip-carousel';

class BlipCarouselController {
    id: string;
    itemWidth: number;

    constructor(private $timeout) {
        this.id = `${BLIP_CAROUSEL_PREFIX}-${uuid.v4()}`;
    }

    async $onInit() {
        this.$timeout(
            () => {
                const carousel = new BlipCarousel(this.id, this.itemWidth);
                carousel.render();
            }
        );
    }
}

export const BlipCarouselComponent = angular
    .module('blipComponents.blipCarousel', [])
    .component('blipCarousel', {
        template,
        controller: BlipCarouselController,
        controllerAs: '$ctrl',
        transclude: true,
        bindings: {
            itemWidth: '<',
        },
    })
    .name;
