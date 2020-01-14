import angular from 'core/angular';
import { BlipLoading } from 'blip-toolkit';
import * as uuid from 'uuid';
import { IComponentController} from 'angular';

const BLIP_LOADING_PREFIX = 'blip-loading-';

class BlipLoadingController implements IComponentController {
    type: 'dotted' | 'solid';
    elementId: string;

    constructor(
        private $element
    ) {
        this.elementId = `${BLIP_LOADING_PREFIX}${uuid.v4()}`;
    }

    $onInit() {
        const instanceOptions = {
            type: this.type || 'dotted',
        };
        const blipLoadingElement = BlipLoading(instanceOptions);
        this.$element[0].children[0].appendChild(blipLoadingElement);
    }
}

export const BlipLoadingComponent = angular
    .module('blipComponents.blipLoading', [])
    .component('blipLoading', {
        template: '<div id="{{$ctrl.elementId}}"></div>',
        controller: BlipLoadingController,
        controllerAs: '$ctrl',
        bindings: {
            type: '@?',
        },
    })
    .name;
