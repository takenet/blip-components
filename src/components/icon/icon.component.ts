import angular from 'core/angular';
import { IComponentController } from 'angular';
import { strToEl } from 'data/function';

import './icon.scss';
/**
 * USAGE
 *
 * This component is an abstraction of async imports svgs. Icons should be placed on lib folder
 * and ended with "-icon.svg" suffix (avoids breaking other existing svg imports).
 *
 * Folder structure:
 * - lib
 *   - FileName-icon.svg
 *
 * <icon name="FileName" width="50" height="50"></icon>
 *
 * @param {String} name - file name without "-icon" suffix
 * @param {String} width - icon width (eg.: 50)
 * @param {String} height - icon height (eg.: 50)
 * @param {String} color - icon color
 */
class IconController implements IComponentController {
    name: string;
    width: string;
    height: string;
    color: string;
    constructor(private $element) {}

    async $onInit() {
        if (this.name) {
            const { default: icon } = await import(`./lib/${this.name}-icon.svg`);
            const svg = strToEl(icon);

            this.width && svg.setAttribute('width', this.width);
            this.height && svg.setAttribute('height', this.height);
            this.color && this.clearPathsAndFillColor(svg, this.color);
            this.$element[0].appendChild(svg);
        }
    }

    clearPathsAndFillColor(svg: Element, color: string) {
        let paths = svg.getElementsByTagName('path');

        for (let i = 0; i < paths.length; i++) {
            paths[i].setAttribute('fill', '');
        }

        svg.setAttribute('fill', color);
    }
}

export const IconComponent = angular
    .module('blipComponents.iconComponent', [])
    .component('icon', {
        controller: IconController,
        controllerAs: '$ctrl',
        bindings: {
            name: '@?',
            color: '@?',
            width: '@?',
            height: '@?',
        }
    })
    .name;
