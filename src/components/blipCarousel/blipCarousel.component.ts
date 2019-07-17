import angular from 'core/angular';
import template from './blipCarousel.html';
import { BlipCarousel } from 'blip-toolkit';

class BlipCarouselController {
    id: string;
    itemWidth: number;

    constructor(private $timeout) {
        this.id = 'teste';
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
            itemWidth: '@',
        },
    })
    .name;
